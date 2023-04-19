import request from "@/lib/request";
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IBundlesParams {
	bundle_id?: string
	data?: {
		site_id?: number
		name?: string
		description?: string
		price?: number
		currency?: string
		currency_code?: string
		product?: string
		amount?: number
		active?: boolean

		// POST create subscription
		videos?: boolean
		photos?: boolean
		live_streaming?: boolean
		video_call?: boolean
		live_chat?: boolean
		forever_vip?: boolean
		download?: boolean
		watch_ticket?: boolean
		offline_benefit?: boolean
	},
	token?: string
}

const BundlesService = () => {
	const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

	const getAllVIPBundles = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: "admin/subcriptions",
			method: "GET",
			params: params.data,
		});
	};

	const addVIPBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: "admin/subcriptions",
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const deleteVIPBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: `admin/subcriptions/${params.bundle_id}`,
			method: "DELETE",
			params: params.data,
		});
	};

	const editVIPBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: `admin/subcriptions/${params.bundle_id}`,
			method: "PUT",
			data: params.data, // if body is JSON
		});
	};

	const getAllCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: "admin/coins",
			method: "GET",
			params: params.data,
		});
	};

	const addCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: "admin/coins",
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const deleteCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: `admin/coins/${params.bundle_id}`,
			method: "DELETE",
			params: params.data,
		});
	};

	const editCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: `admin/coins/${params.bundle_id}`,
			method: "PUT",
			data: params.data, // if body is JSON
		});
	};

	return {
		getAllVIPBundles,
		addVIPBundle,
		deleteVIPBundle,
		editVIPBundle,
		getAllCoinsBundle,
		addCoinsBundle,
		deleteCoinsBundle,
		editCoinsBundle
	};
};

export default BundlesService;
