import { Box, Button, Typography, Card, CardContent, CircularProgress, Stack } from '@mui/material'
import React, { useState } from 'react'
import FQDNService from '@/services/api/FQDNService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/services/useAuth'
import NewFQDNLinkInput from './NewFQDNLinkInput'
import ExistingFQDNLinkInput from './ExistingFQDNLinkInput'

type Props = {
  type: 'Api' | 'Streaming' | 'Photo'
  isLoading: boolean
  data: any[]
}

const LinksContainer = (props: Props) => {
  const { type, isLoading: getLoading, data } = props
  const [newInputs, setNewInputs] = useState<any>([])
  const auth = useAuth()

  const addMoreTextField = () => {
    setNewInputs([...newInputs, ''])
  }

  const { addFQDN } = FQDNService()
  const queryClient = useQueryClient()
  const { mutate: mutateAddFQDN, isLoading: addLoading } = useMutation(addFQDN, {
    onSuccess: data => {
      console.log(data)      
      queryClient.invalidateQueries({ queryKey: ['fqdns'] })
      setNewInputs([])
    },
    onError: error => { console.log(error) },
  },)

  // NEXT TIME - WIP
  const isValidUrl = (string: string) => {
    try { 
      new URL(string)

      return true
    } catch (err) {
      return false
    }
  }

  const addNewFQDNS = () => {
    newInputs.map((item: string) =>
      mutateAddFQDN({
        data: {
          site: auth?.user?.site,
          name: item,
          type: type
        }
      })
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' component='h2' align='center' mb={4} textTransform='uppercase'>{type}</Typography>
        <Typography variant='subtitle2' color='primary' align='left' fontWeight={500} mb={4} textTransform='capitalize'>minimum 3 links</Typography>
        
        <Stack gap={4} position='relative' py={getLoading ? 12 : undefined}>
          {getLoading && <CircularProgress sx={{position:'absolute', margin: 'auto' ,top:0, left: 0, right: 0, bottom: 0}} /> }
          {data.map((item: any, index: any) => 
            <ExistingFQDNLinkInput key={item?.id} name={item?.name} id={item?.id} index={index} type={type} />           
          )}
          {newInputs.map((item: any, index: any) =>
            <NewFQDNLinkInput key={item?.id} newInputs={newInputs} index={index} setNewInputs={setNewInputs} isLoading={addLoading} />
          )}
          {!getLoading &&
            <Box display='flex' justifyContent='center' gap={6}>
              <Button disabled={getLoading} variant='contained' color='info' onClick={addMoreTextField}>Add More</Button>
              {newInputs.length > 0 && 
                <Button disabled={getLoading} type='submit' variant='contained' color='primary' onClick={addNewFQDNS}>Save</Button>
              }
            </Box>
          }
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LinksContainer