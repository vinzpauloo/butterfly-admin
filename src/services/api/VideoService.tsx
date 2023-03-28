import request from "@/lib/request";

interface IVideoParams {
	data: {
		sort?: 'created_at'
		sort_by?: 'desc' | 'asc' | null | undefined
        with?: 'user'
	},
	token?: string
}

interface IUpdateVideoParams {
	formData : FormData
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

	const updateVideoByWorkId = (params : IUpdateVideoParams) => {
		return request({
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			url: "/videos",
			method: "POST",
			data : params.formData
		})
	}

	return { getAllVideos, updateVideoByWorkId };
};

export default VideoService;
