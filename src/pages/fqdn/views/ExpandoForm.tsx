import React from 'react'

// ** MUI
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
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
}

type FormInputs = {
  expando: {
    value: string
  }[]
}

const ExpandoForm = ({ pageHeader, fileType, handleExpandoSubmit, isLoading = false }: ExpandoFormProps) => {
  // ** UseForm
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      expando: [{ value: '' }, { value: '' }, { value: '' }]
    }
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
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
                  <Button disabled={isLoading ? true : false} type='submit' variant='contained' color='primary'>
                    {isLoading ? <CircularProgress size={12} sx={{ mr: 2 }} /> : null} Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default ExpandoForm
