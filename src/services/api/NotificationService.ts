import request from "@/lib/request";
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface INotificationParams {
  id?: string
  data?: {
    with?: 'from'
    page?: number
    _method?: 'put'
    count_unseen?: boolean
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

  const makeNotificationSeen = (params: INotificationParams) => {
    return request({
      headers: {
        ...getHeaders(),
        "ngrok-skip-browser-warning": "69420", // only for dev
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/notifications/${params.id}`,
      method: "POST",
      params: params.data,
    });
  };

  return { getAllAdminNotifs, makeNotificationSeen };
};

export default NotificationService;