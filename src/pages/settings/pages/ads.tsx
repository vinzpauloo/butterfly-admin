import React, { useState } from 'react'
import { CircularProgress, Grid, Typography, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import AdvertisementService from "../../../services/api/AdvertisementService";
import AdvertisementModal from '../components/modal/AdvertisementModal';
import AdsContainer from '../components/ads/AdsContainer';

const Advertisements = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true)
  
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
      <Grid gap={4} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="center" alignItems={{ xs: "center", md: "flex-start" }}>
        {isLoading ? 
          <Stack my={24}>
            <CircularProgress /> 
          </Stack>
        :
        data.map((item: any, index: any) =>
          <AdsContainer
            key={index}
            type={item.type}
            openModal={handleOpen}
            data={index === 4 ? item.gif : item.banners}
          />)
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