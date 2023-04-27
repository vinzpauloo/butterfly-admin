// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Drawer, Button, TextField, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Other Imports
import CreatedSuccessful from '@/pages/user/components/form/CreatedSuccessful'
import { useTranslateString } from '@/utils/TranslateString'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks
import { CreateAccount } from '@/services/api/CreateAccount'

interface FormValues {
  [key: string]: any
  role_id: '3' | ''
  username: string
  password: string
  password_confirmation: string
  mobile: string
  email: string
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
  backgroundColor: theme.palette.background.default
}))

const AddAgentDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()

  const {
    control,
    handleSubmit,
    reset,
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
        role_id: '5'
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
      }, 1500)
    } catch (e) {
      console.log(`Error`, e)
    }
  }

  const [resetKey, setResetKey] = useState(0)

  const handleClose = () => {
    resetForm()
    setResetKey(prevKey => prevKey + 1)
    toggle()
  }

  const TranslateString = useTranslateString()

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
        <Typography variant='h6'>
          {TranslateString('Add')} {TranslateString('Agent')}
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            <form key={resetKey} onSubmit={handleSubmit(handleFormSubmit)}>
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Entire Desired Username'
                    variant='outlined'
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    name='username'
                  />
                )}
              />
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label='Entire Password'
                        variant='outlined'
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        name='password'
                        type='password'
                      />
                    )}
                  />
                </Box>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='password_confirmation'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label='Re-enter Password'
                        variant='outlined'
                        fullWidth
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        name='password_confirmation'
                        type='password'
                      />
                    )}
                  />
                </Box>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='mobile'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label='Mobile No.'
                        variant='outlined'
                        fullWidth
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        onKeyPress={e => {
                          // Allow only numbers and the '+' symbol
                          if (!/[0-9+]/.test(e.key)) {
                            e.preventDefault()
                          }
                        }}
                        name='mobile'
                      />
                    )}
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label='Email Address'
                        variant='outlined'
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        name='email'
                      />
                    )}
                  />
                </Box>
                <Box sx={styles.formButtonContainer}>
                  <Box>
                    <Button sx={styles.cancelButton} onClick={handleClose}>
                      <Typography sx={styles.text}>{TranslateString('Cancel')}</Typography>
                    </Button>
                  </Box>

                  <Box>
                    <Button type='submit' sx={styles.continueButton}>
                      <Typography sx={styles.text}>{TranslateString('Continue')}</Typography>
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

export default AddAgentDrawer