// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Component Imports
import CreatedSuccessful from '../form/CreatedSuccessful'
import InputForm from '../form/InputForm'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services
import { CreateAccount } from '@/services/api/CreateAccount'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import SuperAgentFileUploader from './SuperAgentFileUploader'

interface FormValues {
  [key: string]: string | number | File | null
  role_id: string
  username: string
  password: string
  password_confirmation: string
  mobile: string
  email: string
  partner_name: string
  partner_code: string
  partner_note: string
  currency_id: string
  language_id: string
  site_name: string // Name of Site
  description: string
  logo: File | null
  amount: number
  user_note: string
  note: string
}

interface StepOneProps {
  toggle: () => void
  resetKey: number
  handleClose: () => void
  responseError: any
  setResponseError: React.Dispatch<any>
  fileName: any
  setFileName: React.Dispatch<React.SetStateAction<string | File>>
  setSiteID: React.Dispatch<React.SetStateAction<number | null>>
  handleNext: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  languages: string[]
  currencies: string[]
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
  email: yup.string().email('Invalid email address').required('Email address is required'),
  partner_name: yup
    .string()
    .min(3, 'Company Name must be at least 3 characters.')
    .required('Company Name is required.'),
  partner_code: yup
    .string()
    .min(3, 'Company Code must be at least 3 characters.')
    .required('Company Code is required.'),
  partner_note: yup
    .string()
    .min(3, 'Note must be at least 3 characters')
    .required('Notes is required. (Company notes)'),
  currency_id: yup.string().required('Please choose a currency.'),
  language_id: yup.string().required('Please choose a language.'),
  site_name: yup.string().min(3, 'Site Name must be at least 3 characters.').required('Site name is required.'),
  description: yup.string().min(3, 'Description must be at least 3 characters').required('Description is required.'),
  user_note: yup
    .string()
    .min(3, 'Notes(For Approval) must be at least 3 characters')
    .required('Notes(For Approval) is required.')
})

const SuperAgentModal = (
  {
    resetKey,
    handleClose,
    fileName,
    setFileName,
    setSiteID,
    handleNext,
    setIsLoading,
    languages,
    currencies
  }: StepOneProps,
  ref: any
) => {
  const queryClient = useQueryClient()
  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()

  // ** State
  const [submitted, setSubmitted] = React.useState<boolean>()

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
      role_id: '4',
      username: '',
      password: '',
      password_confirmation: '',
      mobile: '',
      email: '',
      partner_name: '',
      partner_code: '',
      partner_note: '',
      currency_id: '',
      language_id: '',
      site_name: '',
      description: '',
      logo: null,
      amount: 0,
      user_note: '',
      note: ''
    })
  }

  // forward to parent the resetForm function by calling reset
  React.useImperativeHandle(
    ref,
    () => {
      return { reset: () => resetForm() }
    },
    []
  )

  const { createUser } = CreateAccount()

  const { mutate: mutateStepOne } = useMutation(createUser, {
    onSuccess: response => {
      console.log('mutateStepOne onSuccess response', response)
      setSiteID(response?.partner?.site?.id)
      setIsLoading(true)
      setSubmitted(true)

      setTimeout(() => {
        resetForm()
        setFileName('')
        clearErrorResponse()
        setIsLoading(false)
        handleNext()

        console.log('Insite setTimeout')

        // Re-fetches UserTable and CSV exportation
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
        queryClient.invalidateQueries({ queryKey: ['UsersTableCSV'] })
      }, 1500)
    },
    onSettled: response => {
      console.log('mutateStepOne onSettled response', response)
      setIsLoading(false)
    },
    onError: (e: any) => {
      handleError(e, `createUser() Step One Super Agent`)
    }
  })

  const handleLogoChange = (files: File[]) => {
    const maxFileSize = 2 * 1024 * 1024 // 2MB in bytes

    if (files[0].size > maxFileSize) {
      alert('Error: Cover photo size exceeds the 2MB limit.')

      return
    }

    setFileName(files[0])
  }

  const handleFormSubmit = async (data: FormValues) => {
    const formData = new FormData()

    /* Iterates through 'formValue' to check if the key is 'logo' and if the value is a file. */
    for (const key in data) {
      const value = data[key]

      /* If true, it appends the file to the 'FormData' object with the key and the file name. */
      if (key === 'logo' && isFile(value)) {
        formData.append(key, value, value.name)

        /* If the key is 'amount', parse the value as a number and append it to the `FormData` object with the key. */
      } else if (key === 'amount' && value) {
        formData.append(key, Number(value).toString())

        /* If the value is a string
      or a number, it appends the value as a string to the `FormData` object with the key. */
      } else if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString())
      }
    }

    formData.append('logo', fileName)

    //These are currently required by backend, not visible in UI
    formData.append('role_id', '4')
    formData.append('note', 'For approval')

    const form: any = {
      data: formData
    }

    mutateStepOne(form)
  }

  return (
    <>
      {!submitted ? (
        <Box sx={styles.container}>
          <form ref={ref} key={resetKey} onSubmit={handleSubmit(handleFormSubmit)}>
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
                <Box sx={{ flex: '1 0 35%' }}>
                  <Typography>Company Name</Typography>
                  <InputForm
                    width='100%'
                    controllerName='partner_name'
                    control={control}
                    placeholder='Company Name'
                    variant='outlined'
                    fullWidth={true}
                    error={!!errors.partner_name}
                    helperText={errors.partner_name?.message}
                    name='partner_name'
                  />
                </Box>

                <Box sx={{ flex: '1 0 60%' }}>
                  <Typography>Company Code</Typography>
                  <InputForm
                    width='100%'
                    controllerName='partner_code'
                    control={control}
                    placeholder='Company Code'
                    variant='outlined'
                    fullWidth={true}
                    error={!!errors.partner_code}
                    helperText={errors.partner_code?.message}
                    name='partner_code'
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
                  gap: 5,
                  mt: {
                    xs: 2,
                    sm: 5
                  }
                }}
              >
                <Box sx={{ flex: '1 0 35%' }}>
                  <Typography>Username</Typography>
                  <InputForm
                    width='100%'
                    controllerName='username'
                    control={control}
                    placeholder='Entired Desired Username'
                    variant='outlined'
                    fullWidth={true}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    name='username'
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: {
                      xs: 'column',
                      sm: 'row'
                    },
                    gap: 2,
                    flex: '1 0 60%'
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
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

                  <Box sx={{ flexGrow: 1 }}>
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
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row'
                  },
                  gap: 5,
                  mt: 5
                }}
              >
                <Box sx={{ flex: '1 0 25%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
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

                  <Box>
                    <Typography>Site Name</Typography>
                    <InputForm
                      width='100%'
                      controllerName='site_name'
                      control={control}
                      placeholder='Please input site name'
                      variant='outlined'
                      fullWidth={true}
                      error={!!errors.site_name}
                      helperText={errors.site_name?.message}
                      name='site_name'
                    />
                  </Box>

                  <Box>
                    <Typography>Currency</Typography>
                    <InputForm
                      width='100%'
                      controllerName='currency_id'
                      control={control}
                      label='Choose Currency'
                      variant='outlined'
                      fullWidth={true}
                      error={!!errors.currency_id}
                      helperText={errors.currency_id?.message}
                      name='currency_id'
                      isDropdown={currencies}
                    />
                  </Box>

                  <Box mt={5}>
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
                </Box>

                <Box sx={{ flex: '1 0 25%', display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                    <Typography>Security Funds</Typography>
                    <InputForm
                      width='100%'
                      controllerName='amount'
                      control={control}
                      placeholder='Add Security Funds'
                      variant='outlined'
                      fullWidth={true}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                      name='amount'
                      onKeyPress={e => {
                        // Allow only numbers and the '+' symbol
                        if (!/[0-9+]/.test(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography>Language</Typography>
                    <InputForm
                      width='100%'
                      controllerName='language_id'
                      control={control}
                      label='Choose Language'
                      variant='outlined'
                      fullWidth={true}
                      error={!!errors.language_id}
                      helperText={errors.language_id?.message}
                      name='language_id'
                      isDropdown={languages}
                    />
                  </Box>

                  <Box mt={5}>
                    <Typography>Description</Typography>
                    <InputForm
                      width='100%'
                      controllerName='description'
                      control={control}
                      placeholder='Description (Mandatory)'
                      variant='outlined'
                      fullWidth={true}
                      multiline={true}
                      rows={8}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      name='description'
                    />
                  </Box>
                </Box>

                {/* Photo Upload and Partner Note */}
                <Box sx={{ flex: '0 1 45%' }}>
                  <SuperAgentFileUploader onFilesChange={handleLogoChange} />

                  <Box mt={7}>
                    <Typography>Company Notes</Typography>
                    <InputForm
                      width='100%'
                      controllerName='partner_note'
                      control={control}
                      placeholder='Company Notes'
                      variant='outlined'
                      fullWidth={true}
                      multiline={true}
                      rows={8}
                      error={!!errors.partner_note}
                      helperText={errors.partner_note?.message}
                      name='partner_note'
                    />
                  </Box>
                </Box>
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
        </Box>
      ) : (
        <CreatedSuccessful />
      )}
    </>
  )
}

function isFile(value: any): value is File {
  return value instanceof File
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
    backgroundColor: '#FF9C00',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#FF7c02'
    }
  },

  // Logo Styling
  input: {
    display: 'block'
  },
  upload: {
    backgroundColor: '#979797',
    padding: '8px 12px 8px 12px',
    borderRadius: '5px'
  }
}

export default React.forwardRef(SuperAgentModal)
