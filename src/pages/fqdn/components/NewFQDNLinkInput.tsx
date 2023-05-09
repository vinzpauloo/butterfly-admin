import { OutlinedInput, InputAdornment, IconButton, Stack, CircularProgress, Tooltip } from '@mui/material';
import Icon from 'src/@core/components/icon'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  newInputs: string[]
  index: number
  isLoading: boolean
  setNewInputs: Dispatch<SetStateAction<string[]>>
}

const NewFQDNLinkInput = (props: Props) => {
  const { newInputs, index, isLoading, setNewInputs } = props
  const [inputValue, setInputValue] = useState<string>('')
  const [inputError, setInputError] = useState<boolean>(false)

  const handleItemStateChange = (val: string) => {
    const newItemStates = [...newInputs];
    newItemStates[index] = val;
    setNewInputs(newItemStates);
  }

  const isValidUrl = (string: string) => {
    try { new URL(string); setInputError(false) }
    catch (err) { setInputError(true) }
  }

  return (
    <Stack position='relative'>
      {isLoading && <CircularProgress size={24} sx={{ position: 'absolute', margin: 'auto', top: 0, left: 0, right: 0, bottom: 0 }} />}
      <OutlinedInput
        sx={isLoading ? { opacity: 0.5 } : undefined}
        disabled={isLoading}
        onPasteCapture={(event: React.ClipboardEvent) => {
          handleItemStateChange(event.clipboardData.getData('text'))
          isValidUrl(event.clipboardData.getData('text'))
        }}
        type='url'
        autoFocus
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
          handleItemStateChange(event.target.value)
          isValidUrl(event.target.value)
        }}
        error={inputError}
        placeholder='new link'
        endAdornment={
          <InputAdornment position='end'>
            <Tooltip title="Delete">
              <IconButton edge='end' disabled={isLoading} sx={{ '&:hover': { color: "red" } }} onClick={() => {
                setNewInputs((item: any) => item.filter((_: string, index: number) => index !== 0));
              }}>
                <Icon icon='mdi:close' />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
    </Stack>
  )
}

export default NewFQDNLinkInput