// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Radio, RadioGroup, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Project/Other Imports
import CreatedSuccessful from '../form/CreatedSuccessful'
import { useTranslateString } from '@/utils/TranslateString'
import InputForm from '../form/InputForm'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import { CreateAccount } from '@/services/api/CreateAccount'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Types
import { IRoles } from '../types/roles'
interface FormValues {
  [key: string]: string | Blob
  role_id: string
  username: string
  password: string
  password_confirmation: string
  mobile: string
  email: string
  user_note: string
}


const schema = yup.object().shape({
  role_id: yup.string().required('Role is required'),
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
  dataRoles : IRoles[]
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: '#FF9C00'
}))

const SupervisorDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()
  const TranslateString = useTranslateString()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()
  const [resetKey, setResetKey] = useState(0)

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
    const formData = new FormData()

    for (const key in data) {
      formData.append(key, data[key])
    }

    //formData.append(`role_id`, `2`) commented out

    // const userData = {
    //   data: data
    // }

    const form: any = {
      data: formData
    }

    try {
      await mutation.mutateAsync(form)
      setSubmitted(true)
      setTimeout(() => {
        toggle()
        resetForm()
        setSubmitted(false)
        clearErrorResponse()

        // Re-fetches UserTable and CSV exportation
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
        queryClient.invalidateQueries({ queryKey: ['UsersTableCSV'] })
      }, 1500)
    } catch (e: any) {
      handleError(e, `createUser() SupervisorDrawer.tsx`)
    }
  }

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
          {TranslateString('Add')} {TranslateString('Operator')}
        </DialogTitle>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <DialogContent sx={{ mx: 4 }}>
        {!submitted ? (
          <form key={resetKey} onSubmit={handleSubmit(handleFormSubmit)}>
            {/* <Box sx={styles.header}>
              <Controller
                name='role_id'
                control={control}
                defaultValue=''
                rules={{ required: 'Please select a role' }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                    }}
                  >
                    <Box sx={styles.radio}>
                      <Typography>{TranslateString('Operator')}</Typography>
                      <Radio name='role_id' value='1' inputProps={{ 'aria-label': 'Operator' }} color='default' />
                      <Typography>{TranslateString('Supervisor')}</Typography>
                      <Radio name='role_id' value='2' inputProps={{ 'aria-label': 'Supervisor' }} color='default' />
                    </Box>
                  </RadioGroup>
                )}
              />
            </Box> */}
            {errors.role_id && (
              <Typography variant='caption' color='error' sx={{ marginLeft: 4 }}>
                {errors.role_id.message}
              </Typography>
            )}
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
                <Typography>Role</Typography>
                <InputForm
                  width='100%'
                  controllerName='role_id'
                  control={control}
                  variant='outlined'
                  fullWidth={true}
                  error={!!errors.role_id}
                  helperText={errors.role_id?.message}
                  name='role_id'
                  isDropdown={props.dataRoles}
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
    padding: 0

    // backgroundColor: '#FF9C00',
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

export default SupervisorDrawer
