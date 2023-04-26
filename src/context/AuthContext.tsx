// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

import { getHeaders } from '@/lib/cryptoJs'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

// ** Constant variables
const IS_SIT = process.env.NEXT_PUBLIC_APP_VARIANT === 'sit'
const baseUrl = IS_SIT ? process.env.NEXT_PUBLIC_API_BASE_URL_SIT : process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    if (storedToken) {
      const userData: string = window.localStorage.getItem(authConfig.userDataKeyname) || ''
      const userDataObj: UserDataType = JSON.parse(userData)
      setUser(userDataObj)
    }
    setLoading(false)
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const newParams = {
      username: params.email, // Change key to `username`
      password: params.password
    }

    axios
      .post(`${baseUrl + authConfig.loginEndpoint}`, newParams, {
        headers: {
          ...getHeaders()
        }
      })
      .then(async response => {
        const tempUserData = {
          id: response.data.data.id,
          role: response.data.data.role,
          username: params.email,
          photo: response.data.data.photo,
          site: response.data.data.site[0] || null
        }

        // setUser(tempUserData)
        params.rememberMe
          ? window.localStorage.setItem(authConfig.tempStorageTokenKeyName, response.data.data.token)
          : null
        params.rememberMe
          ? window.localStorage.setItem(authConfig.tempUserDataKeyname, JSON.stringify(tempUserData))
          : null

        const twoFactorAuthData = {
          qr2faGoogle: response.data.data['2fa-google'] || null,
          isAuthenticated: false
        }
        window.localStorage.setItem(authConfig.twoFADataKeyName, JSON.stringify(twoFactorAuthData))

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        if (redirectURL !== '/') {
          router.replace({
            pathname: authConfig.twoFAEndpoint,
            query: { returnUrl: redirectURL }
          })
        } else {
          router.replace(authConfig.twoFAEndpoint)
        }
      })
      .catch(err => {
        console.log('Login error!', err)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(authConfig.userDataKeyname)
    window.localStorage.removeItem(authConfig.tempUserDataKeyname)
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.tempStorageTokenKeyName)
    window.localStorage.removeItem(authConfig.twoFADataKeyName)
    router.push('/loginv2')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
