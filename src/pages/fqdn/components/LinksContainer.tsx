import { Box, Button, Typography, Card, CardContent, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import NewFQDNLinkInput from './NewFQDNLinkInput'
import ExistingFQDNLinkInput from './ExistingFQDNLinkInput'

type Props = {
  type: 'Api' | 'Streaming' | 'Photo'
  isLoading: boolean
  data: string[]
  dataSetter: React.Dispatch<React.SetStateAction<string[]>>
  newData: string[]
  newDataSetter: React.Dispatch<React.SetStateAction<string[]>>
}

const LinksContainer = (props: Props) => {
  const { type, isLoading, data, dataSetter, newData, newDataSetter } = props

  const addMoreTextField = () => {
    newDataSetter([...newData, ''])
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' component='h2' align='center' mb={4} textTransform='uppercase'>{type}</Typography>
        <Typography variant='subtitle2' color='primary' align='left' fontWeight={500} mb={4} textTransform='capitalize'>minimum 3 links</Typography>
        <Stack gap={4} position='relative' py={isLoading ? 12 : undefined}>
          {isLoading && <CircularProgress sx={{position:'absolute', margin: 'auto', top:0, left: 0, right: 0, bottom: 0}} /> }
          {data.map((item: string, index: number) => 
            item !== null && <ExistingFQDNLinkInput key={index} name={item} index={index} data={data} dataSetter={dataSetter} />           
          )}
          {newData.map((item: string, index: number) =>
            item !== null && <NewFQDNLinkInput key={index} newInputs={newData} index={index} setNewInputs={newDataSetter} />
          )}
          {!isLoading &&
            <Box display='flex' justifyContent='center' gap={6}>
              <Button disabled={isLoading} variant='contained' color='info' onClick={addMoreTextField}>Add More</Button>
            </Box>
          }
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LinksContainer