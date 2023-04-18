// ** React Imports
import React, { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Third Party Components
import { useForm } from 'react-hook-form'
import { useTranslateString } from '@/utils/TranslateString';

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogNotesProps = {
    states: {
        open : boolean
        toggle : () => void
        outterHandleSubmit : ( data : any ) => void // note data
        isLoading : boolean
    }
}


const DialogNotes = ({ states }: DialogNotesProps) => {
  // ** States
  const [noteValue, setNoteValue] = useState<string>('')


  const handleNoteOnChange = (value: string) => {
    if (value.length <= 0) {
      setError('notes', { type: 'custom' })
    } else {
      clearErrors()
    }
    setNoteValue(value)
  }

  const setNoteError = () => {
    setError('notes', { type: 'custom' })
  }

  const handleNoteDialogClose = () => {
    resetField('notes')
    states.toggle()
  }

  // ** React hook form
  const {
    resetField,
    setError,
    watch,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues : {
        notes : ''
    }
  })

  const onSubmitNote = async (data : any) => {

    // TO CONFIRM DECLINE OF WORK
    let note = watch('notes')
    if (note.length == 0) {
      setNoteError()
      return
    } else {
        console.log("SUBMIT AND DECLINE")
        let callAfter = await states.outterHandleSubmit(data)
        resetField('notes')
        setNoteValue('')
    }
  }

  const TranslateString = useTranslateString()

  return (
    <>
      <Dialog
        maxWidth='sm'
        scroll='body'
        TransitionComponent={Transition}
        open={states.open}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <form onSubmit={handleSubmit(onSubmitNote)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {errors.notes && (
                  <Alert sx={{ mb: 5 }} severity='error'>
                    Cannot leave an empty note
                  </Alert>
                )}
                <TextField
                  {...register('notes')}
                  value={noteValue} //should be a state
                  onChange={event => handleNoteOnChange(event.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                  label={TranslateString('Note')}
                  placeholder={TranslateString("Don't leave the note blank...")}
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon='mdi:message-outline' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid display='flex' justifyContent='center' alignItems='center' item xs={12}>
                <Button
                  disabled={errors.notes || states.isLoading ? true : false}
                  sx={{ marginInline: 'auto' }}
                  type='submit'
                  variant='contained'
                  size='large'
                >
                  {states.isLoading  ? <CircularProgress sx={{ mr: 3 }} size={13} color='secondary' /> : null} {TranslateString("Submit Note")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogNotes
