import React, { useState } from 'react'
import { IconButton, OutlinedInput, InputAdornment, Stack, CircularProgress } from '@mui/material'
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

  const isBeingUpdatedOrDeleted = isBeingUpdated || isBeingDeleted

  return (
    <Stack key={index} position='relative'>
      {isBeingUpdatedOrDeleted && <CircularProgress size={24} sx={{ position: 'absolute', margin: 'auto', top: 0, left: 0, right: 0, bottom: 0 }} />}
      <OutlinedInput
        sx={isBeingUpdatedOrDeleted ? { opacity: 0.5 } : inputValue !== name ? {outline: "1px solid yellow"} : undefined}
        disabled={isBeingUpdatedOrDeleted}
        value={inputValue}
        onPasteCapture={(event: React.ClipboardEvent) => {
          setInputValue(event.clipboardData.getData('text'))
          event.preventDefault()
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
        }}
        key={id}
        error={false}
        placeholder='default'
        endAdornment={
          <InputAdornment position='end'>
            {inputValue !== name && 
              <IconButton edge='end' onClick={updateSpecificFQDN} sx={{ '&:hover': { color: "green" }, mr: 0 }}>
                <Icon fontSize={20} icon='mdi:content-save-edit' />
              </IconButton>
            }
            {index > 2 &&
              <IconButton edge='end' onClick={() => deleteSpecifcFQDN(id)} sx={{ '&:hover': { color: "red" } }}>
                <Icon fontSize={20} icon='mdi:delete-outline' />
              </IconButton>
            }
          </InputAdornment>
        }
      />
    </Stack>
  )
}

export default ExistingFQDNLinkInput