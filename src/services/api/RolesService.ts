import request from '@/lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Configs
import authConfig from 'src/configs/auth'

interface IRoleParams {
  sort?: 'desc' | 'asc'
  sort_by?: string
  page?: number
  paginate?: number
  with?: string
}

interface INewRoleData {
  name: string
  description?: string
  partner_id?: number | null
  abilities: number[]
}

interface IUpdateRoleData {
  body: INewRoleData
  id: number
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

  const getSingleRole = (id: number) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/roles/${id}`,
      method: 'GET',
      params: { with: 'abilities' }
    })
  }

  const postRole = (data: INewRoleData) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/roles`,
      method: 'POST',
      data
    })
  }

  const putRole = (data: IUpdateRoleData) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/roles/${data.id}`,
      method: 'PUT',
      data: data.body
    })
  }

  const getAbilities = () => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/abilities',
      method: 'GET'
    })
  }

  return { getAllRoles, getSingleRole, postRole, putRole, getAbilities }
}

export default RolesService
