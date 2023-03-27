// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Button, TextField, Typography } from '@mui/material'

// ** Form and Validation Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { PathString, useForm } from 'react-hook-form'

// ** Hooks
import CreateSuperAgent2 from './CreateSuperAgent2'

interface FormValues {
  role: string
  username: string
  password: string
  password_confirmation: string
  mobile: string
  email: string
  partner_name: string
  partner_code: PathString
  partner_note: string
}

const schema = yup.object().shape({
  username: yup.string().min(7, 'Username must be at least 7 characters').required(),
  password: yup.string().min(7, 'Password must be at least 7 characters').required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required.'),
  mobile: yup
    .string()
    .matches(/^(09|\+639)\d{9}$/, 'Invalid Mobile Number')
    .required(),
  email: yup.string().email().required('Email is required.'),
  partner_name: yup.string().required('Company Name is required.'),
  partner_code: yup.string().required('Company Code is required.'),
  partner_note: yup.string().min(3, 'Note must be at least 3 characters').required()
})

const CreateSuperAgent = () => {
  const [continueBtn, setContinueBtn] = useState<boolean>()
  const [continueBtnTwo, setContinueBtnTwo] = useState<boolean>()

  const [formValue, setFormValue] = useState<FormValues>({
    role: 'sa',
    username: '',
    password: '',
    password_confirmation: '',
    mobile: '',
    email: '',
    partner_name: '',
    partner_code: '',
    partner_note: ''
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

  const handleFormSubmit = async () => {
    console.log(formValue)

    await localStorage.setItem('createSA', JSON.stringify(formValue))

    setContinueBtn(true)
  }

  return (
    <Box>
      {!continueBtn ? (
        <Box sx={styles.formContainer}>
          <Box sx={styles.headerContainer}>
            <Box sx={styles.header}>
              <Typography sx={styles.white}>Step 1</Typography>
            </Box>
            <Box sx={styles.header}>
              <Typography sx={styles.white}>Create Super Agent</Typography>
            </Box>
          </Box>
          <Box sx={styles.innerFormContainer}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Company Name</Typography>
                  <TextField
                    label='Company Name'
                    variant='outlined'
                    fullWidth
                    {...register('partner_name')}
                    error={!!errors.partner_name}
                    helperText={errors.partner_name?.message}
                    value={formValue.partner_name}
                    onChange={handleFormInputChange}
                    name='partner_name'
                  />
                </Box>
                <Box sx={styles.halfWidth}>
                  <Typography>Company Code</Typography>
                  <TextField
                    label='Company Code'
                    variant='outlined'
                    fullWidth
                    {...register('partner_code')}
                    error={!!errors.partner_code}
                    helperText={errors.partner_code?.message}
                    value={formValue.partner_code}
                    onChange={handleFormInputChange}
                    name='partner_code'
                  />
                </Box>
              </Box>
              <Box sx={styles.fullWidth}>
                <Typography>Username</Typography>
                <TextField
                  label='Username'
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
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
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
                <Box sx={styles.halfWidth}>
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
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
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
                <Box sx={styles.halfWidth}>
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
              <Typography>Notes (Required)</Typography>
              <TextField
                label='Notes'
                variant='outlined'
                fullWidth
                multiline
                rows={4}
                {...register('partner_note')}
                error={!!errors.partner_note}
                helperText={errors.partner_note?.message}
                value={formValue.partner_note}
                onChange={handleFormInputChange}
                name='partner_note'
              />
              <Box sx={styles.bottomFormButtons}>
                <Box>
                  <Button sx={styles.cancelButton}>
                    <Typography sx={styles.buttonText}>Cancel</Typography>
                  </Button>
                </Box>

                <Box>
                  <Button type='submit' sx={styles.continueButton}>
                    <Typography sx={styles.buttonText}>Continue</Typography>
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      ) : (
        !continueBtnTwo && <CreateSuperAgent2 />
      )}
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'center'
    },
    gap: 10
  },
  userButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  userButton: {
    border: 1,
    height: '62px',
    minWidth: {
      xs: '232px',
      lg: '332px'
    },
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderColor: 'black',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    }
  },
  text: {
    flexGrow: 1
  },
  formContainer: {
    border: '1px solid grey',
    borderRadius: '5px'
  },
  operatorHeader: {
    display: 'flex',
    backgroundColor: '#A459D1',
    padding: 2
  },
  creatorHeader: {
    display: 'flex',
    backgroundColor: '#A459D1',
    padding: 4
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#A459D1',
    padding: 4
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  white: {
    color: '#FFF'
  },
  innerFormContainer: {
    padding: 4,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  halfWidth: {
    width: '50%'
  },
  formMargin: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
    marginBottom: 20
  },
  bottomFormButtons: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    mt: 5,
    gap: 3,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#98A9BC',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#7899ac'
    }
  },
  buttonText: {
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
  },

  // Logo Styling
  input: {
    display: 'none'
  },
  upload: {
    backgroundColor: '#979797',
    padding: '8px 12px 8px 12px',
    borderRadius: '5px'
  }
}

export default CreateSuperAgent
