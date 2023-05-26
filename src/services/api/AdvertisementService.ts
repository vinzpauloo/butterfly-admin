import request from "@/lib/request";
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IAdvertisementParams {
	id?: string
	banner_id?: string
	relation?: "banner" | "gif"
	data?: {
		site_id?: number
		photo?: any
		url?: string
		start_date?: string
		end_date?: string | null
		active?: number
		_method?: string
		language?: string
		locale?: string
	},
	token?: string
}

const AdvertisementService = () => {
	const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

	const getAllAdminAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: "/advertisements/admin",
			method: "GET",
			params: params.data,
		});
	};

	const createNewAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				...getHeaders(),
				'Content-Type': 'multipart/form-data', // if POST is form-data
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: `/advertisements/admin/${params.id}/${params.relation}`,
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const updateAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				...getHeaders(),
				'Content-Type': 'multipart/form-data', // if POST is form-data
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: `/advertisements/admin/${params.id}/${params.relation}/${params.banner_id}`,
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const deleteAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: `/advertisements/admin/${params.id}/${params.relation}/${params.banner_id}`,
			method: "DELETE",
		});
	};


	return { getAllAdminAds, createNewAds, updateAds, deleteAds };
};

export default AdvertisementService;