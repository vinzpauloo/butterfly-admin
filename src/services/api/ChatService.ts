import request from '@/lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Configs
import authConfig from 'src/configs/auth'

interface IChats {
  page: number
  paginate?: number
}

interface ISingleChatParams {
  channel: string
  page?: number
}

interface INewChatParams {
  message: string
  to_id: string
}

const ChatService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getAllChats = (params: IChats) => {
    return request({
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}`, ...getHeaders() },
      url: '/web/chats/contacts',
      method: 'GET',
      params
    })
  }

  const getSingleChat = (params: ISingleChatParams) => {
    return request({
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}`, ...getHeaders() },
      url: '/web/chats',
      method: 'GET',
      params
    })
  }

  const postChat = (body: INewChatParams) => {
    return request({
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}`, ...getHeaders() },
      url: '/web/chats',
      method: 'POST',
      body
    })
  }

  return { getAllChats, getSingleChat, postChat }
}

export default ChatService
