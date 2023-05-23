import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface BaseProps<T, U> {
  data?: T
  params?: U
}

interface ReportsParams {
  sort?: string;
  sort_by?: string;
  site_id?: string;
}

interface ReportsData {
  user_id?: number;
}

interface IReportsParams {
  data?: {
    report?: boolean
    today?: boolean
    weekly?: boolean
    monthly?: boolean
    yearly?: boolean
    with?: string
    select?: string
    page?: number
    paginate?: number
    search_by?: string
    search_value?: string
  }
}

export const ReportsService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getSecurityFunds = (props: BaseProps<ReportsData,ReportsParams>) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/security/funds',
      method: 'GET',
      params: props.params
    })
  }

  const getReportsDonations = (params: IReportsParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/donations',
      method: 'GET',
      params: params.data,
    })
  }

  // Reports -> VIP Bundles and Gold Coin Bundles
  const getReportsCustomerTransaction = (params: IReportsParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/customer-transactions',
      method: 'GET',
      params: params.data,
    })
  }


  return { getSecurityFunds, getReportsDonations, getReportsCustomerTransaction }
}