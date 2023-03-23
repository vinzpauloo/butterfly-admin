import request from "@/lib/request";

interface IBundlesParams {
	data: {
		site_id?: number
	},
	token?: string
}

const BundlesService = () => {
	const getAllVIPBundles = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420" // only for dev
			},
			url: "/subcriptions/bundles",
			method: "GET",
			params: params.data,
		});
	};

	const getAllCoinsBundle = (params: IBundlesParams) => {
		return request({
			headers: {
				"X-Authorization": "postman|1",
				"ngrok-skip-browser-warning": "69420" // only for dev
			},
			url: "/coins/bundles",
			method: "GET",
			params: params.data,
		});
	};

	return { getAllVIPBundles, getAllCoinsBundle };
};

export default BundlesService;
