// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Drawer, Button, TextField, IconButton, Typography } from '@mui/material'

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

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'

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

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  roleId: any
  userId: any
  data: any
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const EditCreatorDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()
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

  const [responseError, setResponseError] = useState([])

  const handleFormSubmit = async () => {
    const { password, password_confirmation } = formValue

    if (password === password_confirmation) {
      try {
        await mutation.mutateAsync({
          id: props.userId,
          data: { password, password_confirmation, _method: 'put' }
        })
        setSubmitted(true)

        setTimeout(() => {
          toggle()
          setSubmitted(false)
          setFormValue({
            password: '',
            password_confirmation: ''
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
  }

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }))
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
        <Typography variant='h6'>Edit Creator</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            {/* <Box sx={{ display: 'flex', backgroundColor: '#A459D1', padding: 4 }}>
              <Typography sx={styles.white}>Supervisor: {props.data.id} </Typography>
            </Box> */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <TextField label={props?.data.username} variant='outlined' fullWidth name='username' disabled />
                </Box>
                <Box sx={styles.fullWidth}>
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
                <Box sx={styles.fullWidth}>
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

                <Box sx={styles.fullWidth}>
                  <TextField label={props?.data.mobile} variant='outlined' fullWidth name='mobile' disabled />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField label={props?.data.email} variant='outlined' fullWidth name='email' disabled />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label={props?.data.note}
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    name='note'
                    disabled
                  />
                </Box>

                {responseError &&
                  responseError?.map((item, index) => (
                    <Typography key={index} color='red'>
                      {item}
                    </Typography>
                  ))}

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

export default EditCreatorDrawer
