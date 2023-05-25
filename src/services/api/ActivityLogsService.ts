import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface BaseProps<T, U> {
    data?: T
    params?: U
}

interface ActivityLogsData {
    user_id?: number;
}

interface ActivityLogsParams {
    sort?: string | undefined | null
    sort_by?: string;
    site_id?: string;
    page?: string | number
    search_by?: string 
    search_value?: string
    with?: string
}

export const ActivityLogsService = () => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    
    const getActivityLogs = (props: BaseProps<ActivityLogsData,ActivityLogsParams>) => {
        return request({
            headers: {
                ...getHeaders(),
                'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/admin/activity-logs',
            method: 'GET',
            params: props.params
        })
    }


    return {  getActivityLogs }
}