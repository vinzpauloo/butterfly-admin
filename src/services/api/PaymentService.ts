import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface RegisterPayment {
  data: {
      site_id?: string
      merchant_id?: string
      key?: string
      rsa_public?: string
      rsa_private?: string
  }
}

const processData = (response: any) => {
  if (response && response.data) {
    return response.data
  }

  return {}
}

export const PaymentService = () => {
  
  const registerPayment = (params: RegisterPayment) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
            ...getHeaders(),
              'Content-Type': 'multipart/form-data',
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: `/admin/payment/method/yuanhua/account`,
            method: 'POST',
            data: params.data
        })
  }
  
  const getIntegrationRSA = (params: RegisterPayment) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
              ...getHeaders(),
              'ngrok-skip-browser-warning': '69420', // only for dev
              Authorization: `Bearer ${accessToken}`
            },
            url: `/admin/payment/method/yuanhua/account/${params.data.merchant_id}`,
            method: 'GET',
        },
        processData
      )
  }

  return {
    registerPayment,
    getIntegrationRSA
  }
}
