import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface WalletProps {
  data: {
      bank_code?: string
      name?: string
      logo?: File | null
      active?: number | boolean
      created_at?: string
      updated_at?: string
      sort?: any
      sort_by?: string
  }
}

export const WalletService = () => {
 
    const getAllWallet = (params: WalletProps) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: `/admin/payment/method`,
            method: 'GET',
            params: params.data
        })
  }
  
  const postWallet = (params: WalletProps) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
            ...getHeaders(),
              'Content-Type': 'multipart/form-data',
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: `/admin/payment/method`,
            method: 'POST',
            data: params.data
        })
    }
    
    const editWallet = (id: any, data: any) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/payment/method/${id}/toggle`,
      method: 'POST',
      data: data
    })
  }

  return {
    getAllWallet,
    postWallet,
    editWallet
  }
}
