import request from "@/lib/request";
import authConfig from 'src/configs/auth';
import { getHeaders } from "@/lib/cryptoJs";

interface IWithdrawalMinMax  {
    site_id : number
    min_amount : number
    max_count_per_day : number
    max_amount_per_day : number
    max_count_per_month : number
    max_amount_per_month : number
}

interface ISecuritySettingsThreshold {
    site_id : number
    security_threshold : number
}

// ****** Widthdrawals Settings ***********/

export const WithdrawalSettingsService = () => {

    const postWithdrawalMinMax = (params : IWithdrawalMinMax) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        const DUMMYURLONLY = 'https://webhook.site/4a2bdaa3-8ab2-40a4-aed2-e73c7ff1d131'

        return request({
            headers : {
                ...getHeaders(),
                Authorization: `Bearer ${accessToken}`
            },
            url : DUMMYURLONLY,
            method : 'POST',
            params : params
        })


    }

    return {
        postWithdrawalMinMax
    }
}



// ********* Security Funds Settings ****************/
export const SecuritySettingsService = () => {

    const postSettingsThreshold = (params : ISecuritySettingsThreshold) => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        const DUMMYURLONLY = 'https://webhook.site/4a2bdaa3-8ab2-40a4-aed2-e73c7ff1d131'

        return request({
            headers : {
                ...getHeaders(),
                Authorization: `Bearer ${accessToken}`
            },
            url : DUMMYURLONLY,
            method : 'POST',
            params : params
        })


    }

    return {
        postSettingsThreshold
    }

}