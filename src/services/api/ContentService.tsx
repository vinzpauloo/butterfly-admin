import request from '@/lib/request'
// ** Configs
import authConfig from 'src/configs/auth'

interface IGetContentsParams {
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
      params: params
    })
  }
  

  return { getContents }
}

export default ContentService
