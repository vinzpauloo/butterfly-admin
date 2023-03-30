import React, { useState } from 'react'
import { Box, Grid, Typography, ImageList, ImageListItem, Button, Switch, Stack, styled } from '@mui/material'
import { adsGlobalStore } from "../../../../zustand/adsGlobalStore";
import Image from 'next/image'

type Props = {
  data: []
  openModal: () => void
}

const CarouselAds = (props: Props) => {
  const [newTemplate, setNewTemplate] = useState([1])

  return (
    <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>Carousel</Typography>
      </Box>
      <ImageList cols={1} rowHeight={75} sx={{ maxHeight: 400 }}>
        {props.data.map((item: any, index: any) =>
          <CarouselAdItem
            key={index}
            photoURL={item.photo_url}
            openModal={props.openModal}
            adsURL={item.url}
            startDate={item.start_date}
            endDate={item.end_date}
            isHidden={item.hidden}
          />)}
        {newTemplate.map((item: any, index: any) => 
          <CarouselAdItem
            key={index}
            photoURL={null}
            adsURL={null}
            openModal={props.openModal}
            startDate={new Date()}
            endDate={new Date()}
            isHidden={false}
          />
        )}
        <Button sx={{ mt: 4 }} variant="contained" onClick={() => setNewTemplate(prev => [...prev].concat([1]))}>ADD MORE</Button>
      </ImageList>
    </Grid>
  )
}

const CarouselAdItem = ({ openModal, photoURL, adsURL, startDate, endDate, isHidden }: any) => {

  // change later to onClick instead and POST
  const [isActive, setIsActive] = useState(!isHidden)
  const CarouselAdsWidth = 300
  const CarouselAdsHeight = 75

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

  const openCarouselAdsModal = () => {
    setAdsCategory("Carousel")
    setAdsWidth(CarouselAdsWidth)
    setAdsHeight(CarouselAdsHeight)
    setAdsPhotoURL(photoURL)
    setAdsLink(adsURL)
    setAdsStartDate(new Date(startDate))
    setAdsEndDate(new Date(endDate))
    openModal()
  }

  return (
    <Stack>
      <Switch checked={isActive} sx={{ alignSelf: "flex-end" }} onChange={event => { setIsActive(event.target.checked) }} />
      <ImageListItem onClick={openCarouselAdsModal} sx={imgWrapper} style={{ width: CarouselAdsWidth, height: CarouselAdsHeight, marginBottom: 12 }}>
        {photoURL === null ?
          <Image
            src={'/images/icons/butterfly-template-icon.png'}
            width={50}
            height={50}
            alt='template icon'
            style={{ objectFit: "fill" }}
          /> : <Img sx={isActive ? { opacity: 1 } : { opacity: 0.25 }} src={photoURL} alt='template icon' />}
      </ImageListItem>
    </Stack>
  )
}

export default CarouselAds

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
}

const Img = styled('img')({
  height: 75,
  width: 300,
  objectFit: "cover",
  "&:hover": {opacity:0.5}
})

const imgWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: "pointer",
  backgroundColor: '#D9D9D9',
  ":hover": {
    backgroundColor: (theme: any) => theme.palette.primary.main,
  }
}