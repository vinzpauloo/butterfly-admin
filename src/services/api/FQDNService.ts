import request from '@/lib/request'

// ** Configs
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IGetSuperAgentFQDNParams {
  site?: number
  sort?: 'desc' | 'asc' | string
  sort_by?: 'fqdn' | string
  paginate?: number
}

interface IAddFQDNParams {
  fqdn_admin?: string,
  siteId? : number,
  data?: {
    site?: number,
    fqdns?: {name?: string, type?: 'api' | 'streaming' | 'photo'}[]
  }
}

const FQDNService = () => {

  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getSuperAgentFQDNList = (params : IGetSuperAgentFQDNParams) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `admin/sites/${params.site}/fqdn`,
      method: 'GET',
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

  return { addFQDN, getSuperAgentFQDNList }
}

export default FQDNService
