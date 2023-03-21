/*
j = X-Authorization
iv = X-Nonce
s = X-Random
--------------------
DateTimeZ|IntegrationKey
*/
import CryptoJS from 'crypto-js'

const AUTH_INTEGRATION_KEY = process.env.NEXT_PUBLIC_AUTH_INTEGRATION_KEY
const AUTH_PASSPHRASE = process.env.NEXT_PUBLIC_AUTH_PASSPHRASE

const CryptoJSAesJson = {
  stringify: function (cipherParams) {
    const j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
    if (cipherParams.iv) j.iv = cipherParams.iv.toString()
    if (cipherParams.salt) j.s = cipherParams.salt.toString()

    return JSON.stringify(j)
  },
  parse: function (jsonStr) {
    const j = JSON.parse(jsonStr)
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct)
    })
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)

    return cipherParams
  }
}

const getDateNow = () => {
  return new Date().toISOString()
}

const encryptData = () => {
  const dataToEncrypt = `${getDateNow()}|${AUTH_INTEGRATION_KEY}`

  // console.log("--- Inside encryptData function ---");
  // console.log("dataToEncrypt:", dataToEncrypt);

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt), AUTH_PASSPHRASE, {
    format: CryptoJSAesJson
  }).toString()

  // console.log("encrypted:", encrypted);

  return encrypted
}

const decryptData = dataToDecrypt => {
  const decrypted = JSON.parse(
    CryptoJS.AES.decrypt(dataToDecrypt, AUTH_PASSPHRASE, {
      format: CryptoJSAesJson
    }).toString(CryptoJS.enc.Utf8)
  )

  return decrypted
}

export const getHeaders = () => {
  const { ct, iv, s } = JSON.parse(encryptData())

  return { 'X-Authorization': ct, 'X-Nonce': iv, 'X-Random': s }
}
