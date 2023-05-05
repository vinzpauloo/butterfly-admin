import request from "@/lib/request";
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface INotificationParams {
	data?: {
		with?: 'from'
		page?: number
	},
}

const NotificationService = () => {
	const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

	const getAllAdminNotifs = (params: INotificationParams) => {
		return request({
			headers: {
				...getHeaders(),
				"ngrok-skip-browser-warning": "69420", // only for dev
				"Accept": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			url: "/admin/notifications",
			method: "GET",
			params: params.data,
		});
	};

	return { getAllAdminNotifs };
};

export default NotificationService;