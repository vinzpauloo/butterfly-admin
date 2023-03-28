export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
