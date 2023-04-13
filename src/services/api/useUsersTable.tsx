import request from '../../lib/request'

interface UsersData {
  data: {
    role?: string
    role_id?: any
    page?: number
    sort?: any
    sort_by?: string
    search_by?: string
    search_value?: string
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

export const useUsersTable = () => {
  const getUsers = (params: UsersData) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'ngrok-skip-browser-warning': '69420' // only for dev
      },
      url: '/users',
      method: 'GET',
      params: params.data
    })
  }

  const getAllDataForCSV = async (params: UsersData) => {
    return request(
      {
        headers: {
          'X-Authorization': 'postman|0',
          'ngrok-skip-browser-warning': '69420' // only for dev
        },
        url: `/users?export=true&role=${params.data.role}`,
        method: 'GET',
        params: params.data
      },
      processData
    )
  }

  const getAllDataFromCreator = () => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'ngrok-skip-browser-warning': '69420' // only for dev
      },
      url: `/users?role=CC&all=true`,
      method: 'GET'
    })
  }

  const updateUser = (id: any, data: any) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': '69420' // only for dev
      },
      url: `/users/${id}`,
      method: 'POST',
      data: data
    })
  }

  const getSpecificUser = (params: UserData) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420' // only for dev
      },
      url: `/users/${params.data.id}`,
      method: 'GET',
      params: params.data
    })
  }

  return {
    getUsers,
    getAllDataForCSV,
    updateUser,
    getSpecificUser,
    getAllDataFromCreator
  }
}
