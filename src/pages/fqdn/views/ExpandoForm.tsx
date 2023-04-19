import React from 'react'

// ** MUI
import { Box, Button, Grid, Typography, TextField, Card, CardContent } from '@mui/material'

// ** Third Party imports
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

type ExpandoFormProps = {
  pageHeader: string
  fileType: string
  handleExpandoSubmit? : (data : FormInputs) => void
}

type FormInputs = {
  expando: {
    value: string
  }[]
}

const ExpandoForm = ({ pageHeader, fileType, handleExpandoSubmit }: ExpandoFormProps) => {
  const { control, register, handleSubmit, formState : {errors} } = useForm<FormInputs>({
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
    { handleExpandoSubmit && handleExpandoSubmit( data ) }
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
                  <TextField
                    type={fileType}
                    fullWidth
                    placeholder={`Option ${index + 1}`}
                    error={Boolean(errors.expando)}
                    // important to include key with field's id
                    {...register(`expando.${index}.value`, {required : true})}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box display='flex' justifyContent='space-evenly'>
                  <Button
                    variant='contained'
                    color='info'
                    onClick={() => {
                      handleAddMore()
                    }}
                  >
                    Add More
                  </Button>
                  <Button type='submit' variant='contained' color='primary'>
                    Save
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
