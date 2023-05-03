import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IUserParams {
  user_id?: number;
  data?: {
    paginate?: number;
    page?: number;
    _method?: 'put'
    select?: 'username,photo'
    with?: 'partner'

    //updating user
    username?: string
    email?: string
    biography?: string
    mobile?: string
    photo?: any
    cover_photo?: any
  };
  token?: string;
}

const UserService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getUser = (params: IUserParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`,
        "Accept": "application/json",
      },
      url: `/users/${params.user_id}`,
      method: "GET",
      params: params.data
    });
  };

  const updateUser = (params: IUserParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data', // if POST is form-data
        'ngrok-skip-browser-warning': '69420', // only for dev
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: `/users/${params.user_id}`,
      method: "POST",
      data: params.data, // if body is JSON
    });
  };

  // for content creator only
  const getUserFollowers = (params: IUserParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`,
        "Accept": "application/json",
      },
      url: "/admin/followers/list",
      method: "GET",
      params: params.data
    });
  };

  // for content creator only
  const getUserDonators = (params: IUserParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`,
        "Accept": "application/json",
      },
      url: "/admin/donations/list",
      method: "GET",
      params: params.data
    });
  };

  return { getUser, updateUser, getUserFollowers, getUserDonators }
}

export default UserService
