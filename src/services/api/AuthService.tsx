import request from '@/lib/request'

interface IGoogleAuthParams {
  code: string
  token: string
}

const AuthService = () => {
  const googleAuthenticator = (data: IGoogleAuthParams) => {
    return request({
      headers: { Accept: 'application/json', Authorization: `Bearer ${data.token}`, 'X-Authorization': 'postman|0' },
      url: '/2fa/google/authenticator',
      method: 'POST',
      params: { code: data.code }
    })
  }

  return { googleAuthenticator }
}

export default AuthService
