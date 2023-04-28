// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Drawer, Button, TextField, IconButton, Typography, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Other Imports
import CreatedSuccessful from '@/pages/user/components/form/CreatedSuccessful'
import { useTranslateString } from '@/utils/TranslateString'
import { useSiteContext } from '../../../context/SiteContext'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks
import { ApkService } from '@/services/api/ApkService'

interface FormValues {
  [key: string]: any
  download_link: string
  os: 'android' | 'ios' | ''
  version: string
  patch_note: string
  name: string
}

const schema = yup.object().shape({
  download_link: yup
    .string()
    .url('Link must be a valid URL. e.g.: https://www.example.com')
    .required('Download link is required.'),
  os: yup.string().required('Please choose an operating system.'),
  version: yup.string().required('Please input a version.'),
  name: yup.string().required('Please enter your name.'),
  patch_note: yup.string().required('Please input your patch notes.')
})

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  id: any
  rowData: any
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const EditVersionDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  // ** Props
  const { open, toggle, id, rowData } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (rowData) {
      const initialValues: FormValues = {
        download_link: rowData?.download_link,
        os: rowData?.os,
        patch_note: rowData?.patch_note,
        version: rowData?.version,
        name: rowData?.name
      }
      for (const key in initialValues) {
        setValue(key, initialValues[key])
      }
    }
  }, [rowData, setValue])

  const resetForm = () => {
    reset({
      download_link: '',
      os: '',
      version: '',
      patch_notes: '',
      name: ''
    })
  }

  const { editAPK } = ApkService()
  const mutation = useMutation(async (data: { id: any; data: any }) => {
    const response = await editAPK(data.id, data.data)
    if (response.ok) {
      await response.json()
    }
  })

  const { selectedSite } = useSiteContext()

  const handleFormSubmit = async (data: FormValues) => {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key]

      formData.append(key, value)
    }

    formData.append('site_id', `${selectedSite}`)
    formData.append('_method', 'put')

    const apkData: any = {
      data: formData
    }

    try {
      await mutation.mutateAsync({
        id: id,
        data: apkData
      })
      setSubmitted(true)

      setTimeout(() => {
        toggle()
        setSubmitted(false)

        // Re-fetches UserTable and CSV exportation
        queryClient.invalidateQueries({ queryKey: ['allApk'] })
      }, 1500)
    } catch (e) {
      console.log(`Error`, e)
    }
  }

  const [resetKey, setResetKey] = useState(0)

  const handleClose = () => {
    resetForm()
    setResetKey(prevKey => prevKey + 1)
    toggle()
  }

  const TranslateString = useTranslateString()

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
        <Typography variant='h6'>
          {TranslateString('Edit')} {TranslateString('Patch')}
        </Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        {!submitted ? (
          <Box sx={styles.container}>
            <form key={resetKey} onSubmit={handleSubmit(handleFormSubmit)}>
              <Controller
                name='download_link'
                control={control}
                render={({ field }) => (
                  <TextField
                    label={TranslateString('Download') + ' ' + TranslateString('Link')}
                    variant='outlined'
                    fullWidth
                    error={!!errors.download_link}
                    helperText={errors.download_link?.message}
                    value={field.value || ''}
                    onChange={field.onChange}
                    name='download_link'
                    type='url'
                  />
                )}
              />
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='os'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        select
                        label='Choose Operating System'
                        variant='outlined'
                        fullWidth
                        error={!!errors.os}
                        helperText={errors.os?.message}
                        value={field.value}
                        onChange={field.onChange}
                        name='os'
                      >
                        <MenuItem value={'android'} sx={{ textTransform: 'uppercase' }}>
                          <Typography sx={{ textTransform: 'uppercase' }}>Android</Typography>
                        </MenuItem>
                        <MenuItem value={'ios'} sx={{ textTransform: 'uppercase' }}>
                          <Typography sx={{ textTransform: 'uppercase' }}>IOS</Typography>
                        </MenuItem>
                      </TextField>
                    )}
                  />
                </Box>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={TranslateString('Site') + ' ' + TranslateString('Name')}
                        variant='outlined'
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        name='name'
                      />
                    )}
                  />
                </Box>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='version'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={TranslateString('Enter') + ' ' + TranslateString('Version')}
                        variant='outlined'
                        fullWidth
                        error={!!errors.version}
                        helperText={errors.version?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        name='version'
                      />
                    )}
                  />
                </Box>

                <Box sx={styles.fullWidth}>
                  <Controller
                    name='patch_note'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={TranslateString('Patch Notes')}
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={20}
                        error={!!errors.patch_note}
                        helperText={errors.patch_note?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        name='patch_note'
                      />
                    )}
                  />
                </Box>
                <Box sx={styles.formButtonContainer}>
                  <Box>
                    <Button sx={styles.cancelButton} onClick={handleClose}>
                      <Typography sx={styles.text}>{TranslateString('Cancel')}</Typography>
                    </Button>
                  </Box>

                  <Box>
                    <Button type='submit' sx={styles.continueButton}>
                      <Typography sx={styles.text}>{TranslateString('Continue')}</Typography>
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
  }
}

export default EditVersionDrawer
