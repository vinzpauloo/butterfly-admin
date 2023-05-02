// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Drawer, Button, TextField, IconButton, Typography } from '@mui/material'
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
import { WalletService } from '@/services/api/WalletService'
import FileUploaderSingle from './FileUploader'

interface FormValues {
  [key: string]: any
  bank_code: string //Provider
  name: string // Merchant name
  active: string | number //0 = false; 1 = true
  logo: File | null
}

const schema = yup.object().shape({})

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

const PaymentsDrawer = (props: SidebarAddUserType) => {
  const queryClient = useQueryClient()

  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted, setSubmitted] = useState<boolean>()

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
      bank_code: '',
      name: '',
      active: '',
      logo: null
    })
  }

  const { postWallet } = WalletService()
  const mutation = useMutation(postWallet)

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleLogoChange = (files: File[]) => {
    const maxFileSize = 2 * 1024 * 1024 // 2MB in bytes

    if (files[0].size > maxFileSize) {
      alert('Error: Logo size exceeds the 2MB limit.')

      return
    }

    setUploadedFile(files[0])
  }

  const handleFormSubmit = async (data: FormValues) => {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key]

      formData.append(key, value)
    }

    if (uploadedFile) {
      formData.append(`logo`, uploadedFile)
    }

    const paymentsData: any = {
      data: formData
    }

    try {
      await mutation.mutateAsync(paymentsData)
      setSubmitted(true)

      setTimeout(() => {
        toggle()
        resetForm()
        setSubmitted(false)

        // Re-fetches UserTable and CSV exportation
        queryClient.invalidateQueries({ queryKey: ['allPayments'] })
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
          {TranslateString('Payment')} {TranslateString('Method')}
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
                name='bank_code'
                control={control}
                render={({ field }) => (
                  <TextField
                    label={TranslateString('Provider')}
                    variant='outlined'
                    fullWidth
                    error={!!errors.bank_code}
                    helperText={errors.bank_code?.message}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    name='bank_code'
                  />
                )}
              />

              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <FileUploaderSingle onFilesChange={handleLogoChange} />
                </Box>

                <Box sx={styles.fullWidth}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={TranslateString('Merchant Name')}
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
              </Box>
              <Box sx={styles.formButtonContainer}>
                <Box>
                  <Button sx={styles.cancelButton} onClick={handleClose}>
                    <Typography sx={styles.text}>{TranslateString('Cancel')}</Typography>
                  </Button>
                </Box>

                <Box>
                  <Button type='submit' sx={styles.continueButton}>
                    <Typography sx={styles.text}>{TranslateString('Submit')}</Typography>
                  </Button>
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
    mt: 20,
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

export default PaymentsDrawer
