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

const styles = {
  //Grid Content
  gridContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  titleWrapper: {
    border: '1px solid #000',
    width: 300,
    p: 1
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 17
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    border: '1px solid #000',
    cursor:"pointer",
    ":hover": {
      backgroundColor: (theme: any) => theme.palette.primary.main,
      opacity: 0.5,
      scale: 0.5,
      border: '1px solid',
      borderColor: (theme: any) => theme.palette.primary.main,
    }
  },
  uploadBtn: {
    backgroundColor: '#9747FF',
    width: 150,
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0'
    }
  },

  //Main
  ads: {
    textAlign: 'center',
    mb: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 25
  },
}

export default Advertisements
