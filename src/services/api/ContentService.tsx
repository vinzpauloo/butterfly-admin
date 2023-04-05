import request from '@/lib/request'
import authConfig from 'src/configs/auth'

interface IGetContentsParams {
  data: {
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
  }
  token?: string
}


const ContentService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getContents = (params : IGetContentsParams) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
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
        'X-Authorization': 'postman|1',
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
