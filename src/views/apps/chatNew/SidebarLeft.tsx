// ** React Imports
import { useState, useEffect, ChangeEvent, ReactNode } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks
import { useAuth } from '@/services/useAuth'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Badge from '@mui/material/Badge'
import Drawer from '@mui/material/Drawer'
import MuiAvatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ContactType, ChatSidebarLeftType, ChatsArrType, IChatsList } from 'src/types/apps/chatTypesNew'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>
  } else {
    return (
      <PerfectScrollbar
        options={{ wheelPropagation: false }}
        onYReachEnd={() => {
          console.log('Infinite scrolling logic here')
        }}
      >
        {children}
      </PerfectScrollbar>
    )
  }
}

const SidebarLeft = (props: ChatSidebarLeftType) => {
  // ** Props
  const {
    store,
    hidden,
    mdAbove,
    // dispatch,
    statusObj,
    userStatus,
    selectChat,
    sidebarWidth,
    setUserStatus,
    leftSidebarOpen,
    formatDateToMonthShort,
    handleLeftSidebarToggle,
    chatsList,
    activeChat,
    setActiveChat,
    setActiveChannel
  } = props

  // ** States
  const [query, setQuery] = useState<string>('')
  const [filteredChat, setFilteredChat] = useState<ChatsArrType[]>([])
  const [filteredContacts, setFilteredContacts] = useState<ContactType[]>([])
  // const [active, setActive] = useState<null | { id: string | number }>(null)

  // ** Hooks
  const router = useRouter()
  const auth = useAuth()

  const handleChatClick = (chat: IChatsList) => {
    const channel = `${chat?._id}-${auth.user?.id}` || ''

    setActiveChat(chat)
    setActiveChannel(channel)
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setActiveChat(null)
      setActiveChannel('')
      // dispatch(removeSelectedChat())
    })

    return () => {
      setActiveChat(null)
      setActiveChannel('')
      // dispatch(removeSelectedChat())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderChats = () => {
    if (store && store.chats && store.chats.length) {
      if (query.length && !filteredChat.length) {
        return (
          <ListItem>
            <Typography sx={{ color: 'text.secondary' }}>No Chats Found</Typography>
          </ListItem>
        )
      } else {
        const arrToMap = chatsList || []
        return arrToMap.map((chat: IChatsList, index: number) => {
          const activeCondition = activeChat !== null && activeChat._id === chat._id
          return (
            <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1.5 } }}>
              <ListItemButton
                disableRipple
                onClick={() => handleChatClick(chat)}
                sx={{
                  px: 3,
                  py: 2.5,
                  width: '100%',
                  borderRadius: 1,
                  alignItems: 'flex-start',
                  ...(activeCondition && {
                    backgroundImage: theme =>
                      `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
                  })
                }}
              >
                <ListItemAvatar sx={{ m: 0 }}>
                  <Badge
                    overlap='circular'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    {chat.photo && (
                      <MuiAvatar
                        src={FILE_SERVER_URL + chat.photo}
                        alt={chat.username}
                        sx={{
                          width: 38,
                          height: 38,
                          ...(activeCondition && { border: theme => `2px solid ${theme.palette.common.white}` })
                        }}
                      />
                    )}
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    my: 0,
                    ml: 4,
                    mr: 1.5,
                    '& .MuiTypography-root': { ...(activeCondition && { color: 'common.white' }) }
                  }}
                  primary={
                    <Typography noWrap sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {chat.username}
                    </Typography>
                  }
                  secondary={
                    <Typography noWrap variant='body2' sx={{ ...(!activeCondition && { color: 'text.disabled' }) }}>
                      {chat.latest_message}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ whiteSpace: 'nowrap', color: activeCondition ? 'common.white' : 'text.disabled' }}
                  >
                    {<>{formatDateToMonthShort(chat.created_at, true)}</>}
                  </Typography>
                  {/* {chat.chat.unseenMsgs && chat.chat.unseenMsgs > 0 ? (
                    <Chip
                      color='error'
                      label={chat.chat.unseenMsgs}
                      sx={{
                        mt: 0.5,
                        height: 18,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        '& .MuiChip-label': { pt: 0.25, px: 1.655 }
                      }}
                    />
                  ) : null} */}
                </Box>
              </ListItemButton>
            </ListItem>
          )
        })
      }
    }
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (store.chats !== null && store.contacts !== null) {
      const searchFilterFunction = (contact: ChatsArrType | ContactType) =>
        contact.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      const filteredChatsArr = store.chats.filter(searchFilterFunction)
      const filteredContactsArr = store.contacts.filter(searchFilterFunction)
      setFilteredChat(filteredChatsArr)
      setFilteredContacts(filteredContactsArr)
    }
  }

  return (
    <div>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 7,
          height: '100%',
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            boxShadow: 'none',
            width: sidebarWidth,
            position: mdAbove ? 'static' : 'absolute',
            borderTopLeftRadius: theme => theme.shape.borderRadius,
            borderBottomLeftRadius: theme => theme.shape.borderRadius
          },
          '& > .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute',
            zIndex: theme => theme.zIndex.drawer - 1
          }
        }}
      >
        <Box
          sx={{
            px: 5,
            py: 3.125,
            display: 'flex',
            alignItems: 'center',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <TextField
            fullWidth
            size='small'
            value={query}
            onChange={handleFilter}
            placeholder='Search for contact...'
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' sx={{ color: 'text.secondary' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </InputAdornment>
              )
            }}
          />
          {!mdAbove ? (
            <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
              <Icon icon='mdi:close' fontSize='1.375rem' />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ height: `calc(100% - 4.125rem)` }}>
          <ScrollWrapper hidden={hidden}>
            <Box sx={{ p: theme => theme.spacing(7, 3, 3) }}>
              <Typography variant='h6' sx={{ ml: 3, mb: 3, color: 'primary.main' }}>
                Chats
              </Typography>
              <List sx={{ p: 0 }}>{renderChats()}</List>
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>
    </div>
  )
}

export default SidebarLeft
