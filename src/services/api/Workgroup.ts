import request from '../../lib/request'
import authConfig from 'src/configs/auth'

interface IWorkgroup {
  page: number
}

const WorkgroupService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getWorkgroup = (params: IWorkgroup) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/workgroups',
      method: 'GET',
      params: params
    })
  }

  return { getWorkgroup }
}

export default WorkgroupService
