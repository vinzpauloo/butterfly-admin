import request from '../../lib/request'

interface UsersData {
  data: {
    role?: string
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

export const useUsersTable = () => {
  const getUsers = (params: UsersData) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1'
      },
      url: '/users',
      params: params.data
    })
  }

  const getAllDataFromSupervisor = () => {
    return request({
      headers: {
        'X-Authorization': 'postman|1'
      },
      url: `/users?role=SUPERVISOR&paginate=500`
    })
  }

  const getAllDataFromSuperAgent = () => {
    return request({
      headers: {
        'X-Authorization': 'postman|1'
      },
      url: `/users?role=SA&paginate=500`
    })
  }

  const getAllDataFromCreator = () => {
    return request({
      headers: {
        'X-Authorization': 'postman|1'
      },
      url: `/users?role=CC&paginate=500`
    })
  }

  const updateUser = (id: any, data: any) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'Content-Type': 'application/json'
      },
      url: `/users/${id}`,
      method: 'PUT',
      data: data
    })
  }

  const getSpecificUser = (params: UserData) => {
    return request({
      headers: {
        'X-Authorization': 'postman|0',
        'Content-Type': 'application/json'
      },
      url: `/users/${params.data.id}`,
      method: 'GET',
      params: params.data
    })
  }

  return {
    getUsers,
    getAllDataFromSupervisor,
    getAllDataFromSuperAgent,
    getAllDataFromCreator,
    updateUser,
    getSpecificUser
  }
}
