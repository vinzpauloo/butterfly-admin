import React from 'react'

// ** MUI
import {FormControl,Button,Grid,TextField, Divider,Box, CircularProgress } from '@mui/material'

// ** Custom Components
import Header from '../components/Header'

// ** Third Party Imports
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Tanstack APIS
import { SettingsService } from '@/services/api/SettingsService'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Success Message
import toast from 'react-hot-toast'

type SettingsInputs = {
  withdrawal_min_amount : number
  withdrawal_max_count_per_day : number
  withdrawal_max_amount_per_day : number
  withdrawal_max_count_per_month : number
  withdrawal_max_amount_per_month : number
  security_fund_threshold : number
}

const schema = yup.object().shape({

  security_fund_threshold: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  withdrawal_min_amount: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  withdrawal_max_count_per_day: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  withdrawal_max_amount_per_day: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  withdrawal_max_count_per_month: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  withdrawal_max_amount_per_month: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),
})


type Props = {
  data : SettingsInputs
}

function SecurityAndWithdrawals({data}: Props) {

  // ** React Hook Form
  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm<SettingsInputs>({
    defaultValues : data,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  // ** Error Handling Hook
  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()

  // ** APIS
  const { postGlobalSettings } = SettingsService()
  const queryClient = useQueryClient()

  const withM = useMutation({
    mutationFn : postGlobalSettings,
    onMutate : () => {},
    onSuccess : (res) => { 
      queryClient.invalidateQueries()
      showSuccessMessage()
    },
    onSettled : () => {},
    onError :(e:any) => {
      handleError(e, `postWithdrawalMinMax() Withdrawals.tsx`)
    }
  })

  const onSubmit : SubmitHandler<SettingsInputs>  = async (data) => {
    await withM.mutate( data )
  }

  const showSuccessMessage = () => {
    toast.success('Success!')
  }


  return (
    <form>

      <Header title='Security Funds' />
      <Grid container spacing={9}>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Security Threshold'
              placeholder='Security Threshold'
              type='number'
              {...register('security_fund_threshold', {
                valueAsNumber: true
              })}
              error={!!errors.security_fund_threshold}
              helperText={errors.security_fund_threshold?.message}
            />
          </FormControl>
        </Grid>

      </Grid>

      <Divider sx={{paddingBlock : '1rem'}} />

      <Box sx={{mt: '1.5rem'}}>
        <Header title='Withdrawals' />
      </Box>
      


      <Grid container spacing={9}>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Min Amount'
              placeholder='Min Amount'
              type='number'
              {...register('withdrawal_min_amount', {
                valueAsNumber: true
              })}
              error={!!errors.withdrawal_min_amount}
              helperText={errors.withdrawal_min_amount?.message}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}></Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Max Count Per Day'
              placeholder='Max Count Per Day'
              type='number'
              {...register('withdrawal_max_count_per_day', {
                valueAsNumber: true
              })}
              error={!!errors.withdrawal_max_count_per_day}
              helperText={errors.withdrawal_max_count_per_day?.message}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Max Amount Per Day'
              placeholder='Max Amount Per Day'
              type='number'
              {...register('withdrawal_max_amount_per_day', {
                valueAsNumber: true
              })}
              error={!!errors.withdrawal_max_amount_per_day}
              helperText={errors.withdrawal_max_amount_per_day?.message}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
              <TextField
                fullWidth
                label='Max Count Per Month'
                placeholder='Max Count Per Month'
                type='number'
                {...register('withdrawal_max_count_per_month', {
                  valueAsNumber: true
                })}
                error={!!errors.withdrawal_max_count_per_month}
                helperText={errors.withdrawal_max_count_per_month?.message}
              />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
              <TextField
                fullWidth
                label='Max Amount Per Month'
                placeholder='Max Amount Per Month'
                type='number'
                {...register('withdrawal_max_amount_per_month', {
                  valueAsNumber: true
                })}
                error={!!errors.withdrawal_max_amount_per_month}
                helperText={errors.withdrawal_max_amount_per_month?.message}
              />
          </FormControl>
        </Grid>

        <Grid item xs={12}>

          <Button 
            disabled={ withM.isLoading ? true : false }
            onClick={ (e) => handleSubmit(onSubmit)(e) }
            variant='contained' sx={{ mr: 4 }}>
            { withM.isLoading ? 
             <><CircularProgress size='1.5rem' sx={{mr:5}} /> 'Please wait...' </> : 
            'Save Settings' } 
          </Button>

        </Grid>

      </Grid>

    </form>
  )
}

export default SecurityAndWithdrawals