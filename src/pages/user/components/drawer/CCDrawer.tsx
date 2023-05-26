// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Button, IconButton, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Other Imports
import CreatedSuccessful from '../form/CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import { CreateAccount } from '@/services/api/CreateAccount'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import InputForm from '../form/InputForm'

interface FormValues {
  role_id: '3' | ''
  username: string
  password: string
  password_confirmation: string
  mobile: string
  email: string
  user_note: string
}

const schema = yup.object().shape({
  username: yup.string().min(7, 'Username must be at least 7 characters').required('Username is required'),
  password: yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  mobile: yup
    .string()
    .matches(/^(09|\+639)\d{9}$/, 'Invalid Mobile Number, format should be (09/+639)')
    .required('Mobile number is required'),
  email: yup.string().email('Invalid email address').required('Email address is required')
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
  backgroundColor: '#FF9C00'
}))

const CCDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()
  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const resetForm = () => {
    reset({
      role_id: '',
      username: '',
      password: '',
      password_confirmation: '',
      mobile: '',
      email: '',
      user_note: ''
    })
  }

  const { createUser } = CreateAccount()
  const mutation = useMutation(createUser)

  const handleFormSubmit = async (data: FormValues) => {
    const userData = {
      data: {
        ...data,
        role_id: '3'
      }
    }

    try {
      await mutation.mutateAsync(userData)
      setSubmitted(true)

      setTimeout(() => {
        toggle()
        resetForm()
        setSubmitted(false)

        // Re-fetches UserTable and CSV exportation
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
        queryClient.invalidateQueries({ queryKey: ['UsersTableCSV'] })
      }, 1500)
    } catch (e: any) {
      handleError(e, `createUser() CCDrawer.tsx`)
    }
  }

  const [resetKey, setResetKey] = useState(0)

  const handleClose = () => {
    resetForm()
    setResetKey(prevKey => prevKey + 1)
    clearErrorResponse()
    toggle()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
      <Header>
        <DialogTitle color='#FFF' textTransform='uppercase'>
          Add Content Creator
        </DialogTitle>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <DialogContent sx={{ mx: 4 }}>
        {!submitted ? (
          <form key={resetKey} onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={styles.formContent}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row'
                  },
                  gap: {
                    xs: 2,
                    sm: 5
                  }
                }}
              >
                <Box sx={{ flex: '1 0 40%' }}>
                  <Typography>Username</Typography>
                  <InputForm
                    width='100%'
                    controllerName='username'
                    control={control}
                    placeholder='Enter Desired Username'
                    variant='outlined'
                    fullWidth={true}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    name='username'
                  />
                </Box>

                <Box sx={{ flex: '1 0 40%' }}>
                  <Typography>Mobile No.</Typography>
                  <InputForm
                    width='100%'
                    controllerName='mobile'
                    control={control}
                    placeholder='Mobile No.'
                    variant='outlined'
                    fullWidth={true}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    name='mobile'
                    onKeyPress={e => {
                      // Allow only numbers and the '+' symbol
                      if (!/[0-9+]/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row'
                  },
                  gap: {
                    xs: 2,
                    sm: 5
                  }
                }}
              >
                <Box sx={{ flex: '1 0 40%' }}>
                  <Typography>Password</Typography>
                  <InputForm
                    width='100%'
                    controllerName='password'
                    control={control}
                    placeholder='Enter Password'
                    variant='outlined'
                    fullWidth={true}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    name='password'
                    type='password'
                  />
                </Box>

                <Box sx={{ flex: '1 0 40%' }}>
                  <Typography>Re-enter Password</Typography>
                  <InputForm
                    width='100%'
                    controllerName='password_confirmation'
                    control={control}
                    placeholder='Re-enter Password'
                    variant='outlined'
                    fullWidth={true}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation?.message}
                    name='password_confirmation'
                    type='password'
                  />
                </Box>
              </Box>

              <Box>
                <Typography>Email Address</Typography>
                <InputForm
                  width='100%'
                  controllerName='email'
                  control={control}
                  placeholder='Email Address'
                  variant='outlined'
                  fullWidth={true}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  name='email'
                />
              </Box>

              <Box>
                <Typography>Notes</Typography>
                <InputForm
                  width='100%'
                  controllerName='user_note'
                  control={control}
                  placeholder='Notes'
                  variant='outlined'
                  fullWidth={true}
                  multiline={true}
                  rows={8}
                  error={!!errors.user_note}
                  helperText={errors.user_note?.message}
                  name='user_note'
                />
              </Box>

              {/* Error messages from backend */}
              {getErrorResponse(12)}

              <Box sx={styles.formButtonContainer}>
                <Box>
                  <Button sx={styles.cancelButton} onClick={handleClose}>
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
        ) : (
          <CreatedSuccessful />
        )}
      </DialogContent>
    </Dialog>
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
    marginTop: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
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
    backgroundColor: '#FF9C00',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#FF7c02'
    }
  }
}

export default CCDrawer
