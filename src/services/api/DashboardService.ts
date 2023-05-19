// ** Lib Imports
import request from '../../lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Authentication
import authConfig from 'src/configs/auth'

// ** Types
import { AllDashboardData, ChartData, DashboardData, DataProps } from '@/types/apps/dashboardTypes'

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

    const getMostActiveContentCreatorCount = (params: DataProps<DashboardData>) => apiRequest('/users', params.data);
    const getMostActiveUsers = () => apiRequest('/admin/customers?most_active=true');
    const getMostFollowedCreator = (params: DataProps<DashboardData>) => apiRequest('/users', params.data);
    const getTopDownloadedVideos = (params: DataProps<DashboardData>) => apiRequest('/admin/works', params.data);
    const getTopDonators = (params: DataProps<AllDashboardData>) => apiRequest('/admin/donations', params.data);
    const getVideoBarChart = (params: DataProps<ChartData>) => apiRequest('/statistics', params.data);
    const getVIPandGuestChart = (params: DataProps<ChartData>) => apiRequest('/admin/customers', params.data);

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
