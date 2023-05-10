// ** React Imports
import { Fragment, useEffect } from 'react'

// ** MUI Imports
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import ChatLog from './ChatLog'
import SendMsgForm from 'src/views/apps/chatNew/SendMsgForm'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Hooks
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/services/useAuth'

// ** Types
import { ChatContentType } from 'src/types/apps/chatTypesNew'

// ** Service
import ChatService from '@/services/api/ChatService'
import { subscribeToChannel } from '@/services/pusher'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}))

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    store,
    hidden,
    // sendMsg,
    mdAbove,
    // dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    handleLeftSidebarToggle,
    activeChat,
    activeChannel
  } = props

  // ** Hooks
  const auth = useAuth()
  const queryClient = useQueryClient()

  // ** React Query
  const { getSingleChat } = ChatService()
  const {
    data: singleChatData,
    isLoading,
    isRefetching
  } = useQuery({
    queryKey: ['singleChat', activeChannel],
    queryFn: () => getSingleChat({ chatId: activeChat?._id || '', params: { paginate: 1000 } }),
    onSuccess: data => {
      console.log('getSingleChat success ...', data)
    },
    onError: error => {
      console.log('getSingleChat error', error)
    },
    enabled: !!activeChat?._id
  })

  useEffect(() => {
    if (activeChannel) initializeChatChannel()
    console.log('useEffect activeChannel', activeChannel)
    console.log('useEffect activeChat', activeChat)
  }, [activeChannel])

  const initializeChatChannel = () => {
    console.log('initializeChatChannel')
    console.log('activeChannel', activeChannel)

    const eventName = 'message'
    const callback = (data: any) => {
      const callbackData = JSON.parse(data.message)
      // queryClient.invalidateQueries({ queryKey: ['singleChat', activeChannel] })
      queryClient.invalidateQueries({ queryKey: ['chats'] })

      console.log(`Callback for channel ${activeChannel}`, callbackData)
    }

    subscribeToChannel(activeChannel, eventName, callback)
  }

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  const renderContent = () => {
    const selectedChat = activeChat
    if (!selectedChat) {
      return (
        <ChatWrapperStartChat
          sx={{
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
          }}
        >
          <MuiAvatar
            sx={{
              mb: 6,
              pt: 8,
              pb: 7,
              px: 7.5,
              width: 110,
              height: 110,
              boxShadow: 3,
              backgroundColor: 'background.paper'
            }}
          >
            <Icon icon='mdi:message-outline' fontSize='3.125rem' />
          </MuiAvatar>
          <Box
            onClick={handleStartConversation}
            sx={{
              py: 2,
              px: 6,
              boxShadow: 3,
              borderRadius: 5,
              backgroundColor: 'background.paper',
              cursor: mdAbove ? 'default' : 'pointer'
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '1.125rem', lineHeight: 'normal' }}>
              Start Conversation
            </Typography>
          </Box>
        </ChatWrapperStartChat>
      )
    }

    return (
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'action.hover'
        }}
      >
        <Box
          sx={{
            py: 3,
            px: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {mdAbove ? null : (
              <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                <Icon icon='mdi:menu' />
              </IconButton>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Badge
                overlap='circular'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                sx={{ mr: 3 }}
              >
                <MuiAvatar
                  src={FILE_SERVER_URL + selectedChat.photo}
                  alt={selectedChat.username}
                  sx={{ width: '2.375rem', height: '2.375rem' }}
                />
              </Badge>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{selectedChat.username}</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {selectedChat._id}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {mdAbove ? (
              <Fragment>
                <IconButton size='small' sx={{ color: 'text.secondary' }}>
                  <Icon icon='mdi:phone-outline' fontSize='1.25rem' />
                </IconButton>
                <IconButton size='small' sx={{ color: 'text.secondary' }}>
                  <Icon icon='mdi:video-outline' fontSize='1.5rem' />
                </IconButton>
                <IconButton size='small' sx={{ color: 'text.secondary' }}>
                  <Icon icon='mdi:magnify' fontSize='1.25rem' />
                </IconButton>
              </Fragment>
            ) : null}

            <OptionsMenu
              menuProps={{ sx: { mt: 2 } }}
              icon={<Icon icon='mdi:dots-vertical' fontSize='1.25rem' />}
              iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
              options={['View Contact', 'Mute Notifications', 'Block Contact', 'Clear Chat', 'Report']}
            />
          </Box> */}
        </Box>

        {/* @ts-ignore */}
        <ChatLog
          hidden={hidden}
          userProfile={selectedChat}
          chat={singleChatData?.data || []}
          isLoading={isLoading}
          isRefetching={isRefetching}
        />

        <SendMsgForm
          // @ts-ignore
          store={store}
          //  dispatch={dispatch}
          //  sendMsg={sendMsg}
          activeChat={activeChat}
          activeChannel={activeChannel}
        />
      </Box>
    )
  }

  return renderContent()
}

export default ChatContent
