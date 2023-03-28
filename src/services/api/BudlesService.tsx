import request from "@/lib/request";

interface IBundlesParams {
	data: {
		site_id?: number
		bundle_id?: string
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
	const getAllVIPBundles = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/subcriptions/bundles",
			method: "GET",
			params: params.data,
		});
	};

	const addVIPBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/subcriptions",
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const deleteVIPBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/subcriptions",
			method: "DELETE",
			params: params.data,
		});
	};

	const editVIPBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/subcriptions",
			method: "PUT",
			data: params.data, // if body is JSON
		});
	};

	const getAllCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/coins/bundles",
			method: "GET",
			params: params.data,
		});
	};

	const addCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/coins",
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const deleteCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/coins",
			method: "DELETE",
			params: params.data,
		});
	};

	const editCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/coins",
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
