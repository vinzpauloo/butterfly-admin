import request from '../../lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface BaseData {
    from?: string
    to?: string
    select?: string
    sort_By?: string
    sort?: string
    with?: string
}

interface DashboardData extends BaseData {
    role?: string
    count?: string
    most_followed?: string
    top_downloaded?: string
    limit?: string
    paginate?: string
    top_donators?: string
    sum?: string
}

interface ChartData extends BaseData {
    weekly?: string
    daily?: string
    monthly?: string
    yearly?: string
}

interface DashboardProps {
    data: DashboardData
}

interface ChartProps {
    data: ChartData
}

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

    const apiRequest = <Params>(url: string, params?: Params) => {
        return request({
            headers,
            url,
            method: 'GET',
            params
        })
    }

    const getMostActiveContentCreatorCount = (params: DashboardProps) => apiRequest('/users', params);
    const getMostActiveUsers = () => apiRequest('/admin/customers?most_active=true');
    const getMostFollowedCreator = (params: DashboardProps) => apiRequest('/users', params);
    const getTopDownloadedVideos = (params: DashboardProps) => apiRequest('/admin/works', params);
    const getTopDonators = (params: DashboardProps) => apiRequest('/admin/donations', params);
    const getVideoBarChart = (params: ChartProps) => apiRequest('/statistics', params);
    const getVIPandGuestChart = (params: ChartProps) => apiRequest('/admin/customers', params);

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
