import request from '@/lib/request'

export const useUsersTable = () => {
  const getOperators = (page = 1) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1'
      },
      url: `/users?role=SUPERVISOR&page=${page}`,

      method: 'GET'
    })
  }

  const getSuperAgents = (page = 1) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1'
      },
      url: `/users?role=SA&page=${page}`,

      method: 'GET'
    })
  }

  const getContentCreators = (page = 1) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1'
      },
      url: `/users?role=CC&page=${page}`,

      method: 'GET'
    })
  }

  return { getOperators, getSuperAgents, getContentCreators }
}
