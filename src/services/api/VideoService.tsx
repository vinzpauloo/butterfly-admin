import request from "@/lib/request";

interface IVideoParams {
	data: {
		sort?: 'created_at'
		sort_by?: 'desc' | 'asc' | null | undefined
        with?: 'user'
	},
	token?: string
}

const VideoService = () => {

	const getAllVideos = (params: IVideoParams) => {
		return request({
			headers: {
                "X-Authorization": "postman|1",
                "ngrok-skip-browser-warning": "69420" // only for dev
            },
			url: "/works/admin",
			method: "GET",
			params: params.data,
		});
	};

	return { getAllVideos };
};

export default VideoService;
