import { styled } from '@mui/system'
import { Switch } from '@mui/material'
import React from 'react'

interface ToggleBtnProps {
  onChange?: () => void
  width?: number
  height?: number
  padding?: number
  checked?: boolean
  onToggle?: (value: boolean) => void
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: '72px',
  height: '42px',
  '& .MuiSwitch-switchBase': {
    margin: theme.spacing(3.5),
    padding: 0,
    transform: 'translateX(-0.50px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(28px)',
      '& .MuiSwitch-thumb:before': {
        content: "'ON'"
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#60FF00'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    '&:before': {
      content: "'OFF'",
      fontSize: 6,
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 3,
      top: -2,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: 'black'
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#F03738',
    borderRadius: 20 / 2
  }
}))

const ToggleButton = ({ onChange, checked, onToggle, ...otherProps }: ToggleBtnProps) => {
  return (
    <StyledSwitch
      checked={checked}
      onChange={event => {
        const isChecked = event.target.checked
        if (isChecked) {
        }
        onChange?.()
        onToggle?.(isChecked)
      }}
      {...otherProps}
    />
  )
}

export default ToggleButton
