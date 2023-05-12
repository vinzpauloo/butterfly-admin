// ** React Imports
import React from 'react'
import toast from 'react-hot-toast'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Typography } from '@mui/material'

// ** Hooks Imports
import { captureError } from '@/services/Sentry'

interface ErrorMessage {
  data?: {
    message?: string
    error?: Record<string, string[]>
  }
}

export const useErrorHandling = () => {
  // ** Router
  const router = useRouter()
  const currentLocation = router.asPath

  // ** State Variables
  const [errorResponse, setErrorResponse] = React.useState<string>()

  // ** Functions
  const handleError = (e: ErrorMessage | undefined, customMessage: string) => {
    if (!e) {
      captureError(currentLocation, `Undefined error`)
      toast.error(`Error: Error is undefined`, {
        duration: 8000
      })

      return
    }

    // Check if 'data' property exists
    if (e?.data) {
      const {
        data: { message, error }
      } = e

      const errorMessages: string[] = []

      // Catch backend error messages
      if (error) {
        for (const key in error) {
          error[key].forEach((value: any) => {
            captureError(currentLocation, `${value}, Custom MSG: ${customMessage}`)
            toast.error(`Error ${value}`, {
              duration: 8000
            })
            errorMessages.push(value)
          })
        }
      }

      // Catch SQL error messages
      else if (message) {
        captureError(currentLocation, `${message}, Custom MSG: ${customMessage}`)
        toast.error(`Error ${message}`, {
          duration: 8000
        })
        errorMessages.push(message)
      }

      setErrorResponse(errorMessages.join('\n'))
    }

    // Handle cases where the data property does not exist
    else {
      captureError(currentLocation, `${JSON.stringify(e)}, Custom MSG: ${customMessage}, `)
      toast.error(`Error ${JSON.stringify(e)}`, {
        duration: 8000
      })
    }
  }

  const getErrorResponse = (fontSize: number) => {
    if (errorResponse) {
      return errorResponse.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          <Typography color='error' fontSize={fontSize} margin='0.15em'>
            {`***` + line}
          </Typography>
          {index !== errorResponse.split('\n').length - 1}
        </React.Fragment>
      ))
    }
  }

  const clearErrorResponse = () => {
    return setErrorResponse('')
  }

  return { handleError, getErrorResponse, clearErrorResponse }
}
