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
            url: `/admin/payment/method/register/yuanhua/account`,
            method: 'POST',
            data: params.data
        })
    }

  return {
    registerPayment
  }
}
