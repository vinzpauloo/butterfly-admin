import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Button, Modal, Stack, TextField, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

// import { useTranslateString } from '@/utils/TranslateString';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  boxShadow: 24,
}

type Props = {
  isRequestWithdraw: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const WithdrawModal = (props: Props) => {
  const { isRequestWithdraw, open, setOpen } = props
  const [note, setNote] = useState<string>('')

  // const TranslateString = useTranslateString()

  const donationRecord = [
    {name: 'Donator1', amount: 1000},
    {name: 'Donator2', amount: 1800},
    {name: 'Donator3', amount: 500},
    {name: 'Donator4', amount: 200},
    {name: 'Donator5', amount: 1200},
  ]

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Stack alignItems='center' p={5} borderRadius={1} sx={style} gap={4} width={[350, 500, 500]}>
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => setOpen(false)}>
          <CloseIcon/>
        </IconButton>
        {!isRequestWithdraw && 
          <React.Fragment>
            <Typography>Ticket Nos: 000123</Typography>
            <Stack direction='row' boxShadow={2} p={3} width='100%' justifyContent='center' gap={1}>
              <Typography textTransform='uppercase'>Commission Total:</Typography>
              <Typography fontWeight='bold'> 15,000</Typography>
            </Stack>
            <Stack boxShadow={2} p={3} width='100%'>
              <Typography textAlign='center' fontWeight='bold' textTransform='uppercase'>Donations Record</Typography>
              <Stack direction='row' justifyContent='space-between' px={12}>
                <Typography>Donators</Typography>
                <Typography>Donations</Typography>
              </Stack>
              {donationRecord.map(item =>
                <Stack key={item.name} direction='row' justifyContent='space-between' px={12}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.amount}</Typography>
                </Stack>
              )}
            </Stack>
            <Stack boxShadow={2} p={3} width='100%' alignItems='center'>
              <Typography textTransform='uppercase'>Total Amount Withdrawn</Typography>
              <Typography fontWeight='bold'>¥19,700 CNY</Typography>
            </Stack>
          </React.Fragment>
        }
        <Typography textTransform='uppercase'>Notes</Typography>
        <TextField
          fullWidth multiline minRows={4} maxRows={4} value={note} disabled={!isRequestWithdraw}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNote(event.target.value)}
        />
        {isRequestWithdraw && <Button variant='contained'>Submit</Button>}
      </Stack>
    </Modal>
  )
}

export default WithdrawModal
