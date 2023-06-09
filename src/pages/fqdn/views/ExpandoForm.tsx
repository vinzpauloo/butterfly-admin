// ** React Imports
import React from 'react'

// ** MUI Imports
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
  pageHeader?: string
  fileType: string
  handleExpandoSubmit?: (data: FormInputs) => void
  isLoading?: boolean
  disableSaveButton?: boolean
  defaultValues?: FormInputs
  multipleInputs?: boolean
  onUpdate?: (data: { value: string }[]) => void
}

type FormInputs = {
  expando: {
    value: string
  }[]
}

const ExpandoForm = (
  {
    pageHeader,
    fileType,
    handleExpandoSubmit,
    isLoading = false,
    disableSaveButton = false,
    defaultValues = {
      expando: [{ value: '' }, { value: '' }, { value: '' }]
    },
    multipleInputs,
    onUpdate
  }: ExpandoFormProps,
  ref: any
) => {
  // ** UseForm
  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues
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

    return getFormValueData ? getFormValueData : []
  }

  React.useImperativeHandle(
    ref,
    () => {
      const formData = getFormData()
      if (onUpdate !== undefined) {
        onUpdate(formData)
      }

      return { getFormData: () => formData }
    },
    [getFormData]
  )

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h6' component='h2' align='center' sx={{ marginBottom: '1rem' }}>
            {pageHeader}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid className='expandoGrid' container spacing={5}>
              {fields.map((field, index) => (
                <Grid key={field.id} item xs={12}>
                  <FormControl fullWidth>
                    <OutlinedInput
                      sx={{
                        width: '100%'
                      }}
                      className='expandoInput'
                      {...register(`expando.${index}.value`, { required: true })}
                      error={Boolean(errors.expando)}
                      placeholder={`Option ${index + 1}`}
                      type={fileType}
                      endAdornment={
                        index >= 3 ? (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => {
                                remove(index)
                              }}
                              onMouseDown={() => {
                                remove(index)
                              }}
                            >
                              <Icon color='red' icon='mdi:close' />
                            </IconButton>
                          </InputAdornment>
                        ) : (
                          <></>
                        )
                      }
                    />
                  </FormControl>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box display='flex' justifyContent='space-evenly'>
                  {multipleInputs && (
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
                  )}
                  {!disableSaveButton && (
                    <Button disabled={isLoading ? true : false} type='submit' variant='contained' color='primary'>
                      {isLoading ? <CircularProgress size={12} sx={{ mr: 2 }} /> : null} Save
                    </Button>
                  )}
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
