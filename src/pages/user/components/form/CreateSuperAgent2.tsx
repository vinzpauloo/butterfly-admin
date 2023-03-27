// ** React Imports
import React, { useState, useRef } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, TextField, Typography, MenuItem, InputAdornment } from '@mui/material'

// ** Form and Validation Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Other Imports
import CreatedSuccessful from './CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueries } from '@tanstack/react-query'

// ** Hooks
import { CreateAccount } from '@/services/api/CreateAccount'

interface FormValues {
  currency_id: string
  language_id: string
  site_name: string // Name of Site
  description: string
  logo: File | null
  amount: number
  note: string
}

const schema = yup.object().shape({
  currency_id: yup.string().required(),
  language_id: yup.string().required(),
  site_name: yup.string().required(),
  description: yup.string().min(3, 'Description must be at least 3 characters').required(),
  note: yup.string().min(3, 'Description must be at least 3 characters').required()
})

const CreateSuperAgent2 = () => {
  const router = useRouter()

  const [submitted, setSubmitted] = useState<boolean>()
  const [continueBtnTwo, setContinueBtnTwo] = useState<boolean>()

  const fileInputRef: any = useRef(null)
  const handleUploadBtnClick = () => {
    fileInputRef.current.click()
  }
  const [fileName, setFileName] = useState('')

  const [formValue, setFormValue] = useState<FormValues>({
    currency_id: '',
    language_id: '',
    site_name: '',
    description: '',
    logo: null,
    amount: 0,
    note: ''
  })

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

  const fileToBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  const handleFormSubmit = async () => {
    console.log(`SA TWO `, formValue)

    const result = JSON.parse(localStorage.getItem('createSA') || '')
    console.log(`fromSA ONE`, result)

    const merged = {
      ...result,
      ...formValue
    }

    console.log(`MERGED SA INFO`, merged)

    const formData = new FormData()
    for (const key in merged) {
      if (key === 'logo' && merged[key]) {
        formData.append(key, merged[key], merged[key].name)
      } else {
        formData.append(key, merged[key])
      }
    }

    const userData = {
      data: merged
    }

    const form: any = {
      data: formData
    }

    console.log(`USERDATA`, form)

    // if (merged.logo instanceof File || merged.logo instanceof Blob) {
    //   try {
    //     merged.logo = await fileToBase64(merged.logo)
    //   } catch (error) {
    //     console.error('Error converting logo to base64:', error)
    //   }
    // }

    await mutation.mutateAsync(form)

    setSubmitted(true)
    setTimeout(() => {
      router.push('/user/list')
    }, 1000)
  }

  const { data } = useQueries({
    queries: [
      {
        queryKey: ['Languages'],
        queryFn: getLanguages,
        onSuccess: (data: any) => {
          console.log(`SUCCESSLANG`, data)
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
          console.log(`SUCCESSCURRENCY`, data)
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

  return (
    <Box>
      {!submitted ? (
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
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box style={styles.formMargin}>
                <Box sx={styles.fullWidth}>
                  <Typography>Name of Site</Typography>
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
              </Box>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Currency</Typography>
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

                <Box sx={styles.halfWidth}>
                  <Typography>Language</Typography>
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
              </Box>
              <Box style={styles.formMargin}>
                <Box sx={styles.halfWidth}>
                  <Typography>Add Security Funds</Typography>
                  <TextField
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
                <Box sx={styles.halfWidth}>
                  <Typography>Logo</Typography>
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
              </Box>
              <Typography>Description (Optional)</Typography>
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
              <Typography>Notes (For Approval)</Typography>
              <TextField
                label='Optional'
                variant='outlined'
                fullWidth
                multiline
                rows={4}
                {...register('note')}
                error={!!errors.note}
                helperText={errors.note?.message}
                value={formValue.note}
                onChange={handleFormInputChange}
                name='note'
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
    display: 'block'
  },
  upload: {
    backgroundColor: '#979797',
    padding: '8px 12px 8px 12px',
    borderRadius: '5px'
  }
}

export default CreateSuperAgent2
