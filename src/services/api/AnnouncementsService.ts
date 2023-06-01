import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IAnnouncementParams {
  announcementID?: string
  data?: {
    site_id?: number
    with?: 'introductions'
    style?: 'text' | 'image'
    type?: 'introduction'
    title?: string
    description?: string
    start_date?: string
    end_date?: string
    _method?: 'put'
    active?: 0 | 1
    exclude?: number
    sort?: string
    sort_by?: string
    search_by?: string
    search_value?: string
    locale?: string
  }
  token?: string
}

const AnnouncementsService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getAllAnnouncement = (params: IAnnouncementParams) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/announcements',
      method: 'GET',
      params: params.data
    })
  }

  const createAnnouncement = (params: IAnnouncementParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/announcements',
      method: 'POST',
      params: params.data
    })
  }

  const updateAnnouncement = (params: IAnnouncementParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/announcements/${params.announcementID}`,
      method: 'POST',
      data: params.data // if body is JSON
    })
  }

  const deleteAnnouncement = (params: IAnnouncementParams) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/announcements/${params.announcementID}`,
      method: 'DELETE'
    })
  }

  return { getAllAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement }
}

export default AnnouncementsService
