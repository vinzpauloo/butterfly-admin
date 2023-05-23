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
    select?: string
    search_by?: string
    search_value?: string
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

  const getCommissions = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/transactions',
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

  // Transaction -> VIP Bundles and Gold Coin Bundles
  const getCustomerTransaction = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/customer-transactions',
      method: 'GET',
      params: params.data
    })
  }

  return { getDonations, getCommissions, getSecurityFunds, getCustomerTransaction }
}

export default TransactionsService
