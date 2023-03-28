export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/login',
  twoFAEndpoint: '/twofa',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  tempStorageTokenKeyName: 'tempAccessToken',
  userDataKeyname: 'userData',
  tempUserDataKeyname: 'tempUserData',
  twoFADataKeyName: 'twoFactorAuthData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
