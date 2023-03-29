import React, { useState } from 'react'
import { CircularProgress, Grid, Typography, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import AdvertisementService from "../../../services/api/AdvertisementService";
import PreloadingAds from '../components/ads/PreloadingAds';
import PopupAds from '../components/ads/PopupAds';
import CarouselAds from '../components/ads/CarouselAds';
import BannerAds from '../components/ads/BannerAds';
import VideoGridAds from '../components/ads/VideoGridAds';
import AdvertisementModal from '../components/modal/AdvertisementModal';

const Advertisements = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true)
  
  // FETCH ALL ADVERTISEMENT
  const { getAllAds } = AdvertisementService()
  const { isLoading, data} = useQuery({
    queryKey: ["allAdvertisement"],
    queryFn: () => getAllAds({ data: {  } }),
    onSuccess: (data) => {
      console.log("ADS:", data)
    },
    onError: (error) => { console.log(error) }
  })

  return (
    <>
      <Typography mb={8} textTransform="uppercase" textAlign="center" fontWeight={600} variant="h5">Advertisements</Typography>
      <Grid gap={5} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="center" alignItems={{ xs: "center", md: "flex-start" }}>
        {isLoading ? 
          <Stack my={24}>
            <CircularProgress />
          </Stack>
        :
          <>
            <PreloadingAds openModal={handleOpen} data={data[0]?.banners} />
            <PopupAds openModal={handleOpen} data={data[1]?.banners} />
            <CarouselAds openModal={handleOpen} data={data[2]?.banners} />
            <BannerAds openModal={handleOpen} data={data[3]?.banners} />
            <VideoGridAds openModal={handleOpen} data={data[4]?.gif} />
          </>
        }                
      </Grid>
      <AdvertisementModal
        isOpen={open}
        onClose={handleClose}
      />
    </>
  )
}

export default Advertisements