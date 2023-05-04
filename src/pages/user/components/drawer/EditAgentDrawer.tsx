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
import { useUsersTable } from '@/services/api/UserTableService'

interface FormValues {
  password: string
  password_confirmation: string
}

const schema = yup.object().shape({
  password: yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required')
})

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  id: any
  rowData: any
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const EditAgentDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  // ** Props
  const { open, toggle, rowData } = props

  console.log(rowData)

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
      password: '',
      password_confirmation: ''
    })
  }

  const { updateUser } = useUsersTable()
  const mutation = useMutation(async (data: { id: any; data: any }) => {
    const response = await updateUser(data.id, data.data)
    if (response.ok) {
      await response.json()
    }
  })

  interface ResponseErrorProps {
    password?: string
    user_note?: string
  }

  const [responseError, setResponseError] = useState<ResponseErrorProps>()

  const handleFormSubmit = async (data: FormValues) => {
    const { password, password_confirmation } = data

    if (password === password_confirmation) {
      try {
        await mutation.mutateAsync({
          id: rowData?.id,
          data: { password, password_confirmation, _method: 'put' }
        })
        setSubmitted(true)

        setTimeout(() => {
          toggle()
          setSubmitted(false)
          resetForm()
          setResponseError({ password: '' })

          // Re-fetches UserTable and CSV exportation
          queryClient.invalidateQueries({ queryKey: ['allUsers'] })
        }, 1500)
      } catch (e: any) {
        const {
          data: { error }
        } = e
        setResponseError(error)
      }
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
          {TranslateString('Edit')} {TranslateString('Agent')} {TranslateString('Account')}
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            <form key={resetKey} onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                label='Username'
                variant='outlined'
                fullWidth
                name='username'
                InputLabelProps={{
                  shrink: true
                }}
                value={rowData?.username || ''}
                disabled
              />
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label='Enter New Password'
                        variant='outlined'
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
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
                        label='Re-enter New Password'
                        variant='outlined'
                        fullWidth
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                        onChange={field.onChange}
                        name='password_confirmation'
                        type='password'
                      />
                    )}
                  />
                </Box>
                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Mobile'
                    variant='outlined'
                    fullWidth
                    name='mobile'
                    InputLabelProps={{
                      shrink: true
                    }}
                    disabled
                    value={rowData?.mobile || ''}
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    name='email'
                    InputLabelProps={{
                      shrink: true
                    }}
                    disabled
                    value={rowData?.email || ''}
                  />
                </Box>

                {responseError && <Typography color='red'>{responseError.password}</Typography>}

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

export default EditAgentDrawer
