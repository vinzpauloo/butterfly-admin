import request from '@/lib/request'

// ** Configs
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IFeedsPostParams {
  formData: FormData
}

type NewsFeedStatusType = 'Approved' | 'Declined' | 'Pending'

interface IGetFeedsParams {
  story_feeds_only? : boolean,
  video_only? : boolean,
  with? : string,
  page? : number,
  paginate? : number,
  sort? : 'desc' | 'asc',
  sortBy : any, // returned columns of GET admin/feeds
  search_all? : boolean,
  all? : boolean,
  status : NewsFeedStatusType
}

interface IApproveFeedParams {
  data : {
    foreign_id : string
    action : 'Approved' | 'Declined'
    note? : string
    _method?: 'put'
  }
}
interface IGetFeedsByCC {
  all : boolean,
  with? : string,
  status? : 'Approved' | 'Pending' | 'Declined'
}

interface IUpdateFeedParams {
  id? : string
  data : {
    string_story? : string
    tags? : string[] | any,
    _method : 'put' | string,
    resubmit? : 'true' | 'false'
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
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/feeds',
      method: 'GET',
      params: params
    })
  }

  const getFeedsByCC = (params : IGetFeedsByCC) => {
    return request({
      headers: {
        ...getHeaders(),
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
        'Content-Type': 'multipart/form-data', // if POST is form-data
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/feeds/approval',
      method: 'POST',
      data: params.data, // if body is JSON
    })
  }

  const updateFeedViaID = (params : IUpdateFeedParams) => {

    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data', // if POST is form-data
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: `admin/feeds/${params.id}`,
      method: 'POST',
      data: params.data, // if body is JSON
    })

  }

  return { uploadFeed, getFeeds, approveNewsFeedContent, getFeedsByCC, updateFeedViaID }
}

export default FeedsService
