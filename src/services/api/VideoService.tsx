import request from '@/lib/request'
// ** Configs
import authConfig from 'src/configs/auth'

interface IVideoParams {
  data: {
    sort?: 'created_at'
    sort_by?: 'desc' | 'asc' | null | undefined
    with?: 'user'
    page?: number
    paginate?: number
  }
  token?: string
}

interface IUpdateVideoParams {
  formData: FormData
}

const VideoService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getAllVideos = (params: IVideoParams) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/works/admin',
      method: 'GET',
      params: params.data
    })
  }

  const updateVideoByWorkId = (params: IUpdateVideoParams) => {
    return request({
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      url: '/videos',
      method: 'POST',
      data: params.formData
    })
  }

  return { getAllVideos, updateVideoByWorkId }
}

export default VideoService
