import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface BaseProps<T, U> {
  data?: T
  params?: U
}

interface DashboardData {
  user_id?: number
}

interface DashboardParams {
  role?: string
  page?: string | number
  sort?: string
  sort_by?: string
  site_id?: string
  max?: string
  sum?: string
  paginate?: string
  with?: string
  purchases?: string
  daily?: string
  select?: string
  from?: string
  to?: string
}

export const NewDashboardService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const headers = {
    ...getHeaders(),
    'ngrok-skip-browser-warning': '69420', // only for dev
    Authorization: `Bearer ${accessToken}`
  }

  const apiRequest = <Params>(url: string, method: string, params?: Params | undefined): Promise<Params> => {
    return request({
      headers,
      url,
      method,
      params
    })
  }

  const getTopCreatorWorkShare = (props: BaseProps<DashboardData, DashboardParams>) =>
    apiRequest(`users`, `GET`, props.params)

  const getTopDonation = (props: BaseProps<DashboardData, DashboardParams>) =>
    apiRequest(`admin/donations`, `GET`, props.params)

  const getTotalSecurityFunds = (props: BaseProps<DashboardData, DashboardParams>) =>
    apiRequest(`admin/security/funds`, `GET`, props.params)

  const getSecurityFundsRanking = (props: BaseProps<DashboardData, DashboardParams>) =>
    apiRequest(`admin/sites`, `GET`, props.params)

  const getTopDonators = (props: BaseProps<DashboardData, DashboardParams>) =>
    apiRequest(`admin/customers`, `GET`, props.params)

  const getTotalWorkPurchases = (props: BaseProps<DashboardData, DashboardParams>) =>
    apiRequest(`admin/works/purchases`, `GET`, props.params)

  const getNewUsers = (props: BaseProps<DashboardData, DashboardParams>) =>
    apiRequest(`admin/customers`, `GET`, props.params)

  return {
    getTopCreatorWorkShare,
    getTopDonation,
    getTotalSecurityFunds,
    getSecurityFundsRanking,
    getTopDonators,
    getTotalWorkPurchases,
    getNewUsers
  }
}
