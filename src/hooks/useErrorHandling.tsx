// ** React Imports
import React from 'react'
import toast from 'react-hot-toast'

// ** MUI Imports
import { Typography } from '@mui/material'

// ** Hooks Imports
import { captureError } from '@/services/Sentry'

interface ErrorActions {
  currentLocation: string
}

interface ErrorMessage {
  data: {
    message: string
    error: Record<string, string[]>
  }
}

export const useErrorHandling = ({ currentLocation }: ErrorActions) => {
  const [errorResponse, setErrorResponse] = React.useState<string>()

  const handleError = (e: ErrorMessage, customMessage: string) => {
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
            duration: 2000
          })
          errorMessages.push(value)
        })
      }
    }

    // Catch SQL error messages
    else if (message) {
      captureError(currentLocation, `${message}, Custom MSG: ${customMessage}`)
      toast.error(`Error ${message}`, {
        duration: 2000
      })
      errorMessages.push(message)
    }

    setErrorResponse(errorMessages.join('\n'))
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
