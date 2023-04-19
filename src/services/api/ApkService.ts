import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

export const ApkService = () => {
 
    const getAllApks = () => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/admin/apks',
            method: 'GET',

        })
    }

  return {
    getAllApks
  }
}
