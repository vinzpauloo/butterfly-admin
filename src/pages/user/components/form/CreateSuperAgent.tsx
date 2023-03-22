// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, TextField, Typography, MenuItem, InputAdornment } from '@mui/material'

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
  partner: string // Set string of "true"
  name: string //Company Name
  code: string // Company Code
  note: string
  site: string // Set string of "true"
  currency_id: number
  language_id: number
  site_name: string // Name of Site
  description: string
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

const CreateSuperAgent = () => {
  const router = useRouter()

  const [submitted, setSubmitted] = useState<boolean>()
  const [continueBtn, setContinueBtn] = useState<boolean>()
  const [continueBtnTwo, setContinueBtnTwo] = useState<boolean>()

  const [formValue, setFormValue] = useState<FormValues>({
    role: 'sa',
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

  const superAgentContinueBtn = (event: any) => {
    event.preventDefault()

    setContinueBtn(true)
  }

  const superAgentContinueBtnTwo = (event: any) => {
    event.preventDefault()

    setContinueBtnTwo(true)
    setTimeout(() => {
      router.push('/user/list')
    }, 1000)
  }

  const { createUser } = CreateAccount()
  const mutation = useMutation(createUser)

  const handleFormSubmit = async () => {
    console.log(formValue)

    const userData = {
      data: formValue
    }

    await mutation.mutateAsync(userData)

    setSubmitted(true)
    setTimeout(() => {
      router.push('/user/list')
    }, 1000)
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
            <form>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Company Name</Typography>
                  <TextField
                    label='Enter Company Name'
                    variant='outlined'
                    fullWidth
                    type='companyName'
                    name='companyName'
                  />
                </Box>
                <Box sx={styles.halfWidth}>
                  <Typography>Company Code</Typography>
                  <TextField
                    label='Enter Company Code'
                    variant='outlined'
                    fullWidth
                    type='password'
                    name='confirmPassword'
                  />
                </Box>
              </Box>
              <Box sx={styles.fullWidth}>
                <Typography>Username</Typography>
                <TextField label='Entire Desired Username' variant='outlined' fullWidth name='username' />
              </Box>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Password</Typography>
                  <TextField label='Enter Password' variant='outlined' fullWidth type='password' name='password' />
                </Box>
                <Box sx={styles.halfWidth}>
                  <Typography>Re-enter Password</Typography>
                  <TextField
                    label='Re-enter Password'
                    variant='outlined'
                    fullWidth
                    type='password'
                    name='confirmPassword'
                  />
                </Box>
              </Box>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Mobile No.</Typography>
                  <TextField label='Mobile No.' variant='outlined' fullWidth name='mobileNo' />
                </Box>
                <Box sx={styles.halfWidth}>
                  <Typography>Email Address</Typography>
                  <TextField label='Email Address' variant='outlined' fullWidth name='emailAddress' />
                </Box>
              </Box>
              <Typography>Notes (Optional)</Typography>
              <TextField label='Notes' variant='outlined' fullWidth multiline rows={4} name='notes' />
              <Box sx={styles.bottomFormButtons}>
                <Box>
                  <Button sx={styles.cancelButton}>
                    <Typography sx={styles.buttonText}>Cancel</Typography>
                  </Button>
                </Box>

                <Box>
                  <Button type='submit' sx={styles.continueButton} onClick={superAgentContinueBtn}>
                    <Typography sx={styles.buttonText}>Continue</Typography>
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      ) : !continueBtnTwo ? (
        <Box sx={styles.formContainer}>
          <Box sx={styles.headerContainer}>
            <Box sx={styles.header}>
              <Typography sx={styles.white}>Step 2</Typography>
            </Box>
            <Box sx={styles.header}>
              <Typography sx={styles.white}>Create Site</Typography>
            </Box>
          </Box>
          <Box sx={styles.innerFormContainer}>
            <form>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Name of Site</Typography>
                  <TextField
                    label='Please input site name'
                    variant='outlined'
                    fullWidth
                    type='password'
                    name='confirmPassword'
                  />
                </Box>
                <Box sx={styles.halfWidth}>
                  <Typography>Language</Typography>
                  <TextField select label='Choose Language' variant='outlined' fullWidth name='language'>
                    <MenuItem value='en'>English</MenuItem>
                    <MenuItem value='es'>Spanish</MenuItem>
                    <MenuItem value='fr'>French</MenuItem>
                  </TextField>
                </Box>
              </Box>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Currency</Typography>
                  <TextField select label='Choose Currency' variant='outlined' fullWidth name='currency'>
                    <MenuItem value='usd'>USD</MenuItem>
                    <MenuItem value='eur'>EUR</MenuItem>
                    <MenuItem value='gbp'>GBP</MenuItem>
                  </TextField>
                </Box>
                <Box sx={styles.halfWidth}>
                  <Typography>Access URL</Typography>
                  <TextField label='' variant='outlined' fullWidth type='password' name='confirmPassword' />
                </Box>
              </Box>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Add Security Funds</Typography>
                  <TextField label='Amount' variant='outlined' fullWidth name='mobileNo' />
                </Box>
                <Box sx={styles.halfWidth}>
                  <Typography>Logo</Typography>
                  <Box>
                    <input type='file' accept='.jpg, .jpeg, .png' style={styles.input} name='logo' id='logo' />
                    <label htmlFor='logo'>
                      <TextField
                        variant='outlined'
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Box sx={styles.upload}>
                                <Typography sx={styles.white}>UPLOAD</Typography>
                              </Box>
                            </InputAdornment>
                          )
                        }}
                      />
                    </label>
                  </Box>
                </Box>
              </Box>
              <Typography>Description (Optional)</Typography>
              <TextField label='Notes' variant='outlined' fullWidth multiline rows={4} name='notes' />
              <Box sx={styles.bottomFormButtons}>
                <Box>
                  <Button sx={styles.cancelButton}>
                    <Typography sx={styles.buttonText}>Cancel</Typography>
                  </Button>
                </Box>

                <Box>
                  <Button type='submit' sx={styles.continueButton} onClick={superAgentContinueBtnTwo}>
                    <Typography sx={styles.buttonText}>Continue</Typography>
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      ) : (
        <CreatedSuccessful />
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
