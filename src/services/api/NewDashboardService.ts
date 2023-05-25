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

  return { getTopCreatorWorkShare, getTopDonation, getTotalSecurityFunds }
}
