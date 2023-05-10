import request from '@/lib/request'
import { getHeaders } from '@/lib/cryptoJs'

// ** Configs
import authConfig from 'src/configs/auth'

interface IChats {
  params: {
    page: number
    paginate?: number
  }
}

interface ISingleChatParams {
  chatId: string
  params: {
    page?: number
    paginate?: number
  }
}

interface INewChatParams {
  message: string
  to_id: string
}

const ChatService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getAllChats = (data: IChats) => {
    return request({
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}`, ...getHeaders() },
      url: '/web/chats/contacts',
      method: 'GET',
      params: data.params
    })
  }

  const getSingleChat = (data: ISingleChatParams) => {
    return request({
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}`, ...getHeaders() },
      url: `/web/chats/${data.chatId}`,
      method: 'GET',
      params: data.params
    })
  }

  const postChat = (data: INewChatParams) => {
    return request({
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}`, ...getHeaders() },
      url: '/web/chats',
      method: 'POST',
      data
    })
  }

  return { getAllChats, getSingleChat, postChat }
}

export default ChatService
