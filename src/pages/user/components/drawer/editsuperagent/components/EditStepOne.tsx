// ** React Imports
import { useRef, useState, useEffect } from 'react'

// ** MUI Imports
import { Box, Button, TextField, Typography, MenuItem, InputAdornment } from '@mui/material'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'

// ** Other Imports
import CreatedSuccessful from '../../../form/CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// ** Hooks/ Services
import { UserTableService } from '@/services/api/UserTableService'

// ** Zustand Imports
import { editSuperAgentStore } from '@/zustand/editSuperAgentStore'

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
  site_name: string
  description: string
  logo: File | null
  user_note: string
}

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  data: any
  languages: string[]
  currencies: string[]
}

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
  language_id: string
  currency_id: string
}

interface ResponseErrorProps {
  role_id?: string
  username?: string
  password?: string
  password_confirmation?: string
  mobile?: string
  email?: string
  partner_name?: string
  partner_code?: string
  partner_note?: string
  currency_id?: string
  language_id?: string
  site_name?: string
  description?: string
  logo?: File | null
  user_note?: string
}

const EditStepOne = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  // ** Hooks
  const { updateUser, getSpecificUser } = UserTableService()

  // ** Props
  const { toggle, languages, currencies } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()

  const [fileName, setFileName] = useState('')
  const fileInputRef: any = useRef(null)
  const handleUploadBtnClick = () => {
    fileInputRef.current.click()
  }

  // ** Zustand/Store Imports
  const { siteData, setSiteData } = editSuperAgentStore()

  const [partner, setPartner] = useState<Partner | null>(null)

  // const [siteData, setSiteData] = useState<SiteData[]>([])

  const [responseError, setResponseError] = useState<ResponseErrorProps>()

  console.log(props?.data)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const SitesPartnerQuery = (_: any) => {
    return useQuery({
      queryKey: ['specificUserPartner', props?.data.id],
      queryFn: () =>
        getSpecificUser({
          data: {
            id: props?.data.id,
            with: 'partner,sites'
          }
        }),
      onSuccess: (data: any) => {
        setPartner(data.partner)
        const site = data?.sites.map((item: any) => {
          return item
        })
        setSiteData(site)
      }
    })
  }

  if (props?.data.role_id && props?.data.role_id === 4) {
    SitesPartnerQuery(props?.data.id)
  }

  console.log(`SITE DATA:`, siteData)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormValues>()

  const [originalValues, setOriginalValues] = useState<FormValues | null>(null)

  // ** Handles the defaultValues of the TextFields
  useEffect(() => {
    if (partner && props?.data && siteData) {
      const initialValues: FormValues = {
        role_id: '4',
        partner_name: partner?.name,
        partner_code: partner?.code,
        partner_note: partner?.note,
        language_id: siteData[0]?.language_id,
        currency_id: siteData[0]?.currency_id,
        description: siteData[0]?.description,
        logo: null,
        site_name: siteData[0]?.name,
        amount: siteData[0]?.security_funds_balance,
        email: props?.data.email,
        mobile: props?.data.mobile,
        user_note: props?.data.note,
        username: props?.data.username,
        password: '********',
        password_confirmation: '********'
      }
      setOriginalValues(initialValues)
      for (const key in initialValues) {
        setValue(key, initialValues[key])
      }
    }
  }, [partner, setValue, props?.data, siteData])

  const mutation = useMutation(async (data: { id: any; data: any }) => {
    const response = await updateUser(data.id, data.data)
    if (response.ok) {
      await response.json()
    }
  })

  // ** Function for the photo/logo, checks if the value is an instance of the File class
  function isFile(value: any): value is File {
    return value instanceof File
  }

  // ** Filters out the empty values, and returns a new object with only the non-empty values
  const filterEmptyValues = (obj: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== '' && value !== null))
  }

  const handleFormSubmit = async (data: FormValues) => {
    const { password, password_confirmation } = data

    // Original values of the fields are shown, in the event that the user just attempts to send a blank input.
    if (originalValues) {
      for (const key in data) {
        if (data[key] === '' && originalValues[key]) {
          setValue(key, originalValues[key])
          data[key] = originalValues[key]
        }
      }
    }

    const filteredFormValues = filterEmptyValues(data)

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
      // Display the key/value pairs
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`)
      }
      try {
        await mutation.mutateAsync({
          id: props?.data.id,
          data: formData
        })
        setSubmitted(true)

        setTimeout(() => {
          toggle()
          setSubmitted(false)
          setResponseError({})

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
      }
    }
  }

  const handleClose = () => {
    toggle()
    queryClient.invalidateQueries({ queryKey: ['specificUserPartner'] })
    setResponseError({})
  }

  return (
    <Box sx={{ p: 5 }}>
      {!submitted ? (
        <Box sx={styles.container}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={styles.formContent}>
              <Box sx={styles.fullWidth}>
                <Controller
                  name='partner_name'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant='outlined'
                      fullWidth
                      error={!!errors.partner_name}
                      helperText={errors.partner_name?.message}
                      onChange={field.onChange}
                      name='partner_name'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.partner_code}
                      helperText={errors.partner_code?.message}
                      onChange={field.onChange}
                      name='partner_code'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      onChange={field.onChange}
                      name='username'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      onChange={field.onChange}
                      name='password'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.password_confirmation}
                      helperText={errors.password_confirmation?.message}
                      onChange={field.onChange}
                      name='password_confirmation'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                      onChange={field.onChange}
                      name='mobile'
                      value={field.value || ''}
                      onKeyPress={e => {
                        // Allow only numbers and the '+' symbol
                        if (!/[0-9+]/.test(e.key)) {
                          e.preventDefault()
                        }
                      }}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      onChange={field.onChange}
                      name='email'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.partner_note}
                      helperText={errors.partner_note?.message}
                      onChange={field.onChange}
                      name='partner_note'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.site_name}
                      helperText={errors.site_name?.message}
                      onChange={field.onChange}
                      name='site_name'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                      onChange={field.onChange}
                      name='amount'
                      value={field.value || ''}
                      disabled
                    />
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                {siteData[0]?.logo && <img width={340} height={300} src={siteData[0]?.logo} alt='Super Agent Logo' />}
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
                        }}
                        ref={fileInputRef}
                      />
                      <label htmlFor='logo'>
                        <TextField
                          value={fileName}
                          placeholder={siteData[0]?.logo || `Select a file`}
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
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      onChange={field.onChange}
                      name='description'
                      value={field.value || ''}
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
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.user_note}
                      helperText={errors.user_note?.message}
                      onChange={field.onChange}
                      name='user_note'
                      value={field.value || ''}
                    />
                  )}
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

export default EditStepOne