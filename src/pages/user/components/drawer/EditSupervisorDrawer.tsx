// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { Drawer, Button, TextField, IconButton, Typography } from '@mui/material'

// ** Style Imports
import { styled } from '@mui/material/styles'

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
import { useUsersTable } from '@/services/api/useUsersTable'

interface FormValues {
  password: string
  password_confirmation: string
  user_note: string
}

const schema = yup.object().shape({})

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  data: any
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const EditSupervisorDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  console.log(props.data)

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()

  console.log(props.data)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (props?.data) {
      setValue('user_note', props?.data.note)
    }
  }, [props?.data, setValue])

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
    const { password, password_confirmation, user_note } = data

    if (password === password_confirmation) {
      try {
        await mutation.mutateAsync({
          id: props?.data.id,
          data: { password, password_confirmation, _method: 'put', user_note }
        })
        setSubmitted(true)

        setTimeout(() => {
          toggle()
          setSubmitted(false)
          resetForm()
          setResponseError({ password: '' })

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
  }

  const handleClose = () => {
    toggle()
    resetForm()
    setResponseError({ password: '' })
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
        <Typography variant='h6'>Edit Operator/Supervisor</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            <Typography color='black'>{props?.data.role_id === 2 ? 'SUPERVISOR' : 'OPERATOR'} </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Username'
                    variant='outlined'
                    fullWidth
                    name='username'
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={props?.data.username || ' '}
                    disabled
                  />
                </Box>
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
                        defaultValue={'********'}
                        InputLabelProps={{
                          shrink: true
                        }}
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
                        defaultValue={'********'}
                        InputLabelProps={{
                          shrink: true
                        }}
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
                    value={props?.data.mobile || ''}
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
                    value={props?.data.email || ''}
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <Controller
                    name='user_note'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label='Notes'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.user_note}
                        helperText={errors.user_note?.message}
                        onChange={field.onChange}
                        name='user_note'
                        defaultValue={field.value}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  />
                </Box>

                {responseError && (
                  <Typography color='red'>{responseError.password || responseError.user_note}</Typography>
                )}

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
          </Box>
        ) : (
          <CreatedSuccessful update />
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

export default EditSupervisorDrawer
