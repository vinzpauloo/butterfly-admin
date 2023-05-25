import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Button, Modal, Stack, TextField, Typography, IconButton, Avatar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import TransactionsService from '@/services/api/Transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandling } from '@/hooks/useErrorHandling';
import { useTranslateString } from '@/utils/TranslateString';
import { useAuth } from '@/services/useAuth'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  boxShadow: 24,
}

type Props = {
  data: {
    id: number | undefined,
    photo: string,
    name: string,
    amount: string,
    note: string
    status: string
  }
  isRequestWithdraw: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const WithdrawModal = (props: Props) => {
  const { data, isRequestWithdraw, open, setOpen } = props
  const [note, setNote] = useState<string>(isRequestWithdraw ? '' : data.note)
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()
  const auth = useAuth()

  const { requestWithdrawal, approveWithdrawal, declineWithdrawal } = TransactionsService()
  const queryClient = useQueryClient()
  const { mutate: mutateRequest } = useMutation(requestWithdrawal, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['transactionEarnings']
      })
    },
    onError: (e: any) => {
      handleError(e, `approveWithdrawal() WithdrawModal`)
    }
  })

  const { mutate: mutateApprove } = useMutation(approveWithdrawal, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['transactionEarnings']
      })
    },
    onError: (e: any) => {
      handleError(e, `approveWithdrawal() WithdrawModal`)
    }
  })

  const { mutate: mutateDecline } = useMutation(declineWithdrawal, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['transactionEarnings']
      })
    },
    onError: (e: any) => {
      handleError(e, `declineWithdrawal() WithdrawModal`)
    }
  })

  const submitRequest = () => {
    mutateRequest({
      data: {
        withdrawal_account_id: 2,
        note: note,
      }
    })
    setOpen(false)
  }

  const approveRequest = () => {
    mutateApprove({ data: { id: data.id } })
    setOpen(false)
  }

  const declineRequest = () => {
    mutateDecline({ data: { id: data.id } })
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Stack alignItems='center' p={5} borderRadius={1} sx={style} gap={4} width={[350, 500, 500]}>
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => setOpen(false)}>
          <CloseIcon/>
        </IconButton>
        {isRequestWithdraw ?
          <Typography variant='h6'>Request Withdraw</Typography> :
          <>
            <Stack alignItems='center' gap={2}>
              <Avatar sx={{width: 60, height: 60}} src={data.photo}/>
              <Typography>{data.name}</Typography>
            </Stack>
            <TextField value={data.amount} label='Amount' fullWidth/>        
          </>
        }
        <TextField
          label='Note'
          fullWidth multiline minRows={4} maxRows={4} value={note}
          onChange={(event: ChangeEvent<HTMLInputElement>) => isRequestWithdraw && setNote(event.target.value)}
        />
        {isRequestWithdraw ?
          <Button variant='contained' onClick={submitRequest}>{TranslateString('Submit')}</Button> :
          <>
            {data.status === 'Approved'&& <Typography color='green'>{TranslateString('Request Approved')}</Typography>}
            {data.status === 'Declined' && <Typography color='red'>{TranslateString('Request Declined')}</Typography>}
            {data.status === 'Pending' && auth.user?.role === 'GOD' &&
              <Stack direction='row' gap={4}>
                <Button variant='outlined' onClick={approveRequest}>{TranslateString('Approve')}</Button>
                <Button variant='outlined' onClick={declineRequest} color='error'>{TranslateString('Decline')}</Button>
              </Stack>
            }
          </>
        }
      </Stack>
    </Modal>
  )
}

export default WithdrawModal
