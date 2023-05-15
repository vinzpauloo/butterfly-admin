// ** Lib Imports
import request from '../../lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Authentication
import authConfig from 'src/configs/auth'

// ** Types
import { AllDashboardDataProps,DashboardProps, ChartProps } from '@/types/apps/dashboardTypes'

export const DashboardService = () => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const headers = {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
    }

    const apiRequest = <Params>(url: string, params?: Params | undefined): Promise<Params> => {
        return request({
            headers,
            url,
            method: 'GET',
            params
        })
    }

    const getMostActiveContentCreatorCount = (params: DashboardProps) => apiRequest('/users', params.data);
    const getMostActiveUsers = () => apiRequest('/admin/customers?most_active=true');
    const getMostFollowedCreator = (params: DashboardProps) => apiRequest('/users', params.data);
    const getTopDownloadedVideos = (params: DashboardProps) => apiRequest('/admin/works', params.data);
    const getTopDonators = (params: AllDashboardDataProps) => apiRequest('/admin/donations', params.data);
    const getVideoBarChart = (params: ChartProps) => apiRequest('/statistics', params.data);
    const getVIPandGuestChart = (params: ChartProps) => apiRequest('/admin/customers', params.data);

    return {
        getMostActiveContentCreatorCount,
        getMostActiveUsers,
        getMostFollowedCreator,
        getTopDownloadedVideos,
        getVideoBarChart,
        getVIPandGuestChart,
        getTopDonators
    }
}
