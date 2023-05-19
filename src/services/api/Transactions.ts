import request from '@/lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Configs
import authConfig from 'src/configs/auth'

interface ITransaction {
  data?: {
    with?: string
    page?: number
    paginate?: number
    user_username?: string
    customer_username?: string
    site_name?: string
  }
}

const TransactionsService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getDonations = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/donations',
      method: 'GET',
      params: params.data
    })
  }

  const getSecurityFunds = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/security/funds',
      method: 'GET',
      params: params.data
    })
  }

  return { getDonations, getSecurityFunds }
}

export default TransactionsService
