// ** React Imports
import { useRef, useEffect, Ref, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { CircularProgress, Stack } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent, { ScrollBarProps } from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'

// ** Hooks
import { useAuth } from '@/services/useAuth'

// ** Types Imports
import {
  ChatLogType,
  MessageType,
  MsgFeedbackType,
  ChatLogChatType,
  MessageGroupType,
  FormattedChatsType
} from 'src/types/apps/chatTypesNew'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

const PerfectScrollbar = styled(PerfectScrollbarComponent)<ScrollBarProps & { ref: Ref<unknown> }>(({ theme }) => ({
  padding: theme.spacing(5)
}))

const ChatLog = (props: ChatLogType) => {
  // ** Props
  const { hidden, userProfile, chat, isLoading, isRefetching, isRefetchingAllChats } = props

  // ** Hooks
  const auth = useAuth()

  // ** Ref
  const chatArea = useRef(null)

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        // @ts-ignore
        chatArea.current.scrollTop = Number.MAX_SAFE_INTEGER
      } else {
        // @ts-ignore
        chatArea.current._container.scrollTop = Number.MAX_SAFE_INTEGER
      }
    }
  }

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    const chatLog = chat
    const formattedChatLog: FormattedChatsType[] = []

    let chatMessageSenderId = userProfile?._id
    let msgGroup: MessageGroupType = {
      senderId: chatMessageSenderId,
      messages: []
    }
    chatLog.forEach((msg: MessageType, index: number) => {
      if (chatMessageSenderId === msg.from_id) {
        msgGroup.messages.push({
          time: msg.created_at,
          msg: msg.message
        })
      } else {
        chatMessageSenderId = msg.from_id

        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.from_id,
          messages: [
            {
              time: msg.created_at,
              msg: msg.message
            }
          ]
        }
      }

      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })

    return formattedChatLog
  }

  useEffect(() => {
    if (chat && chat.length) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat, isRefetching, isRefetchingAllChats])

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item: FormattedChatsType, index: number) => {
      // const isSender = item.senderId === data.userContact.id
      const isSender = item.senderId === auth.user?.id

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            mb: index !== formattedChatData().length - 1 ? 4 : undefined
          }}
        >
          <div>
            <CustomAvatar
              skin='light'
              // color={data.contact.avatarColor ? data.contact.avatarColor : undefined}
              sx={{
                width: '2rem',
                height: '2rem',
                fontSize: '0.875rem',
                ml: isSender ? 3.5 : undefined,
                mr: !isSender ? 3.5 : undefined
              }}
              {...(userProfile.photo && !isSender
                ? {
                    src: FILE_SERVER_URL + userProfile.photo,
                    alt: userProfile.username
                  }
                : {})}
              {...(isSender
                ? {
                    src: FILE_SERVER_URL + auth.user?.photo,
                    alt: auth.user?.username
                  }
                : {})}
            >
              {/* {data.contact.avatarColor ? getInitials(data.contact.fullName) : null} */}
            </CustomAvatar>
          </div>

          <Box className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            {item.messages.map((chat: ChatLogChatType, index: number, { length }: { length: number }) => {
              const time = new Date(chat.time)

              return (
                <Box key={index} sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
                  <div>
                    <Typography
                      sx={{
                        boxShadow: 1,
                        borderRadius: 1,
                        width: 'fit-content',
                        fontSize: '0.875rem',
                        p: theme => theme.spacing(3, 4),
                        ml: isSender ? 'auto' : undefined,
                        borderTopLeftRadius: !isSender ? 0 : undefined,
                        borderTopRightRadius: isSender ? 0 : undefined,
                        color: isSender ? 'common.white' : 'text.primary',
                        backgroundColor: isSender ? 'primary.main' : 'background.paper'
                      }}
                    >
                      {chat.msg}
                    </Typography>
                  </div>
                  {index + 1 === length ? (
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSender ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <Typography variant='caption'>
                        {time
                          ? new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                          : null}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              )
            })}
          </Box>
        </Box>
      )
    })
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return (
        <Box ref={chatArea} sx={{ p: 5, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </Box>
      )
    } else {
      return (
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      )
    }
  }

  return (
    <Box sx={{ height: 'calc(100% - 8.4375rem)' }}>
      {isLoading ? (
        <Stack alignItems='center' height={'100%'} justifyContent='center'>
          <CircularProgress size={48} sx={{ mr: 2 }} />
        </Stack>
      ) : (
        <ScrollWrapper>{renderChats()}</ScrollWrapper>
      )}
      {/* <ScrollWrapper>{renderChats()}</ScrollWrapper> */}
    </Box>
  )
}

export default ChatLog
