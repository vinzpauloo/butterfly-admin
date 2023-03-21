// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from '@/services/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/loginv2',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/loginv2')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
