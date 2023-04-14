import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface UsersData {
  data: {
    role?: string
    username?: string
    password?: string
    password_confirmation?: string
    mobile?: string
    email?: string
    note?: string
  }
}

export const CreateAccount = () => {
  const createUser = (params: UsersData) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/users',
      method: 'POST',
      data: params.data
    })
  }

  const getLanguages = () => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/languages',
      method: 'GET'
    })
  }

  const getCurrency = () => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/currencies',
      method: 'GET'
    })
  }

  return { createUser, getLanguages, getCurrency }
}
