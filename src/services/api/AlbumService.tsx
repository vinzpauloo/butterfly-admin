import request from '@/lib/request'
import authConfig from 'src/configs/auth'

interface AlbumData {
  data: {
    role?: string
    role_id?: any
    page?: number
    sort?: any
    sort_by?: string
    search_by?: string
    search_value?: string
    filter?: string
    _id?: string
  }
}

interface AlbumUpload {
  data: {
    title?: string
    cover_photo?: File | null
    _id?: string
  }
}

const processData = (response: any) => {
  if (response && response.data) {
    return response.data
  }

  return {}
}

export const AlbumService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getAlbums = (params: AlbumData) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/albums',
      method: 'GET',
      params: params.data
    })
  }

  const getSpecificUserAlbum = (params: AlbumData) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/albums/${params.data._id}`,
      method: 'GET',
      params: params.data
    })
  }

  const postAlbum = (params: AlbumUpload) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'ngrok-skip-browser-warning': '69420', // only for dev
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/albums`,
      method: 'POST',
      data: params.data
    })
  }

  const editAlbum = (_id: any, data: any) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'ngrok-skip-browser-warning': '69420', // only for dev
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/albums/${_id}`,
      method: 'POST',
      data: data
    })
  }

  return { getAlbums, getSpecificUserAlbum, postAlbum, editAlbum }
}
