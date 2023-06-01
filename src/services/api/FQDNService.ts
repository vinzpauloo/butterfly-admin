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
    fqdns?: { name?: string, type?: 'api' | 'streaming' | 'photo' }[]
    fqdn_admin?: string,
  }
}

type IAddFQDNParamsWithoutInnerFQDNAdmin = Omit<IAddFQDNParams, 'data'> & {
  data?: Omit<IAddFQDNParams['data'], 'fqdn_admin'>
};

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

  const addFQDN = (params : IAddFQDNParams | IAddFQDNParamsWithoutInnerFQDNAdmin) => {
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
