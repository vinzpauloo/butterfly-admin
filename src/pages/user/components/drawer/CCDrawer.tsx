// ** React Imports
import { useState } from 'react'

import { useRouter } from 'next/router'

// ** MUI Imports
import { Radio, RadioGroup, Drawer, Button, TextField, IconButton, Typography } from '@mui/material'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Other Imports
import CreatedSuccessful from '../form/CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks
import { CreateAccount } from '@/services/api/CreateAccount'

interface FormValues {
  role_id: string
  username: string
  password: string
  password_confirmation: string
  mobile: string
  email: string
  note: string
}

const schema = yup.object().shape({
  username: yup.string().min(7, 'Username must be at least 7 characters').required(),
  password: yup.string().min(7, 'Password must be at least 7 characters').required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password.'),
  mobile: yup
    .string()
    .matches(/^(09|\+639)\d{9}$/, 'Invalid Mobile Number')
    .required(),
  email: yup.string().email().required('Email is required.')
})
interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const CCDrawer = (props: SidebarAddUserType) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()
  const [formValue, setFormValue] = useState<FormValues>({
    role_id: '3',
    username: '',
    password: '',
    password_confirmation: '',
    mobile: '',
    email: '',
    note: ''
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const { createUser } = CreateAccount()
  const mutation = useMutation(createUser)
  const [responseError, setResponseError] = useState<any>()

  const handleFormSubmit = async () => {
    const userData = {
      data: formValue
    }

    try {
      await mutation.mutateAsync(userData)
      setSubmitted(true)

      setTimeout(() => {
        toggle()
        setSubmitted(false)
        setFormValue({
          role_id: '3',
          username: '',
          password: '',
          password_confirmation: '',
          mobile: '',
          email: '',
          note: ''
        })

        // Re-fetches UserTable and CSV exportation
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
        queryClient.invalidateQueries({ queryKey: ['UsersTableCSV'] })
      }, 1500)
    } catch (e: any) {
      const {
        data: { error }
      } = e
      setResponseError(error)
    }
  }

  const displayErrors = () => {
    const errorElements: any = []

    for (const key in responseError) {
      responseError[key].forEach((value: any) => {
        errorElements.push(
          <Typography key={`${key}-${value}`} sx={{ color: 'red' }}>
            {value}
          </Typography>
        )
      })
    }

    return errorElements
  }

  const handleClose = () => {
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Content Creator</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            {/* <Box sx={{ display: 'flex', backgroundColor: '#A459D1', padding: 4 }}>
              <Typography sx={styles.white}>Content Creator</Typography>
            </Box> */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Entire Desired Username'
                    variant='outlined'
                    fullWidth
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    value={formValue.username}
                    onChange={handleFormInputChange}
                    name='username'
                  />
                </Box>
                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Enter Password'
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
                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Re-enter Password'
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

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Mobile No.'
                    variant='outlined'
                    fullWidth
                    {...register('mobile')}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    value={formValue.mobile}
                    onChange={handleFormInputChange}
                    name='mobile'
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Email Address'
                    variant='outlined'
                    fullWidth
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    value={formValue.email}
                    onChange={handleFormInputChange}
                    name='email'
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Notes'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    {...register('note')}
                    value={formValue.note}
                    onChange={handleFormInputChange}
                    name='note'
                  />
                </Box>

                {displayErrors()}
                <Box sx={styles.formButtonContainer}>
                  <Box>
                    <Button sx={styles.cancelButton}>
                      <Typography sx={styles.text}>Cancel</Typography>
                    </Button>
                  </Box>

                  <Box>
                    <Button type='submit' sx={styles.continueButton}>
                      <Typography sx={styles.text}>Continue</Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        ) : (
          <CreatedSuccessful />
        )}
      </Box>
    </Drawer>
  )
}

const styles = {
  container: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#A459D1',
    padding: 4
  },
  radio: {
    display: 'flex',
    alignItems: 'center'
  },
  white: {
    color: 'white'
  },
  formContent: {
    marginTop: 5
  },
  fullWidth: {
    width: '100%',
    mt: 5
  },
  textInput: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '50%'
    }
  },
  formContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    gap: {
      xs: 0,
      lg: 5
    }
  },
  formButtonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'column'
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 5,
    gap: 3
  },
  cancelButton: {
    backgroundColor: '#98A9BC',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#7899ac'
    }
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-in-out'
    }
  },
  continueButton: {
    backgroundColor: '#9747FF',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#9747FF'
    }
  }
}

export default CCDrawer
