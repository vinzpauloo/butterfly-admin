import request from '@/lib/request'

// ** Configs
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IGetFQDNParams {
  site?: number
  sort?: 'desc' | 'asc' | string
  sort_by?: string //eg. name
  paginate?: number
}

interface IGetSuperAgentFQDNParams {
  site?: number
  sort?: 'desc' | 'asc' | string
  sort_by?: 'fqdn' | string
  paginate?: number
}

interface IAddFQDNParams {
  siteId : number,
  data?: {
    fqdns?: {name?: string, type?: 'Api' | 'Streaming' | 'Photo'}[]
  }
}

interface IDeleteFQDNParams {
  fqdnID?: number
}

interface IUpdateFQDNParams {
  fqdnID?: number
  data?: {
    _method?: 'put'
    site?: number,
    name?: string,
    type?: 'Api' | 'Streaming' | 'Photo'
  }
}

const FQDNService = () => {

  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getFQDNList = (params : IGetFQDNParams) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: '/fqdns',
      method: 'GET',
      params: params
    })
  }

  const getSuperAgentFQDNList = (params : IGetSuperAgentFQDNParams) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: '/server-lists',
      method: 'GET',
      params: params
    })
  }

  const addFQDN = (params : IAddFQDNParams) => {
    return request({
      headers: {
        ...getHeaders(),
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/sites/${params.siteId}/fqdn`,
      method: 'PUT',
      data: params.data,
  })
  }

  const updateFQDN = (params: IUpdateFQDNParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data', // if POST is form-data
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: `/fqdns/${params.fqdnID}`,
      method: 'POST',
      data: params.data, // if body is JSON
    })
  }

  const deleteFQDN = (params: IDeleteFQDNParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data', // if POST is form-data
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: `/fqdns/${params.fqdnID}`,
      method: 'DELETE',
    })
  }

  return { addFQDN, getFQDNList, getSuperAgentFQDNList, deleteFQDN, updateFQDN }
}

export default FQDNService
