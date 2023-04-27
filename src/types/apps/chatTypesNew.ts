// ** Types
import { Dispatch } from 'redux'
import { ThemeColor } from 'src/@core/layouts/types'

export type StatusType = 'busy' | 'away' | 'online' | 'offline'

export type StatusObjType = {
  busy: ThemeColor
  away: ThemeColor
  online: ThemeColor
  offline: ThemeColor
}

export type ProfileUserType = {
  id: number
  role: string
  about: string
  avatar: string
  fullName: string
  status: StatusType
  settings: {
    isNotificationsOn: boolean
    isTwoStepAuthVerificationEnabled: boolean
  }
}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatType = {
  message: string
  senderId: number
  time: Date | string
  feedback: MsgFeedbackType
}

export type ChatsObj = {
  id: number
  userId: number
  chat: ChatType[]
  unseenMsgs: number
  lastMessage?: ChatType
}

export type ContactType = {
  id: number
  role: string
  about: string
  avatar?: string
  fullName: string
  status: StatusType
  avatarColor?: ThemeColor
}

export type ChatsArrType = {
  id: number
  role: string
  about: string
  chat: ChatsObj
  avatar?: string
  fullName: string
  status: StatusType
  avatarColor?: ThemeColor
}

export type SelectedChatType = null | {
  chat: ChatsObj
  contact: ChatsArrType
}

export type ChatStoreType = {
  chats: ChatsArrType[] | null
  contacts: ContactType[] | null
  userProfile?: ProfileUserType | null
  selectedChat?: SelectedChatType
}

export type SendMsgParamsType = {
  chat?: ChatsObj
  message: string
  contact?: ChatsArrType
}

export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  dispatch?: Dispatch<any>
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  sendMsg?: (params: SendMsgParamsType) => void
  handleUserProfileRightSidebarToggle: () => void
  activeChat: IChatsList | null
  activeChannel: string
}

export interface IChatsList {
  _id: string
  created_at: string
  latest_message: string
  photo: string
  username: string
}

export type ChatSidebarLeftType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  dispatch?: Dispatch<any>
  leftSidebarOpen: boolean
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  removeSelectedChat?: () => void
  selectChat?: (id: number) => void
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
  formatDateToMonthShort: (value: string, toTimeForCurrentDay: boolean) => void
  chatsList: IChatsList[]
  activeChat: IChatsList | null
  setActiveChat: (activeChat: IChatsList | null) => void
  setActiveChannel: (activeChannel: string) => void
}

export type UserProfileLeftType = {
  hidden: boolean
  store?: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
}

export type UserProfileRightType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  getInitials: (val: string) => string
  handleUserProfileRightSidebarToggle: () => void
}

export type SendMsgComponentType = {
  store: ChatStoreType
  // dispatch: Dispatch<any>
  // sendMsg: (params: SendMsgParamsType) => void
  activeChat: IChatsList | null
  activeChannel: string
}

export type ChatLogType = {
  hidden: boolean
  userProfile: IChatsList
  chat: MessageType[]
  isLoading: boolean
  isRefetching: boolean
}

export type MessageType = {
  // time: string | Date
  // message: string
  // senderId: number
  // feedback: MsgFeedbackType
  _id: string
  created_at: string
  message: string
  from_id: string
  to_id: string
}

export type ChatLogChatType = {
  msg: string
  time: string | Date
}

export type FormattedChatsType = {
  senderId: number | string
  messages: ChatLogChatType[]
}

export type MessageGroupType = {
  senderId: number | string
  messages: ChatLogChatType[]
}
