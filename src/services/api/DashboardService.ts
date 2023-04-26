import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface DashboardProps {
    data: {
        role?: string;
        count?: string;
        most_followed?: string;
    }
}

interface VideoBarChartProps {
    data: {
        from?: string;
        to?: string;
        weekly?: string;
        daily?: string;
        monthly?: string;
        yearly?: string;
    }
}

interface VIPandGuestChartProps {
    data: {
        from?: string;
        to?: string;
        sort?: any;
        sort_by?: string;
    }
}

export const DashboardService = () => {

  const getMostActiveContentCreatorCount = (params: DashboardProps) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/users',
            method: 'GET',
            params: params.data
        })
    }
    
    const getMostActiveUsers = () => {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/admin/customers?most_active=true',
            method: 'GET'
        })
    }

    const getMostFollowedCreator = (params: DashboardProps) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/users',
            method: 'GET',
            params: params.data
        })
    }

    // Video Bar Chart
    const getVideoBarChart = (params: VideoBarChartProps) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/statistics',
            method: 'GET',
            params: params.data
        })
    }

     // VIP Members and Guest Chart
    const getVIPandGuestChart = (params: VIPandGuestChartProps) => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        return request({
            headers: {
                ...getHeaders(),
                 'ngrok-skip-browser-warning': '69420', // only for dev
                Authorization: `Bearer ${accessToken}`
            },
            url: '/admin/customers',
            method: 'GET',
            params: params.data
        })
    }


    return {
        getMostActiveContentCreatorCount,
        getMostActiveUsers,
        getMostFollowedCreator,
        getVideoBarChart,
        getVIPandGuestChart
  }
}
