// ** React Imports
import { useState, useRef } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { Drawer, Button, TextField, IconButton, Typography, MenuItem, InputAdornment } from '@mui/material'

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
import { useMutation, useQueryClient, useQueries } from '@tanstack/react-query'

// ** Hooks
import { CreateAccount } from '@/services/api/CreateAccount'

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
  partner_note: yup.string().min(3, 'Note must be at least 3 characters').required(),
  currency_id: yup.string().required(),
  language_id: yup.string().required(),
  site_name: yup.string().required(),
  description: yup.string().min(3, 'Description must be at least 3 characters').required(),
  user_note: yup.string().min(3, 'Description must be at least 3 characters').required()
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

const SADrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()
  const [formValue, setFormValue] = useState<FormValues>({
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
    user_note: ''
  })
  const fileInputRef: any = useRef(null)
  const handleUploadBtnClick = () => {
    fileInputRef.current.click()
  }
  const [fileName, setFileName] = useState('')

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target

    if (name === 'logo' && files) {
      const file = files[0]
      if (file) {
        setFileName(file.name)
        setFormValue(prevState => ({
          ...prevState,
          [name]: file
        }))
      }
    } else {
      setFormValue(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const { createUser, getLanguages, getCurrency } = CreateAccount()
  const mutation = useMutation(createUser)
  const [responseError, setResponseError] = useState<any>()

  function isFile(value: any): value is File {
    return value instanceof File
  }

  const handleFormSubmit = async () => {
    const formData = new FormData()
    for (const key in formValue) {
      const value = formValue[key]
      if (key === 'logo' && isFile(value)) {
        formData.append(key, value, value.name)
      } else if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString())
      }
    }

    const form: any = {
      data: formData
    }

    try {
      await mutation.mutateAsync(form)
      setSubmitted(true)

      setTimeout(() => {
        toggle()
        setSubmitted(false)
        setFormValue({
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
          user_note: ''
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

  const {} = useQueries({
    queries: [
      {
        queryKey: ['Languages'],
        queryFn: getLanguages,
        onSuccess: (data: any) => {
          setLanguages(data?.data)

          if (data?.data && data?.data.length > 0 && !formValue.language_id) {
            setFormValue(prevState => ({
              ...prevState,
              language_id: data?.data[0]?.code
            }))
          }
        }
      },
      {
        queryKey: ['Currencies'],
        queryFn: getCurrency,
        onSuccess: (data: any) => {
          setCurrencies(data?.data)

          if (data?.data && data?.data.length > 0 && !formValue.currency_id) {
            setFormValue(prevState => ({
              ...prevState,
              currency_id: data?.data[0]?.code
            }))
          }
        }
      }
    ]
  })

  const [languages, setLanguages] = useState([])
  const [currencies, setCurrencies] = useState([])

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
        <Typography variant='h6'>Add Super Agent</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
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
                <Box sx={styles.fullWidth}>
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
                <Box sx={styles.fullWidth}>
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

                <Box sx={styles.fullWidth}>
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

                <Box sx={styles.fullWidth}>
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

                <Box sx={styles.fullWidth}>
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

                <Box sx={styles.fullWidth}>
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

                <Box sx={styles.fullWidth}>
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
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Please input site name'
                    variant='outlined'
                    fullWidth
                    {...register('site_name')}
                    error={!!errors.site_name}
                    helperText={errors.site_name?.message}
                    value={formValue.site_name}
                    onChange={handleFormInputChange}
                    name='site_name'
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <Controller
                    name='currency_id'
                    control={control}
                    rules={{ required: true }}
                    defaultValue={formValue.currency_id}
                    render={({ field }) => (
                      <TextField
                        select
                        label='Choose Currency'
                        variant='outlined'
                        fullWidth
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                          setFormValue(prevState => ({
                            ...prevState,
                            currency_id: e.target.value
                          }))
                        }}
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
                    rules={{ required: true }}
                    defaultValue={formValue.language_id}
                    render={({ field }) => (
                      <TextField
                        select
                        label='Choose Language'
                        variant='outlined'
                        fullWidth
                        value={field.value}
                        onChange={e => {
                          field.onChange(e)
                          setFormValue(prevState => ({
                            ...prevState,
                            language_id: e.target.value
                          }))
                        }}
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
                  <TextField
                    label='Add Security Funds'
                    variant='outlined'
                    fullWidth
                    {...register('amount')}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    value={formValue.amount}
                    onChange={handleFormInputChange}
                    name='amount'
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <Box>
                    <input
                      type='file'
                      accept='.jpg, .jpeg, .png'
                      style={{ display: 'none' }}
                      name='logo'
                      id='logo'
                      onChange={handleFormInputChange}
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
                  </Box>
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Description'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    value={formValue.description}
                    onChange={handleFormInputChange}
                    name='description'
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Notes (For Approval)'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    {...register('user_note')}
                    error={!!errors.user_note}
                    helperText={errors.user_note?.message}
                    value={formValue.user_note}
                    onChange={handleFormInputChange}
                    name='user_note'
                  />
                </Box>

                {displayErrors()}
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

export default SADrawer
