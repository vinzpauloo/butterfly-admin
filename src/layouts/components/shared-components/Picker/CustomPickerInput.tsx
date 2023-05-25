// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

interface PickerProps {
  label?: string
  readOnly?: boolean
  customwidth?: string
  customSize?: 'small' | 'medium'
}

const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
  // ** Props
  const { label, readOnly, customwidth, customSize } = props

  return (
    <TextField
      size={customSize}
      inputRef={ref}
      {...props}
      label={label || ''}
      {...(readOnly && { inputProps: { readOnly: true } })}
      sx={{ width: customwidth }}
      // ** Input Props being used in Settings
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <CalendarMonthIcon />
          </InputAdornment>
        )
      }}
    />
  )
})

export default PickersComponent
