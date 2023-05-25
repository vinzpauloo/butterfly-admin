import React from 'react'

// ** MUI
import {FormControl,Button,Grid,TextField} from '@mui/material'

// ** Third Party Imports
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Tanstack APIS
import { WithdrawalSettingsService } from '@/services/api/SettingsService'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Success Message
import toast from 'react-hot-toast'

type SettingsInputs = {
  min_amount : number
  max_count_per_day : number
  max_amount_per_day : number
  max_count_per_month : number
  max_amount_per_month : number
}

const defaultValues : SettingsInputs = {
  min_amount : 0,
  max_count_per_day : 0,
  max_amount_per_day : 0,
  max_count_per_month : 0,
  max_amount_per_month : 0
}

const schema = yup.object().shape({
  min_amount: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  max_count_per_day: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  max_amount_per_day: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  max_count_per_month: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

  max_amount_per_month: yup.number()
                .typeError('Amount must be a number')
                .min(1, 'Invalid value').required(),

})


type Props = {}

function Withdrawals({}: Props) {

  // ** React Hook Form
  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm<SettingsInputs>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  // ** Error Handling Hook
  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()

  // ** APIS
  const { postWithdrawalMinMax } = WithdrawalSettingsService()
  const withM = useMutation({
    mutationFn : postWithdrawalMinMax,
    onMutate : () => {},
    onSuccess : (res) => { 
      console.log('response', res) 
      showSuccessMessage()
    },
    onSettled : () => {},
    onError :(e:any) => {
      handleError(e, `postWithdrawalMinMax() Withdrawals.tsx`)
    }
  })

  const onSubmit : SubmitHandler<SettingsInputs>  = async (data) => {
    console.log('DATA', data)

    // should add site ID
    const site_id = 2;
    const withSiteIDData = { ...data, site_id : site_id }

    await withM.mutate( withSiteIDData )
  }

  const showSuccessMessage = () => {
    toast.success('Success!')
  }


  return (
    <form>

      <Grid container spacing={9}>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Min Amount'
              placeholder='Min Amount'
              type='number'
              {...register('min_amount', {
                valueAsNumber: true
              })}
              error={!!errors.min_amount}
              helperText={errors.min_amount?.message}
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
              {...register('max_count_per_day', {
                valueAsNumber: true
              })}
              error={!!errors.max_count_per_day}
              helperText={errors.max_count_per_day?.message}
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
              {...register('max_amount_per_day', {
                valueAsNumber: true
              })}
              error={!!errors.max_amount_per_day}
              helperText={errors.max_amount_per_day?.message}
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
                {...register('max_count_per_month', {
                  valueAsNumber: true
                })}
                error={!!errors.max_count_per_month}
                helperText={errors.max_count_per_month?.message}
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
                {...register('max_amount_per_month', {
                  valueAsNumber: true
                })}
                error={!!errors.max_amount_per_month}
                helperText={errors.max_amount_per_month?.message}
              />
          </FormControl>
        </Grid>

        <Grid item xs={12}>

          <Button 
            disabled={ withM.isLoading ? true : false }
            onClick={ (e) => handleSubmit(onSubmit)(e) }
            variant='contained' sx={{ mr: 4 }}>
            { withM.isLoading ? 'Please wait...' : 'Save Withdrawals Settings' } 
          </Button>

        </Grid>

      </Grid>

    </form>
  )
}

export default Withdrawals