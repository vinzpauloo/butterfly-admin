// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { SendMsgComponentType } from 'src/types/apps/chatTypesNew'

// ** Hooks
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Service
import ChatService from '@/services/api/ChatService'

// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper
}))

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 5, 5)
}))

const SendMsgForm = (props: SendMsgComponentType) => {
  // ** Props
  const { store, activeChat, activeChannel } = props

  // ** State
  const [msg, setMsg] = useState<string>('')
  const queryClient = useQueryClient()
  const { postChat } = ChatService()

  // ** use to PUT or update the workgroup
  const { mutate: mutatePostChat, isLoading } = useMutation(postChat, {
    onSuccess: data => {
      console.log('mutatePostChat success', data)
      queryClient.invalidateQueries({ queryKey: ['singleChat', activeChannel] })
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      setMsg('')
    },
    onError: error => {
      console.log('mutatePostChat error', error)
    }
  })

  const handleSendMsg = (e: SyntheticEvent) => {
    e.preventDefault()

    if (activeChat?._id && activeChannel && msg.trim().length) {
      mutatePostChat({
        message: msg,
        to_id: activeChat._id
      })
    }
  }

  return (
    <Form onSubmit={handleSendMsg}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            value={msg}
            size='small'
            placeholder='Type your message here…'
            onChange={e => setMsg(e.target.value)}
            sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
            disabled={isLoading}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <IconButton size='small' sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:microphone' fontSize='1.375rem' />
          </IconButton>
          <IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 4, color: 'text.primary' }}>
            <Icon icon='mdi:attachment' fontSize='1.375rem' />
            <input hidden type='file' id='upload-img' />
          </IconButton> */}
          <Button type='submit' variant='contained' disabled={isLoading}>
            Send
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  )
}

export default SendMsgForm
