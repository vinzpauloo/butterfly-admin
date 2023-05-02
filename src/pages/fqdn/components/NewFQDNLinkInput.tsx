import { OutlinedInput, InputAdornment, IconButton, Stack, CircularProgress } from '@mui/material';
import Icon from 'src/@core/components/icon'
import React, { useState } from 'react'

type Props = {
  newInputs: any[]
  index: number
  isLoading: boolean
  setNewInputs: (_: any) => void
}

const NewFQDNLinkInput = (props: Props) => {
  const { newInputs, index, isLoading, setNewInputs } = props
  const [inputValue, setInputValue] = useState<string>('')

  const handleItemStateChange = (val: string) => {
    const newItemStates = [...newInputs];
    newItemStates[index] = val;
    setNewInputs(newItemStates);
  }

  return (
    <Stack position='relative'>
      {isLoading && <CircularProgress size={24} sx={{ position: 'absolute', margin: 'auto', top: 0, left: 0, right: 0, bottom: 0 }} />}
      <OutlinedInput
        sx={isLoading ? { opacity: 0.5 } : undefined}
        disabled={isLoading}
        onPasteCapture={(event: React.ClipboardEvent) => {
          handleItemStateChange(event.clipboardData.getData('text'))
        }}
        type='url'
        autoFocus
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
          handleItemStateChange(event.target.value)
        }}
        error={false}
        placeholder='new link'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton edge='end' disabled={isLoading} onClick={() => {
              setNewInputs((_: any) => _.filter((_: any, index: any) => index !== 0));
            }}>
              <Icon fontSize={20} icon='mdi:delete-outline' />
            </IconButton>
          </InputAdornment>
        }
      />
    </Stack>
  )
}

export default NewFQDNLinkInput