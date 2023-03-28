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

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    // const initAuth = async (): Promise<void> => {
    //   const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    //   if (storedToken) {
    //     setLoading(true)
    //     await axios
    //       .get(authConfig.meEndpoint, {
    //         headers: {
    //           Authorization: storedToken
    //         }
    //       })
    //       .then(async response => {
    //         setLoading(false)
    //         setUser({ ...response.data.userData })
    //       })
    //       .catch(() => {
    //         localStorage.removeItem('userData')
    //         localStorage.removeItem('refreshToken')
    //         localStorage.removeItem('accessToken')
    //         setUser(null)
    //         setLoading(false)
    //         if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
    //           router.replace('/login')
    //         }
    //       })
    //   } else {
    //     setLoading(false)
    //   }
    // }

    // initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    if (storedToken) {
      const userData: string = window.localStorage.getItem('userData') || ''
      const userDataObj: UserDataType = JSON.parse(userData)
      setUser(userDataObj)
    }
    setLoading(false)
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const newParams = {
      username: params.email,
      password: params.password
    }

    console.log('newParams', newParams)

    axios
      // .post(`/jwt/login`, params)
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL + authConfig.loginEndpoint}`, newParams, {
        headers: {
          'X-Authorization': 'postman|0'
        }
      })
      .then(async response => {
        // params.rememberMe
        //   ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        //   : null
        // const returnUrl = router.query.returnUrl

        // setUser({ ...response.data.userData })
        // params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        // router.replace(redirectURL as string)

        console.log(response)
        const tempUserData = { role: 'admin', username: params.email }

        setUser(tempUserData)
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token) : null
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(tempUserData)) : null

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })
      .catch(err => {
        console.log('err', err)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
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
