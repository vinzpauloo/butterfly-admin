import request from '@/lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Configs
import authConfig from 'src/configs/auth'

interface IRoleParams {
  sort?: 'desc' | 'asc'
  sort_by?: string
  page?: number
  paginate?: number
}

const RolesService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getAllRoles = (params: IRoleParams) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/roles',
      method: 'GET',
      params
    })
  }

  return { getAllRoles }
}

export default RolesService
