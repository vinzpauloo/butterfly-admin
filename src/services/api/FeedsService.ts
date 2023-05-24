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
  approval : NewsFeedStatusType
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
  approval? : 'Approved' | 'Pending' | 'Declined'
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

interface FeaturedFeedsParams {
  site_id?: string
  search?: string
  featured_id?: string
  active?: string
  sort?: 'asc' | 'desc' | undefined | null;
  sort_by?: string
}

interface PostFeaturedFeedsProps {
  title?: string,
  description?: string,
  feed_id?: string,
  active?: string | boolean
  _method?: string
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

  const getFeaturedFeeds = (params: FeaturedFeedsParams) => {

    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `admin/feature/feeds`,
      method: 'GET',
      params: params
    })
  }

  const postFeaturedFeeds = ({data, params}: {data: PostFeaturedFeedsProps, params: FeaturedFeedsParams}) => {

    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `admin/feature/feeds`,
      method: 'POST',
      data: data,
      params: params
    })
  }

  const deleteFeaturedFeeds = (params:FeaturedFeedsParams) => {

    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `admin/feature/feeds`,
      method: 'DELETE',
      params: params
    })
  }

  const toggleFeaturedFeeds = ({data,params}:{data: PostFeaturedFeedsProps, params: FeaturedFeedsParams}) => {

    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `admin/feature/feeds`,
      'Content-Type': 'multipart/form-data',
      method: 'POST',
      data: data,
      params: params
      
    })
  }

  return { uploadFeed, getFeeds, approveNewsFeedContent, getFeedsByCC, updateFeedViaID, getFeaturedFeeds, postFeaturedFeeds, deleteFeaturedFeeds, toggleFeaturedFeeds }
}

export default FeedsService
