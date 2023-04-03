import request from "@/lib/request";

interface IAdvertisementParams {
	banner_id?: string
	data: {
		id?: string
		site_id?: number
		photo?: any
		url?: string
		start_date?: string
		end_date?: string | null
		hidden?: boolean
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

	const createNewBannerAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				'Content-Type': 'multipart/form-data', // if POST is form-data
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: `/advertisements/admin/${params.data.id}/banner`,
			method: "POST",
			data: params.data, // if body is JSON
		});
	};

	const updateBannerAds = (params: IAdvertisementParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				'Content-Type': 'multipart/form-data', // if POST is form-data
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json"
			},
			url: `/advertisements/admin/${params.data.id}/banner/${params.banner_id}`,
			method: "PUT",
			data: params.data, // if body is JSON
		});
	};


	return { getAllAdminAds, createNewBannerAds, updateBannerAds };
};

export default AdvertisementService;