import { OutlinedInput, InputAdornment, IconButton, Stack, Tooltip } from '@mui/material';
import Icon from 'src/@core/components/icon'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  newInputs: string[]
  index: number
  setNewInputs: Dispatch<SetStateAction<string[]>>
}

const NewFQDNLinkInput = (props: Props) => {
  const { newInputs, index, setNewInputs } = props
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

  const deleteInput = () => {
    console.log("WIP")
  }

  return (
    <Stack position='relative'>
      <OutlinedInput
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
            <Tooltip title="Remove">
              <IconButton edge='end' sx={{ '&:hover': { color: "red" } }} onClick={deleteInput}>
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