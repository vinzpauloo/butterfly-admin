import React from 'react'

// ** MUI
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party imports
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

type ExpandoFormProps = {
  pageHeader: string
  fileType: string
  handleExpandoSubmit?: (data: FormInputs) => void
  isLoading?: boolean
  disableSaveButton? : boolean
  getData? : () => any
}

type FormInputs = {
  expando: {
    value: string
  }[]
}

const ExpandoForm = ({ pageHeader, fileType, handleExpandoSubmit, isLoading = false, disableSaveButton = false, getData }: ExpandoFormProps, ref : any) => {

  // forward to parent the resetForm function by calling reset
  React.useImperativeHandle(ref, () => {
    return { getFormData : () => getFormData() }
  }, [])

  // ** UseForm
  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      expando: [{ value: '' }, { value: '' }, { value: '' }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'expando' // unique name for your Field Array
  })

  const handleAddMore = () => {
    append({
      value: ''
    })
  }

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(`SUBMIT ${pageHeader}`, data)
    {
      handleExpandoSubmit && handleExpandoSubmit(data)
    }
  }

  const getFormData = () => {
    const getFormValueData = getValues('expando')
    {
      return getFormValueData ? getFormValueData : {}
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h6' component='h2' align='center' sx={{ marginBottom: '1rem' }}>
            {pageHeader}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              {fields.map((field, index) => (
                <Grid key={field.id} item xs={12}>
                  <FormControl 
                    
                    fullWidth
                  >
                    <OutlinedInput
                      {...register(`expando.${index}.value`, {required : true})} 
                      error={Boolean(errors.expando)}
                      placeholder={`Option ${index + 1}`}
                      type={fileType}
                      endAdornment={
                        index >= 3 ? (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => { remove(index) }} onMouseDown={() => { remove(index) }}>
                              <Icon color='red' icon='mdi:close' />
                            </IconButton>
                          </InputAdornment>
                        ) : <></>
                      }
                    />
                  </FormControl>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box display='flex' justifyContent='space-evenly'>
                  <Button
                    disabled={isLoading ? true : false}
                    variant='contained'
                    color='info'
                    onClick={() => {
                      handleAddMore()
                    }}
                  >
                    Add More
                  </Button>
                  {
                    !disableSaveButton && 
                    <Button disabled={isLoading ? true : false} type='submit' variant='contained' color='primary'>
                    {isLoading ? <CircularProgress size={12} sx={{ mr: 2 }} /> : null} Save
                  </Button>
                  }
                  
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default React.forwardRef(ExpandoForm)
