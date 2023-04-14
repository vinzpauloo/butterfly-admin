import request from '@/lib/request'
import authConfig from 'src/configs/auth'

interface IAnnouncementParams {
	parentID?: string
	announcementID?: string
	data: {
		with?: "introductions"
		style?: "text" | "image"
		type?: "introduction"
		title?: string
		description?: string
		start_date?: string
		end_date?: string
		_method?: "put"
		active?: 0 | 1
	}
	token?: string
}

const AnnouncementsService = () => {
	const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

	const getAllAnnouncement = (params: IAnnouncementParams) => {
		return request({
			headers: {
				'X-Authorization': 'postman|1',
				'ngrok-skip-browser-warning': '69420', // only for dev
				Authorization: `Bearer ${accessToken}`
			},
			url: '/admin/announcements',
			method: 'GET',
			params: params.data,
		})
	}

	const createAnnouncement = (params: IAnnouncementParams) => {
		return request({
			headers: {
				'X-Authorization': 'postman|1',
				'ngrok-skip-browser-warning': '69420', // only for dev
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${accessToken}`
			},
			url: '/admin/announcements',
			method: 'POST',
			params: params.data,
		})
	}

	const updateAnnouncement = (params: IAnnouncementParams) => {
		return request({
			headers: {
				'X-Authorization': 'postman|1',
				'ngrok-skip-browser-warning': '69420', // only for dev
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${accessToken}`
			},
			url: `/admin/announcements/${params.parentID}/introductions/${params.announcementID}`,
			method: 'POST',
			data: params.data, // if body is JSON
		})
	}

	// WIP
	// const deleteAnnouncement = (params: IAnnouncementParams) => {
	// 	return request({
	// 		headers: {
	// 			'X-Authorization': 'postman|1',
	// 			'ngrok-skip-browser-warning': '69420', // only for dev
	// 			Authorization: `Bearer ${accessToken}`
	// 		},
	// 		url: '/admin/announcements',
	// 		method: 'DELETE',
	// 		params: params.data,
	// 	})
	// }

	return { getAllAnnouncement, createAnnouncement, updateAnnouncement }
}

export default AnnouncementsService
