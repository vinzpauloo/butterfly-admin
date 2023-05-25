import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface UsersData {
  data: {
    role?: string
    role_id?: any
    page?: number
    sort?: any
    sort_by?: string
    search_by?: string
    search_value?: string
    with?: string
  }
}

interface UserData {
  data: {
    id?: string
    with?: string
  }
}

const processData = (response: any) => {
  if (response && response.data) {
    return response.data
  }

  return {}
}

export const UserTableService = () => {
  const getUsers = (params: UsersData) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/users',
      method: 'GET',
      params: params.data
    })
  }

  const getAllDataForCSV = async (params: UsersData) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request(
      {
        headers: {
          ...getHeaders(),
          'ngrok-skip-browser-warning': '69420', // only for dev
          Authorization: `Bearer ${accessToken}`
        },
        url: `/users?export=true&role=${params.data.role}`,
        method: 'GET',
        params: params.data
      },
      processData
    )
  }

  const getAllDataFromCreator = () => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/users?role=CC&all=true`,
      method: 'GET'
    })
  }

  const updateUser = (id: any, data: any) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/users/${id}`,
      method: 'POST',
      data: data
    })
  }

  const getSpecificUser = (params: UserData) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/users/${params.data.id}`,
      method: 'GET',
      params: params.data
    })
  }

  const getAllCustomers = (params?: UsersData) => {
     const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/customers',
      method: 'GET',
      params: params?.data
    })
  }

  return {
    getUsers,
    getAllDataForCSV,
    updateUser,
    getSpecificUser,
    getAllDataFromCreator,
    getAllCustomers
  }
}
