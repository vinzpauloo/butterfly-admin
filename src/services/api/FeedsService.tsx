import request from '@/lib/request'
// ** Configs
import authConfig from 'src/configs/auth'

interface IFeedsPostParams {
  formData: FormData
}

interface IGetFeedsParams {
  story_feeds_only? : boolean,
  video_only? : boolean,
  with? : string,
  page? : number
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
      url: '/admin/feeds/upload',
      method: 'POST',
      data: params.formData
    })
  }

  const getFeeds = (params : IGetFeedsParams) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/feeds',
      method: 'GET',
      params: params
    })
  }
  

  return { uploadFeed, getFeeds }
}

export default FeedsService
