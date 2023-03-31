import request from '../../lib/request'
import authConfig from 'src/configs/auth'

interface IGetWorkgroup {
  page: number
  paginate: number
}
interface IGetSearchWorkgroup {
  page: number
  search_by: string
  search_value?: string
  select: string
  navbar?: string
  template_id?: string
}

interface IPostWorkgroup {
  title: string
  navbar: string
  template_id: string
  single?: string
  multiple?: string[]
  all: string[]
}

const WorkgroupService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getWorkgroup = (params: IGetWorkgroup) => {
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

  const postWorkgroup = (params: IPostWorkgroup) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/workgroups',
      method: 'POST',
      params: params
    })
  }

  const getSearchWorkgroups = (params: IGetSearchWorkgroup) => {
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

  return { getWorkgroup, postWorkgroup, getSearchWorkgroups }
}

export default WorkgroupService
