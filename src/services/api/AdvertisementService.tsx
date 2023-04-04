import request from "@/lib/request";

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
	},
	token?: string
}

const AdvertisementService = () => {
	const getAllAdminAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: "/advertisements/admin",
			method: "GET",
			params: params.data,
		});
	};

	const createNewAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				'Content-Type': 'multipart/form-data', // if POST is form-data
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: `/advertisements/admin/${params.id}/${params.relation}`,
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const updateAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				'Content-Type': 'multipart/form-data', // if POST is form-data
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: `/advertisements/admin/${params.id}/${params.relation}/${params.banner_id}`,
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const deleteAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: `/advertisements/admin/${params.id}/${params.relation}/${params.banner_id}`,
			method: "DELETE",
		});
	};


	return { getAllAdminAds, createNewAds, updateAds, deleteAds };
};

export default AdvertisementService;