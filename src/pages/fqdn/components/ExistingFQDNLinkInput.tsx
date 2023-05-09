import React, { useState } from 'react'
import { IconButton, OutlinedInput, InputAdornment, Stack, CircularProgress, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'

type Props = {
  id: number
  name: string
  index: number
  type: 'Api' | 'Streaming' | 'Photo'
}

const ExistingFQDNLinkInput = (props: Props) => {
  const { id, name, index, type } = props
  const [inputValue, setInputValue] = useState<string>(name)
  const [inputError, setInputError] = useState<boolean>(false)

  const { deleteFQDN, updateFQDN } = FQDNService()
  const queryClient = useQueryClient()
  
  const { mutate: mutateUpdate, isLoading: isBeingUpdated } = useMutation(updateFQDN, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['fqdns'] })
    },
    onError: error => { console.log(error) }
  })

  const { mutate: mutateDelete, isLoading: isBeingDeleted } = useMutation(deleteFQDN, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['fqdns'] })
    },
    onError: error => { console.log(error) }
  })

  const updateSpecificFQDN = () => {
    inputError ? null : 
      mutateUpdate({
        fqdnID: id,
        data: {
          name: inputValue,
          type: type,
          _method: 'put'
        }
      })
  }

  const deleteSpecifcFQDN = (id: number) => {
    mutateDelete({
      fqdnID: id
    })
  }

  const isValidUrl = (string: string) => {
    try { new URL(string); setInputError(false) }
    catch (err) { setInputError(true) }
  }

  const isBeingUpdatedOrDeleted = isBeingUpdated || isBeingDeleted

  return (
    <Stack key={index} position='relative'>
      {isBeingUpdatedOrDeleted && <CircularProgress size={24} sx={{ position: 'absolute', margin: 'auto', top: 0, left: 0, right: 0, bottom: 0 }} />}
      <OutlinedInput
        sx={isBeingUpdatedOrDeleted ? { opacity: 0.5 } : undefined}
        disabled={isBeingUpdatedOrDeleted}
        value={inputValue}
        onPasteCapture={(event: React.ClipboardEvent) => {
          setInputValue(event.clipboardData.getData('text'))
          isValidUrl(event.clipboardData.getData('text'))
          event.preventDefault()
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
          isValidUrl(event.target.value)
        }}
        key={id}
        error={inputError}
        placeholder='default'
        endAdornment={
          <InputAdornment position='end'>
            {inputValue !== name && 
              <Tooltip title="Save Changes">
                <IconButton edge='end' onClick={updateSpecificFQDN} sx={{ '&:hover': { color: "green" }, mr: 0 }}>
                  <Icon icon='mdi:check' />
                </IconButton>
              </Tooltip>
            }
            {index > 2 &&
              <Tooltip title="Delete">
                <IconButton edge='end' onClick={() => deleteSpecifcFQDN(id)} sx={{ '&:hover': { color: "red" } }}>
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