import request from '@/lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Configs
import authConfig from 'src/configs/auth'

interface ITransaction {
  data?: {
    id?: number
    withdrawal_account_id?: number
    note?: string
    with?: string
    page?: number
    paginate?: number
    user_username?: string | null
    customer_username?: string | null
    site_name?: string | null
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

  const getWithdrawals = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/withdrawals',
      method: 'GET',
      params: params.data
    })
  }

  const requestWithdrawal = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data', // if POST is form-data
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/withdrawals',
      method: 'POST',
      data: params.data, // if body is JSON
    })
  }

  const approveWithdrawal = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/withdrawals/${params.data?.id}/approve`,
      method: 'PUT',
    })
  }

  const declineWithdrawal = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/withdrawals/${params.data?.id}/decline`,
      method: 'PUT',
    })
  }

  const getWorkPurchases = (params: ITransaction) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/works/purchases',
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

  return {
    getDonations,
    getWithdrawals,
    requestWithdrawal,
    approveWithdrawal,
    declineWithdrawal,
    getWorkPurchases,
    getCommissions,
    getSecurityFunds,
    getCustomerTransaction
  }
}

export default TransactionsService
