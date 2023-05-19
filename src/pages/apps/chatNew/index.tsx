// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Store & Actions Imports
// import { useDispatch, useSelector } from 'react-redux'
// import { sendMsg, selectChat, fetchUserProfile, fetchChatsContacts } from 'src/store/apps/chat'

// ** Types
import { RootState, AppDispatch } from 'src/store'
import { StatusObjType, StatusType, ChatStoreType, IChatsList } from 'src/types/apps/chatTypesNew'

// ** Sample Data
import { data } from 'src/@fake-db/apps/chat'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/services/useAuth'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { formatDateToMonthShort } from 'src/@core/utils/format'

// ** Chat App Components Imports
import SidebarLeft from 'src/views/apps/chatNew/SidebarLeft'
import ChatContent from 'src/views/apps/chatNew/ChatContent'

// ** Service
import ChatService from '@/services/api/ChatService'
import { subscribeToChannel } from '@/services/pusher'

const AppChat = () => {
  // ** States
  const [userStatus, setUserStatus] = useState<StatusType>('online')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState<boolean>(false)
  const [userProfileRightOpen, setUserProfileRightOpen] = useState<boolean>(false)
  const [activeChat, setActiveChat] = useState<IChatsList | null>(null)
  const [activeChannel, setActiveChannel] = useState<string>('')

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // @ts-ignore
  const store: ChatStoreType = data
  const auth = useAuth()
  const queryClient = useQueryClient()

  // ** Vars
  const { skin } = settings
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'))
  const sidebarWidth = smAbove ? 370 : 300
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'))
  const statusObj: StatusObjType = {
    busy: 'error',
    away: 'warning',
    online: 'success',
    offline: 'secondary'
  }

  // ** React Query
  const { getAllChats } = ChatService()
  const { data: chatsList, isRefetching: isRefetchingAllChats } = useQuery({
    queryKey: ['chats'],
    queryFn: () => getAllChats({ params: { page: 1, paginate: 15 } }),
    onSuccess: data => {
      console.log('getAllChats success', data)
    },
    onError: error => {
      console.log('getAllChats error', error)
    }
  })

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  useEffect(() => {
    initializeNotificationChannel()
  }, [])

  const initializeNotificationChannel = () => {
    const channel = auth.user && auth.user.id ? auth.user.id.toString() : ''

    console.log('initializeNotificationChannel', channel)

    const eventName = 'message'
    const callback = (data: any) => {
      // const callbackData = JSON.parse(data.message)
      const callbackData = data.message
      const thisChannelId = callbackData.from_id + '-' + callbackData.to_id

      queryClient.invalidateQueries({ queryKey: ['chats'] })
      queryClient.invalidateQueries({ queryKey: ['singleChat', thisChannelId] })

      console.log(`Callback for channel ${channel}`, callbackData)
    }

    subscribeToChannel(channel, eventName, callback)
  }

  return (
    <Box
      className='app-chat'
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
    >
      {/* @ts-ignore */}
      <SidebarLeft
        store={store}
        hidden={hidden}
        mdAbove={mdAbove}
        // dispatch={dispatch}
        statusObj={statusObj}
        userStatus={userStatus}
        // selectChat={selectChat}
        sidebarWidth={sidebarWidth}
        setUserStatus={setUserStatus}
        leftSidebarOpen={leftSidebarOpen}
        formatDateToMonthShort={formatDateToMonthShort}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        chatsList={chatsList?.data}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        setActiveChannel={setActiveChannel}
      />
      {/* @ts-ignore */}
      <ChatContent
        store={store}
        hidden={hidden}
        // sendMsg={sendMsg}
        mdAbove={mdAbove}
        // dispatch={dispatch}
        statusObj={statusObj}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        activeChat={activeChat}
        activeChannel={activeChannel}
        isRefetchingAllChats={isRefetchingAllChats}
      />
    </Box>
  )
}

AppChat.contentHeightFixed = true

AppChat.acl = {
  action: 'read',
  subject: 'chat-page'
}

export default AppChat
