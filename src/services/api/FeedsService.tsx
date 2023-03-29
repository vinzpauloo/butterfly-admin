import request from '@/lib/request'
// ** Configs
import authConfig from 'src/configs/auth'

interface IFeedsPostParams {
  formData: FormData
}

interface IGetFeaturedFeedsParams {
  site_id : number
}

const FeedsService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const uploadFeed = (params: IFeedsPostParams) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      url: '/feeds/upload',
      method: 'POST',
      data: params.formData
    })
  }

  const getFeaturedFeed = (params : IGetFeaturedFeedsParams) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/feature/feeds',
      method: 'GET',
      params: params
    })
  }

  return { uploadFeed, getFeaturedFeed }
}

export default FeedsService
