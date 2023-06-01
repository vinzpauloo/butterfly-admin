// ** React Imports
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'

// ** Project/Other Imports
import CreatedSuccessful from '../../../form/CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// ** Hooks/ Services
import { UserTableService } from '@/services/api/UserTableService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Zustand Imports
import { editSuperAgentStore } from '@/zustand/editSuperAgentStore'

// ** Lib Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import InputForm from '../../../form/InputForm'
import SuperAgentFileUploader from '../../../modal/SuperAgentFileUploader'

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

const EditStepOne = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()
  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()

  // ** Hooks
  const { updateUser, getSpecificUser } = UserTableService()

  // ** Props
  const { toggle, languages, currencies } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()

  const [fileName, setFileName] = useState<string | File>('')

  // ** Zustand/Store Imports
  const { siteData, setSiteData } = editSuperAgentStore()

  const [partner, setPartner] = useState<Partner | null>(null)

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
      },
      onError: (e: any) => {
        handleError(e, `getSpecificUser() EditStepOne.tsx SUPERAGENT`)
      }
    })
  }

  if (props?.data.role_id && props?.data.role_id === 4) {
    SitesPartnerQuery(props?.data.id)
  }

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

  const handleLogoChange = (files: File[]) => {
    const maxFileSize = 2 * 1024 * 1024 // 2MB in bytes

    if (files[0].size > maxFileSize) {
      alert('Error: Cover photo size exceeds the 2MB limit.')

      return
    }

    setFileName(files[0])
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

    formData.append('logo', fileName)

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
          clearErrorResponse()

          // Re-fetches UserTable and CSV exportation
          queryClient.invalidateQueries({ queryKey: ['allUsers'] })
          queryClient.invalidateQueries({ queryKey: ['UsersTableCSV'] })
          queryClient.invalidateQueries({ queryKey: ['specificUserPartner'] })
        }, 1500)
      } catch (e: any) {
        handleError(e, `updateUser() EditStepOne.tsx SuperAgent`)
      }
    }
  }

  const handleClose = () => {
    toggle()
    queryClient.invalidateQueries({ queryKey: ['specificUserPartner'] })
    clearErrorResponse()
  }

  return (
    <>
      {!submitted ? (
        <Box sx={styles.container}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    isEdit={true}
                    width='100%'
                    controllerName='partner_name'
                    control={control}
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
                    isEdit={true}
                    width='100%'
                    controllerName='partner_code'
                    control={control}
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
                    isEdit={true}
                    width='100%'
                    controllerName='username'
                    control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='password'
                      control={control}
                      variant='outlined'
                      fullWidth={true}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      name='password'
                    />
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>Re-enter Password</Typography>
                    <InputForm
                      isEdit={true}
                      width='100%'
                      controllerName='password_confirmation'
                      control={control}
                      variant='outlined'
                      fullWidth={true}
                      error={!!errors.password_confirmation}
                      helperText={errors.password_confirmation?.message}
                      name='password_confirmation'
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
                      isEdit={true}
                      width='100%'
                      controllerName='mobile'
                      control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='site_name'
                      control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='currency_id'
                      control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='user_note'
                      control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='email'
                      control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='amount'
                      control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='language_id'
                      control={control}
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
                      isEdit={true}
                      width='100%'
                      controllerName='description'
                      control={control}
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
                  <SuperAgentFileUploader onFilesChange={handleLogoChange} logo={FILE_SERVER_URL + siteData[0]?.logo} />

                  <Box mt={7}>
                    <Typography>Company Notes</Typography>
                    <InputForm
                      isEdit={true}
                      width='100%'
                      controllerName='partner_note'
                      control={control}
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

              {/* Error from backend */}
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
        <CreatedSuccessful update />
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

export default EditStepOne
