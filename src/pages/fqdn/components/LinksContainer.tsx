import { Box, Button, Typography, Card, CardContent, IconButton, CircularProgress, OutlinedInput, InputAdornment, Stack } from '@mui/material'
import Icon from 'src/@core/components/icon'
import React, { useState } from 'react'
import FQDNService from '@/services/api/FQDNService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type Props = {
  header: string
  isLoading: boolean
  data: any[]
}

const LinksContainer = (props: Props) => {
  const { header, isLoading, data } = props
  const [newInput, setNewInput] = useState<any>([])

  const addMoreTextField = () => {
    setNewInput((prev: any) => prev.concat([1]))
  }

  const { addFQDN, deleteFQDN } = FQDNService()
  const queryClient = useQueryClient()
  const { mutate: mutateAddFQDN, isLoading: addLoading } = useMutation(addFQDN, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['fqdns'] })
    },
    onError: error => { console.log(error) }
  })

  const { mutate: mutateDeleteFQDN, isLoading: deleteLoading } = useMutation(deleteFQDN, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['fqdns'] })
    },
    onError: error => { console.log(error) }
  })

  const addNewFQDNS = () => {
    // ALL THE ADDS - WIP
    mutateAddFQDN({
      data: {
        site: 1,
        name: 'https://www.wowBataLakiDede.com/42069',
        type: 'Api'
      }
    })
  }

  const deleteSpecifcFQDN = (id: number) => {
    mutateDeleteFQDN({
      fqdnID: id
    })
  }

  const isTrulyLoading = isLoading || addLoading || deleteLoading

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' component='h2' align='center' sx={{ marginBottom: '1rem' }}>{header}</Typography>
        <Stack gap={4} position='relative'>
          {isTrulyLoading && <CircularProgress sx={{position:'absolute', margin: 'auto' ,top:0, left: 0, right: 0, bottom: 0}} /> }
          {data.map((item: any, index: any) => 
            <Stack key={index} position='relative' sx={isTrulyLoading? {opacity: 0.5}: undefined}>
              <OutlinedInput
                disabled={deleteLoading}
                value={item?.name}
                key={item?.id}
                error={false}
                placeholder='default'
                endAdornment={index > 2 ?
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={() => deleteSpecifcFQDN(item?.id)} sx={{'&:hover':{color: "red"}}}>
                      <Icon fontSize={20} icon='mdi:delete-outline' />
                    </IconButton>
                  </InputAdornment>: undefined
                }
                />
            </Stack>
          )}
          {newInput.map((item: any, index: any) =>
            <Stack key={index} position='relative'>
              <OutlinedInput
                error={false}
                placeholder='new link'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={() => {
                      setNewInput((_: any) => _.filter((_: any, index: any) => index !== 0));
                    }}>
                      <Icon fontSize={20} icon='mdi:delete-outline' />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
          )}
          <Box display='flex' justifyContent='center' gap={6}>
            <Button disabled={isLoading} variant='contained' color='info' onClick={addMoreTextField}>Add More</Button>
            <Button disabled={isLoading} type='submit' variant='contained' color='primary' onClick={addNewFQDNS}>Save</Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LinksContainer