import request from "@/lib/request";
import authConfig from 'src/configs/auth';
import { getHeaders } from "@/lib/cryptoJs";

interface IGlobalData  {
    security_fund_threshold : number
    withdrawal_min_amount : number
    withdrawal_max_count_per_day : number
    withdrawal_max_amount_per_day : number
    withdrawal_max_count_per_month : number
    withdrawal_max_amount_per_month : number
}

export const SettingsService = () => {

    const postGlobalSettings = (params : IGlobalData) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        const endpoint = '/admin/global/settings/1'

        return request({
            headers : {
                ...getHeaders(),
                Authorization: `Bearer ${accessToken}`
            },
            url : endpoint,
            method : 'PUT',
            params : params
        })

    }

    const getGlobalSettings = () => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        const endpoint = '/admin/global/settings/1'

        return request({
            headers : {
                ...getHeaders(),
                Authorization: `Bearer ${accessToken}`
            },
            url : endpoint,
            method : 'GET',
        })
    }

    return {
        postGlobalSettings,
        getGlobalSettings
    }
}
