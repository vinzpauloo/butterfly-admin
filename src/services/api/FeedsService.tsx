import request from '@/lib/request'
// ** Configs
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IFeedsPostParams {
  formData: FormData
}

interface IGetFeedsParams {
  story_feeds_only? : boolean,
  video_only? : boolean,
  with? : string,
  page? : number,
  paginate? : number,
  sort? : 'desc' | 'asc',
  sortBy : any, // returned columns of GET admin/feeds
  search_all? : boolean,
  all? : boolean
}

interface IApproveFeedParams {
  data : {
    foreign_id : string
    action : 'Approved' | 'Declined'
    notes? : string
    _method?: 'put'
  }
}

const FeedsService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const uploadFeed = (params: IFeedsPostParams) => {
    return request({
      headers: {
        ...getHeaders(),
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
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/feeds',
      method: 'GET',
      params: params
    })
  }

  const approveNewsFeedContent = (params: IApproveFeedParams) => {

    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        'Content-Type': 'multipart/form-data', // if POST is form-data
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/feeds/approval',
      method: 'POST',
      data: params.data, // if body is JSON
    })
  }

  return { uploadFeed, getFeeds, approveNewsFeedContent }
}

export default FeedsService
