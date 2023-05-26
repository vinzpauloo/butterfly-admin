// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { CircularProgress, Typography, Stack, Tabs, Tab, Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// ** Project/Other Imports
import AdvertisementModal from '../components/modal/AdvertisementModal'
import AdsContainer from '../components/ads/AdsContainer'

// ** Hooks/Services Imports
import AdvertisementService from '@/services/api/AdvertisementService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { useTranslateString } from '@/utils/TranslateString'

const TabPanel = ({ children, index, value }: any) => {
  return <>{value === index && <Stack pt={4}>{children}</Stack>}</>
}

const Advertisements = () => {
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()
  const [data, setData] = useState<any []>()
  const [open, setOpen] = useState(false)
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const { getAllAdminAds } = AdvertisementService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['allAdvertisement', selectedLanguage],
    queryFn: () => getAllAdminAds({ data: { language: selectedLanguage } }),
    onSuccess: data => {
      setData(data)
      console.log(data)
    },
    onError: (e: any) => {
      handleError(e, `getAllAdminAds() ads.tsx Advertisements`)
    }
  })

  return (
    <Stack alignItems='center'>
      <Stack direction='row' alignItems='flex-end' gap={4}>
        <Typography textTransform='uppercase' textAlign='center' fontWeight={600} variant='h5'>
          {TranslateString('Advertisement')}
        </Typography>
        <Box sx={{ width: 200 }}>
          {/* <Typography>Language</Typography> */}
          <Select
            size='small'
            fullWidth value={selectedLanguage}
            onChange={(event: SelectChangeEvent) => setSelectedLanguage(event.target.value)}
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='zh_cn'>中国語</MenuItem>
          </Select>
        </Box>
      </Stack>
      <Stack flexDirection='row' justifyContent='center'>
        <Tabs value={tabIndex} onChange={handleChange} variant='scrollable'>
          <Tab label={TranslateString('Preloading')} />
          <Tab label={TranslateString('Pop-Up')} />
          <Tab label={TranslateString('Carousel')} />
          <Tab label={TranslateString('Banner')} />
          <Tab label={TranslateString('Video-Grid')} />
        </Tabs>
      </Stack>
      {isLoading || isFetching ? 
        <TabPanel value={0} index={0}>
          <Stack my={40} alignSelf='center'>
            <CircularProgress />
          </Stack>
        </TabPanel>
       : 
        data?.map((item: any, index: any) => (
          <TabPanel value={tabIndex} index={index} key={index}>
            <AdsContainer
              containerID={item._id}
              type={item.type}
              openModal={() => setOpen(true)}
              data={index === 4 ? item.gif : item.banners}
            />
          </TabPanel>
        ))
      }
      <AdvertisementModal isOpen={open} onClose={() => setOpen(false)} />
    </Stack>
  )
}

Advertisements.acl = {
  action: 'read',
  subject: 'sa-page'
}

export default Advertisements
