import React from 'react'

// ** MUI
import {FormControl,Button,Grid,TextField} from '@mui/material'

// ** Third Party Imports
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Tanstack APIS
import { SecuritySettingsService } from '@/services/api/SettingsService'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Success Message
import toast from 'react-hot-toast'


type SettingsInputs = {
  security_threshold : number
}

const defaultValues : SettingsInputs = {
  security_threshold : 0,
}

const schema = yup.object().shape({
  security_threshold: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),
})


type Props = {}

function SecurityFunds({}: Props) {

  // ** React Hook Form
  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm<SettingsInputs>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

   // ** Error Handling Hook
   const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()

  // ** APIS
  const { postSettingsThreshold } = SecuritySettingsService()
  const securityM = useMutation({
    mutationFn : postSettingsThreshold,
    onMutate : () => {},
    onSuccess : (res) => { 
      console.log('response', res)
      showSuccessMessage() 
    },
    onSettled : () => {},
    onError : (e : any) => { 
      handleError(e, `postSettingsThreshold() SecurityFunds.tsx`)
    }
  })

  const onSubmit : SubmitHandler<SettingsInputs>  = async (data) => {

    console.log('DATA', data)

    // should add site ID
    const site_id = 2
    const withSiteIDData = { ...data, site_id : site_id }

    await securityM.mutate( withSiteIDData )

  }

  const showSuccessMessage = () => {
    toast.success('Success!')
  }


  return (
    <form>

      <Grid container spacing={9}>

        <Grid item xs={12} sm={12}>
          <FormControl>
            <TextField
              fullWidth
              label='Security Threshold'
              placeholder='Security Threshold'
              type='number'
              {...register('security_threshold', {
                valueAsNumber: true
              })}
              error={!!errors.security_threshold}
              helperText={errors.security_threshold?.message}
            />
          </FormControl>
        </Grid>
        {getErrorResponse(12)}
        <Grid item xs={12}>

            
          <Button 
            disabled={ securityM.isLoading ? true : false }
            onClick={ (e) => handleSubmit(onSubmit)(e) }
            variant='contained' sx={{ mr: 4 }}>
            { securityM.isLoading ? 'Please wait...' : 'Save Security Threshold' } 
          </Button>

        </Grid>

      </Grid>

    </form>
  )
}

export default SecurityFunds