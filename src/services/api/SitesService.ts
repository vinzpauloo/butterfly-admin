import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface ISitesParams {
	data?: {
		policy?: string
		provisions?: string
		about?: string
		_method?: "put"
		detail?: "provisions" | "policy" | "about"
	}
}

const SitesService = () => {
	const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

	const getSiteOtherDetails = (params: ISitesParams) => {
		return request({
			headers: {
				...getHeaders(),
				'ngrok-skip-browser-warning': '69420', // only for dev
				Authorization: `Bearer ${accessToken}`
			},
			url: '/admin/sites/others',
			method: 'GET',
			params: params.data,
		})
	}

	const updateSiteOtherDetails = (params: ISitesParams) => {
		return request({
			headers: {
				...getHeaders(),
				'ngrok-skip-browser-warning': '69420', // only for dev
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${accessToken}`
			},
			url: '/admin/sites/others',
			method: 'POST',
			data: params.data, // if body is JSON
		})
	}

	return { getSiteOtherDetails, updateSiteOtherDetails }
}

export default SitesService
