import React, { useState } from 'react'
import { CircularProgress, Typography, Stack, Tabs, Tab  } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import AdvertisementService from "../../../services/api/AdvertisementService";
import AdvertisementModal from '../components/modal/AdvertisementModal';
import AdsContainer from '../components/ads/AdsContainer';

const TabPanel = ({ children, index, value}: any) => {
  return (
    <>
      {value === index && <Stack pt={4}>{children}</Stack>}
    </>
  )
}

const Advertisements = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true)

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  
  // FETCH ALL ADMIN ADVERTISEMENT
  const { getAllAdminAds } = AdvertisementService()
  const { isLoading, data} = useQuery({
    queryKey: ["allAdvertisement"],
    queryFn: () => getAllAdminAds({ data: { } }),
    onSuccess: (data) => { console.log("ADMIN ADS FETCHED", data) },
    onError: (error) => { console.log(error) }
  })

  return (
    <>
      <Typography mb={8} textTransform="uppercase" textAlign="center" fontWeight={600} variant="h5">Advertisements</Typography>
      <Stack flexDirection="row" justifyContent="center">
        <Tabs value={tabIndex} onChange={handleChange} variant="scrollable">
          <Tab label="Preloading" />
          <Tab label="Pop-Up" />
          <Tab label="Carousel" />
          <Tab label="Banner" />
          <Tab label="Video-Grid" />
        </Tabs>
      </Stack>
      {isLoading ?
        <TabPanel value={0} index={0}>
          <Stack my={40} alignSelf="center">
            <CircularProgress />
          </Stack>
        </TabPanel>
        :
        data.map((item: any, index: any) =>
          <TabPanel value={tabIndex} index={index} key={index}>
            <AdsContainer
              containerID={item._id}
              type={item.type}
              openModal={handleOpen}
              data={index === 4 ? item.gif : item.banners}
            />
          </TabPanel>
        )
      }
      <AdvertisementModal
        isOpen={open}
        onClose={handleClose}
      />
    </>
  )
}

export default Advertisements