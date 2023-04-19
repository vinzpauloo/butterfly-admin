// ** React Imports
import { useState } from 'react'

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

// ** TanStack Query
// import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks

interface FormValues {
  download_link: string
  os: 'android' | 'ios' | ''
  version: string
  patch_notes: string
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

const EditVersionDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [submitted] = useState<boolean>()

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
      download_link: '',
      os: '',
      version: '',
      patch_notes: ''
    })
  }

  const handleFormSubmit = () => {
    alert(`SUCCESS`)
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
                    defaultValue={field.value}
                    onChange={field.onChange}
                    name='download_link'
                  />
                )}
              />
              {errors.os && (
                <Typography variant='caption' color='error' sx={{ marginLeft: 4 }}>
                  {errors.os.message}
                </Typography>
              )}
              <Box sx={styles.formContent}>
                <Box sx={styles.fullWidth}>
                  <Controller
                    name='os'
                    control={control}
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
                        <MenuItem value={1} sx={{ textTransform: 'uppercase' }}>
                          <Typography sx={{ textTransform: 'uppercase' }}>Android</Typography>
                        </MenuItem>
                        <MenuItem value={2} sx={{ textTransform: 'uppercase' }}>
                          <Typography sx={{ textTransform: 'uppercase' }}>IOS</Typography>
                        </MenuItem>
                      </TextField>
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
                    name='patch_notes'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={TranslateString('Patch Notes')}
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={20}
                        error={!!errors.patch_notes}
                        helperText={errors.patch_notes?.message}
                        defaultValue={field.value}
                        onChange={field.onChange}
                        name='user_note'
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
