import request from '../../lib/request'

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
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420' // only for dev
      },
      url: '/users',
      method: 'POST',
      data: params.data
    })
  }

  const getLanguages = () => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420' // only for dev
      },
      url: '/languages',
      method: 'GET'
    })
  }

  const getCurrency = () => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420' // only for dev
      },
      url: '/currencies',
      method: 'GET'
    })
  }

  return { createUser, getLanguages, getCurrency }
}
