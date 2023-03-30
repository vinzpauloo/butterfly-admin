import React from 'react'
import { Box, Grid, Typography, ImageList, ImageListItem, styled } from '@mui/material'
import { adsGlobalStore } from "../../../../zustand/adsGlobalStore";

type Props = {
  data: any
  openModal: () => void
}

const PopupAds = (props: Props) => {
  const PopupAdsWidth = 300
  const PopupAdsHeight = 300

  // subscribe to ads global store
  const [
    setAdsCategory,
    setAdsWidth,
    setAdsHeight,
    setAdsPhotoURL,
    setAdsLink,
    setAdsStartDate,
    setAdsEndDate,
  ] = adsGlobalStore((state) => [
    state.setAdsCategory,
    state.setAdsWidth,
    state.setAdsHeight,
    state.setAdsPhotoURL,
    state.setAdsLink,
    state.setAdsStartDate,
    state.setAdsEndDate,
  ]);

  const openPopupAdsModal = () => {
    setAdsCategory("Pop-Up")
    setAdsWidth(PopupAdsWidth)
    setAdsHeight(PopupAdsHeight)
    setAdsPhotoURL(props.data?.photo_url)
    setAdsLink(props.data?.url)
    setAdsStartDate(new Date(props.data?.start_date))
    setAdsEndDate(new Date(props.data?.end_date))
    props.openModal()
  }

  return (
    <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>Pop-Up</Typography>
      </Box>
      <ImageList cols={1}>
        <ImageListItem onClick={openPopupAdsModal} sx={styles.imgWrapper} style={{ width: PopupAdsWidth, height: PopupAdsHeight }}>				
          <Img src={props.data?.photo_url} style={{ width: PopupAdsWidth, height: PopupAdsHeight, objectFit: "cover" }} alt='template icon' />
        </ImageListItem>
      </ImageList>
    </Grid>
  )
}

export default PopupAds

const Img = styled('img')({
  objectFit: "cover",
  "&:hover": { opacity: 0.5 }
})

const styles = {
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
    cursor: "pointer",
    backgroundColor: '#D9D9D9',
    ":hover": {
      backgroundColor: (theme: any) => theme.palette.primary.main,
    }
  },
}