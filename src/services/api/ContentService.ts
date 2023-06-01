import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

export interface IGetContentsParams {
  data: {
     sort?: 'desc' | 'asc'
    sort_by?: string
    search_by?: string
    search_value?: string
    order_by?: string
    order_type?: string
    with?: string
    page?: number
    foreign_id?: string
    action?: "Approved" | "Declined"
    note?: string
    _method?: string
    paginate?: number
    approval? : 'Approved' | 'Pending' | 'Declined'
  }
  token?: string
}


const ContentService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getContents = (params : IGetContentsParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/works',
      method: 'GET',
      params: params.data
    })
  }

  const approveContent = (params: IGetContentsParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        'Content-Type': 'multipart/form-data', // if POST is form-data
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/works/approval',
      method: 'POST',
      data: params.data, // if body is JSON
    })
  }
  

  return { getContents, approveContent }
}

export default ContentService
