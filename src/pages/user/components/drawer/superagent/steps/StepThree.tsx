import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Button, TextField, Typography } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Other Imports
import CreatedSuccessful from '../../../form/CreatedSuccessful'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services
import { PaymentService } from '@/services/api/PaymentService'

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
  siteID: number | null
}

interface FormValues {
  [key: string]: string | number | File | null
  site_id: string
  merchant_id: string | number
  key: string
  rsa_private: string
  rsa_public: string
}

const schema = yup.object().shape({})

const SAStepThree = (
  {
    resetKey,
    responseError,
    setResponseError,
    setFileName,
    setSiteID,
    handleNext,
    setIsLoading,
    siteID,
    handleClose
  }: StepOneProps,
  ref: any
) => {
  const queryClient = useQueryClient()

  // ** State
  const [submitted, setSubmitted] = React.useState<boolean>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const resetForm = () => {
    reset({})
  }

  // forward to parent the resetForm function by calling reset
  React.useImperativeHandle(
    ref,
    () => {
      return { reset: () => resetForm() }
    },
    []
  )

  const { registerPayment } = PaymentService()

  const { mutate: mutateStepThree } = useMutation(registerPayment, {
    onSuccess: response => {
      console.log('mutateStepThree onSuccess response', response)
      setSiteID(response?.partner?.site?.id)

      setTimeout(() => {
        resetForm()
        setFileName('')
        setResponseError({})
        setIsLoading(false)
        handleNext()

        // Re-fetches UserTable and CSV exportation
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
        queryClient.invalidateQueries({ queryKey: ['UsersTableCSV'] })
      }, 1500)
    },
    onSettled: response => {
      console.log('mutateStepThree onSettled response', response)
      setIsLoading(false)
    },
    onError: error => {
      console.log('mutateStepThree onError response', error)
      alert(error)
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
    formData.append('site_id', `${siteID}`)

    const form: any = {
      data: formData
    }

    setIsLoading(true)
    setSubmitted(true)
    mutateStepThree(form)

    try {
    } catch (e: any) {
      const {
        data: { error }
      } = e
      setResponseError(error)
    }
  }

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

  return (
    <>
      {!submitted ? (
        <Box sx={styles.container}>
          <form ref={ref} key={resetKey} onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={styles.formContent}>
              <Box sx={styles.fullWidth}>
                {siteID && `Site ID: ${siteID}`}
                <Controller
                  name='merchant_id'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Merchant ID'
                      variant='outlined'
                      fullWidth
                      error={!!errors.merchant_id}
                      helperText={errors.merchant_id?.message}
                      defaultValue={field.value ?? ''}
                      onChange={field.onChange}
                      name='merchant_id'
                    />
                  )}
                />
              </Box>
              <Box sx={styles.fullWidth}>
                <Controller
                  name='key'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='key'
                      variant='outlined'
                      fullWidth
                      error={!!errors.key}
                      helperText={errors.key?.message}
                      defaultValue={field.value ?? ''}
                      onChange={field.onChange}
                      name='key'
                    />
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='rsa_private'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='RSA - Private'
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={8}
                      error={!!errors.rsa_private}
                      helperText={errors.rsa_private?.message}
                      defaultValue={field.value ?? ''}
                      onChange={field.onChange}
                      name='rsa_private'
                    />
                  )}
                />
              </Box>

              <Box sx={styles.fullWidth}>
                <Controller
                  name='rsa_public'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='RSA - Public'
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={8}
                      error={!!errors.rsa_public}
                      helperText={errors.rsa_public?.message}
                      defaultValue={field.value ?? ''}
                      onChange={field.onChange}
                      name='rsa_public'
                    />
                  )}
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

export default React.forwardRef(SAStepThree)
