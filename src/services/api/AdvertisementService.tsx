import request from "@/lib/request";

interface IAdvertisementParams {
	data: {
		site_id?: number
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


	return { getAllAdminAds };
};

export default AdvertisementService;