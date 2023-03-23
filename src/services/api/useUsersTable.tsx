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

  return { getUsers }
}
