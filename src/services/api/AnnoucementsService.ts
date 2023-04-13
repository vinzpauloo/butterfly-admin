import request from '@/lib/request'
import authConfig from 'src/configs/auth'

interface IAnnouncementParams {
	data: {
		
	}
	token?: string
}


const AnnouncementsService = () => {
	const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

	// WIP
	const getAnnouncementLists = () => {
		return request({
			headers: {
				'X-Authorization': 'postman|1',
				'ngrok-skip-browser-warning': '69420', // only for dev
				Authorization: `Bearer ${accessToken}`
			},
			url: '/admin/announcements/list',
			method: 'GET',
		})
	}




	return { getAnnouncementLists, }
}

export default AnnouncementsService
