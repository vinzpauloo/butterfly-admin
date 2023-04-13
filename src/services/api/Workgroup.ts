import request from '../../lib/request'
import authConfig from 'src/configs/auth'

interface IGetWorkgroup {
  page: number
  paginate: number
  sort: string
  sort_by: string
  search_by: string
  search_value?: string
  select?: string
  navbar?: string
  template_id?: string
}
interface IGetSpecificWorkgroup {
  id: string
}
interface IGetAllWorkgroup {
  workgroup_id: string
}

interface IPostWorkgroup {
  title: string
  navbar: string
  template_id: string
  single?: string
  multiple?: string[]
  all: string[]
}
interface IPutWorkgroup {
  id: string
  data: {
    title: string
    navbar: string
    template_id: string
    single?: string
    multiple?: string[]
  }
}

interface ICheckWorkgroup {
  id: string
  data: {
    work: string
  }
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
      url: 'admin/workgroups',
      method: 'POST',
      data: params
    })
  }

  const putWorkgroup = (params: IPutWorkgroup) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/workgroups/${params.id}`,
      method: 'PUT',
      data: params.data
    })
  }

  const getSpecificWorkgroup = (params: IGetSpecificWorkgroup) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/workgroups/${params.id}`,
      method: 'GET'
    })
  }

  const getAllWorkgroup = (params: IGetAllWorkgroup) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: 'admin/works',
      method: 'GET',
      params: params
    })
  }

  const deleteCheckWorkgroup = (params: ICheckWorkgroup) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/workgroups/${params.id}/all`,
      method: 'DELETE',
      params: params.data
    })
  }

  const postCheckWorkgroup = (params: ICheckWorkgroup) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/workgroups/${params.id}/all`,
      method: 'POST',
      params: params.data
    })
  }

  return {
    getWorkgroup,
    postWorkgroup,
    getSpecificWorkgroup,
    putWorkgroup,
    getAllWorkgroup,
    deleteCheckWorkgroup,
    postCheckWorkgroup
  }
}

export default WorkgroupService
