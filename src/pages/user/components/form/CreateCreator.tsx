// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, TextField, Typography } from '@mui/material'

// ** Form and Validation Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// ** Other Imports
import CreatedSuccessful from './CreatedSuccessful'

// ** TanStack Query
import { useMutation } from '@tanstack/react-query'

// ** Hooks
import { CreateAccount } from '@/services/api/CreateAccount'

interface FormValues {
  role: string
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
    .required(),
  mobile: yup
    .string()
    .matches(/^(09|\+639)\d{9}$/, 'Invalid Mobile Number')
    .required(),
  email: yup.string().email().required()
})

const CreateCreator = () => {
  const router = useRouter()

  const [submitted, setSubmitted] = useState<boolean>()

  const [formValue, setFormValue] = useState<FormValues>({
    role: 'cc',
    username: '',
    password: '',
    password_confirmation: '',
    mobile: '',
    email: '',
    note: ''
  })

  const {
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
    console.log(formValue)

    const userData = {
      data: formValue
    }

    try {
      await mutation.mutateAsync(userData)
      setSubmitted(true)
      setTimeout(() => {
        router.push('/user/list')
      }, 1000)
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

  return (
    <Box>
      {!submitted ? (
        <Box sx={styles.container}>
          <Box sx={{ display: 'flex', backgroundColor: '#A459D1', padding: 4 }}>
            <Typography sx={styles.white}>Content Creator</Typography>
          </Box>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={styles.formContent}>
              <Box sx={styles.fullWidth}>
                <Typography>Username</Typography>
                <TextField
                  label='Enter Desired Username'
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
              <Box sx={{ ...styles.formContainer, marginTop: 5 }}>
                <Box sx={styles.textInput}>
                  <Typography>Password</Typography>
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
                <Box sx={styles.textInput}>
                  <Typography>Re-enter Password</Typography>
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
              </Box>
              <Box sx={styles.formContainer}>
                <Box sx={styles.textInput}>
                  <Typography>Mobile No.</Typography>
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
                <Box sx={styles.textInput}>
                  <Typography>Email Address</Typography>
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
              </Box>
              <Typography>Notes (Optional)</Typography>
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
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid grey'
  },
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
    padding: 4
  },
  fullWidth: {
    width: '100%'
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
      lg: 'row'
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

export default CreateCreator
