// ** React Imports
import React, { useState } from 'react'

// ** Yup and Form Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
  InputAdornment
} from '@mui/material'

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'

// ** TanStack
import { useMutation } from '@tanstack/react-query'

interface FormValues {
  // companyName: string
  // companyCode: string
  // accessURL: string
  // siteName: string
  // username: string
  password: string
  password_confirmation: string
  // mobileNo: string
  // emailAddress: string
  // notes: string
  // language: string
  // currency: string
  // securityFunds: string
  // logo: FileList | null | any
}

const schema = yup.object().shape({
  // companyName: yup.string().required(),
  // companyCode: yup.string().required(),
  // accessURL: yup.string().required(),
  // siteName: yup.string().required(),
  // username: yup.string().required(),
  password: yup.string().required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
  // mobileNo: yup.string().required(),
  // emailAddress: yup.string().email().required(),
  // language: yup.string().required(),
  // currency: yup.string().required(),
  // securityFunds: yup.string().required(),

  // logo: yup.mixed().test("fileSize", "File size is too large", (value) => {
  //   return !value || value[0].size <= 1024 * 1024;
  // }),
  // logo: yup.mixed().required('A logo is required')
})

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number
  data: any
}

const FormModal: React.FC<FormModalProps> = ({ userId, data, isOpen, onClose }) => {
  const [formValue, setFormValue] = useState<FormValues>({
    // companyName: '',
    // companyCode: '',
    // accessURL: '',
    // siteName: '',
    // username: '',
    password: '',
    password_confirmation: ''
    // mobileNo: '',
    // emailAddress: '',
    // notes: '',
    // language: '',
    // currency: '',
    // securityFunds: '',
    // logo: null
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const { updateUser } = useUsersTable()
  const mutation = useMutation(async (data: { id: any; data: any }) => {
    const response = await updateUser(data.id, data.data)
    if (response.ok) {
      await response.json()
    }
  })

  const handleFormSubmit = async () => {
    const { password, password_confirmation } = formValue

    if (password === password_confirmation) {
      await mutation.mutateAsync({
        id: userId,
        data: { password, password_confirmation, _method: 'put' }
      })
      alert(JSON.stringify(formValue))
      onClose()
    } else {
      alert('Passwords do not match')
    }

    alert(JSON.stringify(formValue))
    onClose()
  }

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value, files } = event.target

    // setFormValue(prevState => ({
    //   ...prevState,
    //   [name]: files ? files[0] : value
    // }))

    const { name, value } = event.target

    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='lg'>
      <Box sx={{ backgroundColor: '#A459D1', width: { md: '70em' } }}>
        <DialogTitle sx={{ color: 'white', textTransform: 'uppercase' }}>Super Agent</DialogTitle>
      </Box>
      <DialogContent sx={{ width: { md: '70em' }, height: { md: '40em' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: 2 }
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 } }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Company Name</Typography>
                      <TextField
                        label='Company Name'
                        variant='outlined'
                        fullWidth
                        // {...register('companyName')}
                        // error={!!errors.companyName}
                        // helperText={errors.companyName?.message}
                        // value={formValue.companyName}
                        // onChange={handleFormInputChange}
                        name='companyName'
                        disabled
                      />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Company Code</Typography>
                      <TextField
                        label='Company Code'
                        variant='outlined'
                        fullWidth
                        // {...register('companyCode')}
                        // error={!!errors.companyCode}
                        // helperText={errors.companyCode?.message}
                        // value={formValue.companyCode}
                        // onChange={handleFormInputChange}
                        name='companyCode'
                        disabled
                      />
                    </Box>
                  </Box>

                  <Typography>Username</Typography>
                  <TextField
                    label={data.username}
                    variant='outlined'
                    fullWidth
                    // {...register('username')}
                    // error={!!errors.username}
                    // helperText={errors.username?.message}
                    // value={formValue.username}
                    // onChange={handleFormInputChange}
                    name='username'
                    disabled
                  />

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 } }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Password</Typography>
                      <TextField
                        label='Password'
                        variant='outlined'
                        fullWidth
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        value={formValue.password}
                        onChange={handleFormInputChange}
                        name='password'
                      />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Re-enter Password</Typography>
                      <TextField
                        label='Re-enter Password'
                        variant='outlined'
                        fullWidth
                        {...register('password_confirmation')}
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                        value={formValue.password_confirmation}
                        onChange={handleFormInputChange}
                        name='password_confirmation'
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 } }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Mobile No.</Typography>
                      <TextField
                        label={data.mobile}
                        variant='outlined'
                        fullWidth
                        // {...register('mobileNo')}
                        // error={!!errors.mobileNo}
                        // helperText={errors.mobileNo?.message}
                        // value={formValue.mobileNo}
                        // onChange={handleFormInputChange}
                        // name='mobileNo'
                        disabled
                      />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Email Address</Typography>
                      <TextField
                        label={data.email}
                        variant='outlined'
                        fullWidth
                        // {...register('emailAddress')}
                        // error={!!errors.emailAddress}
                        // helperText={errors.emailAddress?.message}
                        // value={formValue.emailAddress}
                        // onChange={handleFormInputChange}
                        // name='emailAddress'
                        disabled
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 } }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Name of Site</Typography>
                      <TextField
                        label='Name of Site'
                        variant='outlined'
                        fullWidth
                        // {...register('siteName')}
                        // error={!!errors.siteName}
                        // helperText={errors.siteName?.message}
                        // value={formValue.siteName}
                        // onChange={handleFormInputChange}
                        // name='siteName'
                        disabled
                      />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Language</Typography>
                      <TextField
                        select
                        label='Language'
                        variant='outlined'
                        fullWidth
                        // {...register('language')}
                        // error={!!errors.language}
                        // helperText={errors.language?.message}
                        // value={formValue.language}
                        // onChange={handleFormInputChange}
                        // name='language'
                        disabled
                      >
                        <MenuItem value='en'>English</MenuItem>
                        <MenuItem value='es'>Spanish</MenuItem>
                        <MenuItem value='fr'>French</MenuItem>
                      </TextField>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 } }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Currency</Typography>
                      <TextField
                        select
                        label='Currency'
                        variant='outlined'
                        fullWidth
                        // {...register('currency')}
                        // error={!!errors.currency}
                        // helperText={errors.currency?.message}
                        // value={formValue.currency}
                        // onChange={handleFormInputChange}
                        // name='currency'
                        disabled
                      >
                        <MenuItem value='usd'>USD</MenuItem>
                        <MenuItem value='eur'>EUR</MenuItem>
                        <MenuItem value='gbp'>GBP</MenuItem>
                      </TextField>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Access URL</Typography>
                      <TextField
                        label='Access URL'
                        variant='outlined'
                        fullWidth
                        // {...register('accessURL')}
                        // error={!!errors.accessURL}
                        // helperText={errors.accessURL?.message}
                        // value={formValue.accessURL}
                        // onChange={handleFormInputChange}
                        // name='accessURL'
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1, marginLeft: { md: 20 } }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 } }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Add Security Funds</Typography>
                      <TextField
                        label='Amount'
                        variant='outlined'
                        fullWidth
                        // {...register('securityFunds')}
                        // error={!!errors.securityFunds}
                        // helperText={errors.securityFunds?.message}
                        // value={formValue.securityFunds}
                        // onChange={handleFormInputChange}
                        // name='securityFunds'
                        disabled
                      />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography>Logo</Typography>
                      <Box>
                        <input
                          type='file'
                          // {...register('logo', { required: 'Logo is required' })}
                          accept='.jpg, .jpeg, .png'
                          style={{ display: 'none' }}
                          onChange={handleFormInputChange}
                          name='logo'
                          id='logo'
                          disabled
                        />
                        <label htmlFor='logo'>
                          <TextField
                            disabled
                            variant='outlined'
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end' sx={{ position: 'absolute', right: 5 }}>
                                  <Box
                                    sx={{
                                      backgroundColor: '#979797',
                                      padding: '8px 15px 8px 15px',
                                      borderRadius: '5px'
                                    }}
                                  >
                                    <Typography sx={{ color: '#FFF' }}>UPLOAD</Typography>
                                  </Box>
                                </InputAdornment>
                              )
                            }}
                            // error={!!errors.logo}
                          />
                        </label>
                      </Box>
                      {/* {formValue?.logo === null || undefined ? (
                        <Typography sx={{ color: 'red' }}>Please upload an image</Typography>
                      ) : (
                        <Typography>{formValue?.logo.name}</Typography>
                      )} */}
                    </Box>
                  </Box>

                  <Typography sx={{ marginTop: { md: 15 } }}>Notes (Optional)</Typography>
                  <TextField
                    label='Notes'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={12}
                    // {...register('notes')}
                    // value={formValue.notes}
                    // onChange={handleFormInputChange}
                    // name='notes'
                    disabled
                  />

                  <Box sx={{ marginTop: { md: 8 } }}>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        onClick={onClose}
                        sx={{
                          backgroundColor: '#98A9BC',
                          color: 'white',
                          width: '200px',
                          '&:hover': {
                            backgroundColor: '#7899ac'
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            textTransform: 'uppercase',
                            '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease-in-out' }
                          }}
                        >
                          Cancel
                        </Typography>
                      </Button>
                      <Button
                        type='submit'
                        sx={{
                          backgroundColor: '#9747FF',
                          color: 'white',
                          width: '200px',
                          '&:hover': {
                            backgroundColor: '#9747FF'
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            textTransform: 'uppercase',
                            '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease-in-out' }
                          }}
                        >
                          Update
                        </Typography>
                      </Button>
                    </DialogActions>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default FormModal
