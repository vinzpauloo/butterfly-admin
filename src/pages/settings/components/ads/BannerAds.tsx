import React from 'react'
import { Box, Grid, Typography, ImageList, ImageListItem, styled } from '@mui/material'
import { adsGlobalStore } from "../../../../zustand/adsGlobalStore";

type Props = {
  data: any
  openModal: () => void
}

const BannerAds = (props: Props) => {
  const BannerAdsWidth = 300
  const BannerAdsHeight = 75

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

  const openBannerAdsModal = () => {
    setAdsCategory("Pop-Up")
    setAdsWidth(BannerAdsWidth)
    setAdsHeight(BannerAdsHeight)
    setAdsPhotoURL(props.data?.photo_url)
    setAdsLink(props.data?.url)
    setAdsStartDate(new Date(props.data?.start_date))
    setAdsEndDate(new Date(props.data?.end_date))
    props.openModal()
  }

  return (
    <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>Banner</Typography>
      </Box>
      <ImageList cols={1}>
        <ImageListItem onClick={openBannerAdsModal} sx={styles.imgWrapper} style={{ width: BannerAdsWidth, height: BannerAdsHeight }}>
          <Img src={props.data?.photo_url} style={{ width: BannerAdsWidth, height: BannerAdsHeight, objectFit: "cover" }} alt='template icon' />					
        </ImageListItem>
      </ImageList>
    </Grid>
  )
}

export default BannerAds

const Img = styled('img')({
  objectFit: "cover",
  "&:hover": { opacity: 0.5 }
})

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
    cursor: "pointer",
    backgroundColor: '#D9D9D9',
    ":hover": {
      backgroundColor: (theme: any) => theme.palette.primary.main,
    }
  },
}