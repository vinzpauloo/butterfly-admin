// ** React Imports
import React, { useState } from 'react'

// ** Yup and Form Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'

// ** TanStack
import { useMutation } from '@tanstack/react-query'

interface FormValues {
  password: string
  password_confirmation: string
}

const schema = yup.object().shape({
  password: yup.string().required('Please enter your desired new password.'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please re-enter your new password to confirm.')
})

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number
  data: any
}

const FormModal: React.FC<FormModalProps> = ({ userId, data, isOpen, onClose }) => {
  const [formValue, setFormValue] = useState<FormValues>({
    password: '',
    password_confirmation: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const { updateUser } = useUsersTable()
  const mutation = useMutation(async (data: { id: any; data: any }) => {
    const response = await updateUser(data.id, data.data)
    if (response.ok) {
      await response.json()
    }
  })

  const handleFormSubmit = async () => {
    const { password, password_confirmation } = formValue

    if (password === password_confirmation) {
      await mutation.mutateAsync({
        id: userId,
        data: { password, password_confirmation }
      })
      alert(JSON.stringify(formValue))
      onClose()
    } else {
      alert('Passwords do not match')
    }

    alert(JSON.stringify(formValue))
    onClose()
  }

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div style={{ display: 'flex', backgroundColor: '#A459D1' }}>
        <DialogTitle sx={{ color: 'white' }}>Supervisor</DialogTitle>
      </div>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Typography>Username</Typography>
          <TextField label={data.username} variant='outlined' fullWidth name='username' disabled />
          <Box style={{ display: 'flex', gap: 20, marginTop: 20, marginBottom: 20 }}>
            <Box sx={{ width: '50%' }}>
              <Typography>Password</Typography>
              <TextField
                label='Enter New Password'
                variant='outlined'
                fullWidth
                type='password'
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                value={formValue.password}
                onChange={handleFormInputChange}
                name='password'
              />
            </Box>
            <Box sx={{ width: '50%' }}>
              <Typography>Re-enter New Password</Typography>
              <TextField
                label='Re-enter New Password'
                variant='outlined'
                fullWidth
                type='password'
                {...register('password_confirmation')}
                error={!!errors.password_confirmation}
                helperText={errors.password_confirmation?.message}
                value={formValue.password_confirmation}
                onChange={handleFormInputChange}
                name='password_confirmation'
              />
            </Box>
          </Box>
          <Box style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <Box sx={{ width: '50%' }}>
              <Typography>Mobile No.</Typography>
              <TextField label={data.mobile} variant='outlined' fullWidth name='mobileNo' disabled />
            </Box>
            <Box sx={{ width: '50%' }}>
              <Typography>Email Address</Typography>
              <TextField label={data.email} variant='outlined' fullWidth name='emailAddress' disabled />
            </Box>
          </Box>
          <Typography>Notes (Optional)</Typography>
          <TextField label={data.note} variant='outlined' fullWidth multiline rows={4} name='notes' disabled />
          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                backgroundColor: '#98A9BC',
                color: 'white',
                width: '200px',
                '&:hover': {
                  backgroundColor: '#7899ac'
                }
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  textTransform: 'uppercase',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
              >
                Cancel
              </Typography>
            </Button>
            <Button
              type='submit'
              sx={{
                backgroundColor: '#9747FF',
                color: 'white',
                width: '200px',
                '&:hover': {
                  backgroundColor: '#9747FF'
                }
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  textTransform: 'uppercase',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
              >
                Update
              </Typography>
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormModal
