// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Button, TextField, Typography, MenuItem, InputAdornment } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Other Imports
import CreatedSuccessful from '../../../form/CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services
import { CreateAccount } from '@/services/api/CreateAccount'
import { useErrorHandling } from '@/hooks/useErrorHandling'

type StepOneProps = {
  toggle: () => void
  resetKey: number
  handleClose: () => void
  responseError: any
  setResponseError: React.Dispatch<any>
  fileName: any
  setFileName: React.Dispatch<React.SetStateAction<string>>
  setSiteID: React.Dispatch<React.SetStateAction<number | null>>
  handleNext: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  languages: string[]
  currencies: string[]
}

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

const SAStepOne = (
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

  const fileInputRef: any = React.useRef(null)
  const handleUploadBtnClick = () => {
    fileInputRef.current.click()
  }

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

  function isFile(value: any): value is File {
    return value instanceof File
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
              <Box sx={styles.fullWidth}>
                <Controller
                  name='partner_name'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Company Name'
                      variant='outlined'
                      fullWidth
                      error={!!errors.partner_name}
                      helperText={errors.partner_name?.message}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      name='partner_name'
                    />
                  )}
                />
              </Box>
              <Box sx={styles.fullWidth}>
                <Controller
                  name='partner_code'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Company Code'
                      variant='outlined'
                      fullWidth
                      error={!!errors.partner_code}
                      helperText={errors.partner_code?.message}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      name='partner_code'
                    />
                  )}
                />
              </Box>
              <Box sx={styles.fullWidth}>
                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Enter Desired Username'
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
              </Box>

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

              <Box sx={styles.fullWidth}>
                <Controller
                  name='partner_note'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Notes'
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.partner_note}
                      helperText={errors.partner_note?.message}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      name='partner_note'
                    />
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='site_name'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Please input site name'
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.site_name}
                      helperText={errors.site_name?.message}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      name='site_name'
                    />
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='currency_id'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      label='Choose Currency'
                      variant='outlined'
                      fullWidth
                      error={!!errors.currency_id}
                      helperText={errors.currency_id?.message}
                      value={field.value || ''}
                      onChange={field.onChange}
                      name='currency_id'
                    >
                      {currencies.map((item: any, index) => (
                        <MenuItem key={index} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                          <Typography sx={{ textTransform: 'uppercase' }}>{item?.name}</Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='language_id'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      label='Choose Language'
                      variant='outlined'
                      fullWidth
                      error={!!errors.language_id}
                      helperText={errors.language_id?.message}
                      value={field.value || ''}
                      onChange={field.onChange}
                      name='language_id'
                    >
                      {languages.map((item: any, index) => (
                        <MenuItem key={index} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                          <Typography sx={{ textTransform: 'uppercase' }}>{item?.name}</Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='amount'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Add Security Funds'
                      variant='outlined'
                      fullWidth
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      name='amount'
                    />
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='logo'
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        style={{ display: 'none' }}
                        name='logo'
                        id='logo'
                        onChange={e => {
                          if (e.target.files && e.target.files.length > 0) {
                            setFileName(e.target.files[0].name)
                            field.onChange(e.target.files[0])
                          } else {
                            field.onChange(null)
                          }
                          console.log(fileName)
                        }}
                        ref={fileInputRef}
                      />
                      <label htmlFor='logo'>
                        <TextField
                          value={fileName}
                          placeholder='Select a file'
                          variant='outlined'
                          fullWidth
                          onClick={handleUploadBtnClick}
                          InputProps={{
                            readOnly: true,
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
                    </>
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Description(Mandatory)'
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      name='description'
                    />
                  )}
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
                      defaultValue={field.value}
                      onChange={field.onChange}
                      name='user_note'
                    />
                  )}
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
        </Box>
      ) : (
        <CreatedSuccessful />
      )}
    </>
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

export default React.forwardRef(SAStepOne)
