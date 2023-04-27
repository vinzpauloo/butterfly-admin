import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'

interface IUserParams {
  data: {
    user_id?: number;
    paginate?: number;
    page?: number;
    _method?: 'put'

    //updating CC
    username?: string
    email?: string
    biography?: string
  };
  token?: string;
}

const UserService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getSpecificContentCreator = (params: IUserParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`,
        "Accept": "application/json",
      },
      url: `/users/${params.data.user_id}`,
      method: "GET",
    });
  };

  const updateContentCreator = (params: IUserParams) => {
    return request({
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data', // if POST is form-data
        'ngrok-skip-browser-warning': '69420', // only for dev
        "Accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      url: `/users/${params.data.user_id}`,
      method: "POST",
      data: params.data, // if body is JSON
    });
  };


  return { getSpecificContentCreator, updateContentCreator }
}

export default UserService
