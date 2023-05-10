import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface ApkProps {
  data: {
    site_id?: string
    name?: string
    version?: string
    download_link?: string
    os?: string
    sort?: any
    sort_by?: string
  }
}

export const ApkService = () => {

  const getAllSites = () => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/admin/sites?select=id,name,logo&paginate=false',
            method: 'GET',

        })
  }
 
    const getAllApks = (params: ApkProps) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: `/admin/apks`,
            method: 'GET',
            params: params.data
        })
  }
  
  const postAPK = (params: ApkProps) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
            ...getHeaders(),
              'Content-Type': 'multipart/form-data',
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: `/admin/apks`,
            method: 'POST',
            data: params.data
        })
  }
  
  const editAPK = (id:any,params: ApkProps) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
            ...getHeaders(),
              'Content-Type': 'multipart/form-data',
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: `/admin/apks/${id}`,
            method: 'POST',
            data: params.data
        })
  }

  return {
    getAllApks,
    getAllSites,
    postAPK,
    editAPK
  }
}
