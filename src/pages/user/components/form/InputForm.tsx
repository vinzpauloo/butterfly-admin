import { Box, MenuItem, TextField, Typography, InputAdornment } from '@mui/material'
import React, { KeyboardEventHandler } from 'react'
import { Controller } from 'react-hook-form'

interface TextFieldVariant {
  variant?: 'standard' | 'filled' | 'outlined'
}

interface InputFormProps extends TextFieldVariant {
  controllerName: string
  control: any
  label?: string
  fullWidth?: boolean
  error?: boolean
  helperText?: string | undefined
  name: string
  type?: string | undefined
  width?: string | number
  marginTop?: number
  onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined
  multiline?: boolean
  rows?: number
  isDropdown?: string[]
  isImage?: boolean
  imageStateVariable?: React.Dispatch<React.SetStateAction<string>>
  imageRef?: React.LegacyRef<HTMLInputElement> | undefined
  imageFileName?: any
  imageOnClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const InputForm: React.FC<InputFormProps> = ({
  controllerName,
  control,
  label,
  fullWidth,
  error,
  variant,
  helperText,
  name,
  type,
  width,
  marginTop,
  onKeyPress,
  multiline,
  rows,
  isDropdown,
  isImage,
  imageStateVariable,
  imageRef,
  imageFileName,
  imageOnClick
}) => {
  return (
    <Box width={width} mt={marginTop}>
      {isImage ? (
        <Controller
          name={controllerName}
          control={control}
          render={({ field }) => (
            <>
              <input
                type='file'
                accept='.jpg, .jpeg, .png'
                style={{ display: 'none' }}
                name={name}
                id='logo'
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    if (imageStateVariable !== undefined) {
                      imageStateVariable(e.target.files[0].name)
                    }
                    field.onChange(e.target.files[0])
                  } else {
                    field.onChange(null)
                  }
                }}
                ref={imageRef}
              />
              <label htmlFor='logo'>
                <TextField
                  value={imageFileName}
                  placeholder='Select a file'
                  variant='outlined'
                  fullWidth
                  onClick={imageOnClick}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Box sx={styles.upload}>
                          <Typography color='#FFF'>UPLOAD</Typography>
                        </Box>
                      </InputAdornment>
                    )
                  }}
                />
              </label>
            </>
          )}
        />
      ) : (
        <Controller
          name={controllerName}
          control={control}
          render={({ field }) =>
            isDropdown ? (
              <TextField
                select
                label={label}
                variant={variant}
                fullWidth={fullWidth}
                error={error}
                helperText={helperText}
                value={field.value || ''}
                onChange={field.onChange}
                name={name}
                type={type}
                onKeyPress={onKeyPress}
                multiline={multiline}
                rows={rows}
              >
                {isDropdown?.map((item: any, index) => (
                  <MenuItem key={index} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                    <Typography sx={{ textTransform: 'uppercase' }}>{item?.name}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                label={label}
                variant={variant}
                fullWidth={fullWidth}
                error={error}
                helperText={helperText}
                defaultValue={field.value}
                onChange={field.onChange}
                name={name}
                type={type}
                onKeyPress={onKeyPress}
                multiline={multiline}
                rows={rows}
              />
            )
          }
        />
      )}
    </Box>
  )
}

const styles = {
  upload: {
    backgroundColor: '#979797',
    padding: '8px 12px 8px 12px',
    borderRadius: '5px'
  }
}

export default InputForm
