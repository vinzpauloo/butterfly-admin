// ** React Imports
import { useRef, useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Drawer, Button, TextField, IconButton, Typography, MenuItem, InputAdornment, InputLabel } from '@mui/material'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Other Imports
import CreatedSuccessful from '../form/CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueries, useQueryClient, useQuery } from '@tanstack/react-query'

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'
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

  // amount: number
  note: string
}

const schema = yup.object().shape({})

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

const EditSuperAgentDrawer = (props: SidebarAddUserType) => {
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

    // amount: 0,
    note: ''
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
    resolver: yupResolver(schema),
    defaultValues: {
      partner_name: 'Sample'
    }
  })

  const { updateUser, getSpecificUser } = useUsersTable()
  const { getLanguages, getCurrency } = CreateAccount()
  const mutation = useMutation(async (data: { id: any; data: any }) => {
    const response = await updateUser(data.id, data.data)
    if (response.ok) {
      await response.json()
    }
  })

  const [responseError, setResponseError] = useState<any>([])
  function isFile(value: any): value is File {
    return value instanceof File
  }

  const filterEmptyValues = (obj: FormValues) => {
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== '' && value !== null))
  }

  const handleFormSubmit = async () => {
    const { password, password_confirmation } = formValue

    const filteredFormValues = filterEmptyValues(formValue)

    const formData = new FormData()
    for (const key in filteredFormValues) {
      const value = filteredFormValues[key]
      if (key === 'logo' && isFile(value)) {
        formData.append(key, value, value.name)
      } else if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString())
      }
    }

    formData.append('_method', 'put')
    formData.append('site_id', siteData[0]?.id.toString())

    if (password === password_confirmation) {
      try {
        await mutation.mutateAsync({
          id: props.userId,
          data: formData
        })
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

            // amount: 0,
            note: ''
          })

          setResponseError(false)

          // Re-fetches UserTable and CSV exportation
          queryClient.invalidateQueries({ queryKey: ['allUsers'] })
          queryClient.invalidateQueries({ queryKey: ['UsersTableCSV'] })
          queryClient.invalidateQueries({ queryKey: ['specificUserPartner'] })
        }, 1500)
      } catch (e: any) {
        const {
          data: { error }
        } = e
        setResponseError(error)
        console.log(error)
      }
    }
  }

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

  const handleClose = () => {
    toggle()
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
              language_id: data?.data[0]?.id
            }))
          }
        }
      },
      {
        queryKey: ['Currencies'],
        queryFn: getCurrency,
        onSuccess: (data: any) => {
          setCurrencies(data?.data)
          setCurrencyId(data?.data)

          if (data?.data && data?.data.length > 0 && !formValue.currency_id) {
            setFormValue(prevState => ({
              ...prevState,
              currency_id: data?.data[0]?.id
            }))
          }
        }
      }
    ]
  })

  interface Partner {
    name: string
    code: string
    note: string
  }

  interface SiteData {
    id: any
    logo: any
    name: string
    security_funds_balance: string
    description: string
  }

  const [languages, setLanguages] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [partner, setPartner] = useState<Partner | null>(null)
  const [siteData, setSiteData] = useState<SiteData[]>([])

  const [currencyId, setCurrencyId] = useState()
  const [languageId, setLanguageId] = useState()

  const SitesPartnerQuery = (userId: any) => {
    return useQuery({
      queryKey: ['specificUserPartner', props.userId],
      queryFn: () =>
        getSpecificUser({
          data: {
            id: props.userId,
            with: 'partner,sites'
          }
        }),
      onSuccess: (data: any) => {
        setPartner(data.partner)
        const site = data.sites.map((item: any) => {
          return item
        })
        setSiteData(site)
      }
    })
  }

  if (props.roleId && props.roleId === 4) {
    const {} = SitesPartnerQuery(props.userId)
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
        <Typography variant='h6'>Edit Super Agent</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            {/* <Box sx={{ display: 'flex', backgroundColor: '#A459D1', padding: 4, justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={styles.white}>Super Agent: {props.userId} </Typography>
              </Box>
              <Box>
                <Typography sx={styles.white}>{props.data.username}</Typography>
              </Box>
            </Box> */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Partner Name'
                    variant='outlined'
                    fullWidth
                    {...register('partner_name')}
                    error={!!errors.partner_name}
                    helperText={errors.partner_name?.message}
                    // value={formValue.partner_name === '' ? partner?.name : formValue.partner_name}
                    onChange={handleFormInputChange}
                    name='partner_name'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Box>
                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Partner Code'
                    variant='outlined'
                    fullWidth
                    {...register('partner_code')}
                    error={!!errors.partner_code}
                    helperText={errors.partner_code?.message}
                    value={formValue.partner_code === '' ? partner?.code : formValue.partner_code}
                    onChange={handleFormInputChange}
                    name='partner_code'
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    value={formValue.username === '' ? props?.data.username : formValue.username}
                    onChange={handleFormInputChange}
                    name='username'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
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
                  <TextField
                    label='mobile'
                    variant='outlined'
                    fullWidth
                    {...register('mobile')}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    value={formValue.mobile === '' ? props?.data.mobile : formValue.mobile}
                    onChange={handleFormInputChange}
                    name='mobile'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='email'
                    variant='outlined'
                    fullWidth
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    value={formValue.email === '' ? props?.data.mobile : formValue.email}
                    onChange={handleFormInputChange}
                    name='email'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Partner Note'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    {...register('partner_note')}
                    error={!!errors.partner_note}
                    helperText={errors.partner_note?.message}
                    value={formValue.partner_note === '' ? partner?.note : formValue.partner_note}
                    onChange={handleFormInputChange}
                    name='email'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Box>

                {/* <Box
                  sx={{
                    display: 'flex',
                    backgroundColor: '#A459D1',
                    padding: 4,
                    justifyContent: 'space-between',
                    mt: 5
                  }}
                >
                  <Box>
                    <Typography sx={styles.white}>Step 2</Typography>
                  </Box>
                  <Box>
                    <Typography sx={styles.white}>{props.data.site_name} </Typography>
                  </Box>
                </Box> */}

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Site Name'
                    variant='outlined'
                    fullWidth
                    {...register('site_name')}
                    error={!!errors.site_name}
                    helperText={errors.site_name?.message}
                    value={formValue.site_name === '' ? siteData[0]?.name : formValue.site_name}
                    onChange={handleFormInputChange}
                    name='site_name'
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    label='Security Funds'
                    variant='outlined'
                    fullWidth
                    value={siteData[0]?.security_funds_balance}
                    name='amount'
                    InputLabelProps={{
                      shrink: true
                    }}
                    disabled
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <img width={340} height={300} src={siteData[0]?.logo} alt='Super Agent Logo' />
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
                        placeholder={siteData[0]?.logo}
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
                    value={formValue.description === '' ? siteData[0]?.description : formValue.description}
                    onChange={handleFormInputChange}
                    name='description'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <TextField
                    label='Note'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    {...register('note')}
                    error={!!errors.note}
                    helperText={errors.note?.message}
                    value={formValue.note === '' ? props?.data.note : formValue.note}
                    onChange={handleFormInputChange}
                    name='note'
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Box>

                {responseError &&
                  Object.values(responseError).map((error: any, index) => (
                    <Typography color='red' key={index}>
                      {error}
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

export default EditSuperAgentDrawer
