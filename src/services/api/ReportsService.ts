import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface BaseProps<T ,U> {
    data?: T
    params?: U
}

interface ReportsParams {
    sort?: string;
    sort_by?: string;
    site_id?: string;
}

interface ReportsData {
    user_id?: number;
}

export const ReportsService = () => {

    const getSecurityFunds = (props: BaseProps<ReportsData,ReportsParams>) => {

        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
            
        return request({
            headers: {
                ...getHeaders(),
                'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/admin/security/funds',
            method: 'GET',
            params: props.params
        })
    }


    return {
        getSecurityFunds,
    }
}