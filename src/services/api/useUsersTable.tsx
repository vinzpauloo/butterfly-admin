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

  return { getUsers, getAllDataFromSupervisor, getAllDataFromSuperAgent, getAllDataFromCreator }
}
