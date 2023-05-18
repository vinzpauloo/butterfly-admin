import React, { useState } from 'react'
import { IconButton, OutlinedInput, InputAdornment, Stack, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'

type Props = {
  name: string
  index: number
  data: string[]
  dataSetter: React.Dispatch<React.SetStateAction<string[]>>
}

const ExistingFQDNLinkInput = (props: Props) => {
  const { name, index, data, dataSetter } = props
  const [inputValue, setInputValue] = useState<string>(name)
  const [inputError, setInputError] = useState<boolean>(false)

  const handleItemStateChange = (val: string) => {
    const newItemStates = [...data];
    newItemStates[index] = val;
    dataSetter(newItemStates);
  }

  const isValidUrl = (string: string) => {
    try { new URL(string); setInputError(false) }
    catch (err) { setInputError(true) }
  }

  const deleteInput = () => {
    console.log("WIP")
  }

  return (
    <Stack key={index} position='relative'>
      <OutlinedInput
        value={inputValue}
        onPasteCapture={(event: React.ClipboardEvent) => {
          setInputValue(event.clipboardData.getData('text'))
          isValidUrl(event.clipboardData.getData('text'))
          handleItemStateChange(event.clipboardData.getData('text'))
          event.preventDefault()
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
          isValidUrl(event.target.value)
          handleItemStateChange(event.target.value)
        }}
        error={inputError}
        placeholder='default'
        endAdornment={
          <InputAdornment position='end'>
            {index > 2 &&
              <Tooltip title="Remove">
                <IconButton edge='end' sx={{ '&:hover': { color: "red" } }} onClick={deleteInput}>
                  <Icon icon='mdi:close' />
                </IconButton>
              </Tooltip>
            }
          </InputAdornment>
        }
      />
    </Stack>
  )
}

export default ExistingFQDNLinkInput