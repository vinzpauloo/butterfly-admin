import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

// interface IUserParams {
// 	data: {
// 		user_id?: number;
// 		paginate?: number;
// 		page?: number;
// 	};
// 	token?: string;
// }

const UserService = () => {
	const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

	const getSpecificContentCreator = () => {
		return request({
			headers: {
				...getHeaders(),
				'ngrok-skip-browser-warning': '69420', // only for dev
				Authorization: `Bearer ${accessToken}`
			},
			url: "/users/profile",
			method: "GET",
		});
	};


	return { getSpecificContentCreator }
}

export default UserService
