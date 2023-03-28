// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Box, Grid, Typography, ImageList, ImageListItem, Button } from '@mui/material'

// ** Style Imports
import { styles } from '../styles/advertisementStyles'
import AdvertisementModal from '../components/modal/AdvertisementModal'

type GridContent = {
  title: string,
  width: number
  height: number
  url?: string
}

const carouselFakeData = [
  { url: "https://fastly.picsum.photos/id/326/300/75.jpg?hmac=xvxXZV1B2T-aGwUGlhbV98BZNYlrzw3Xv5o6twM1XYs"},
  { url: "https://fastly.picsum.photos/id/380/300/75.jpg?hmac=GWvfFPW0L_k3RZsjTY0HXfXB28iVGnu21uRKkpsPk8s"},
  { url: "https://fastly.picsum.photos/id/695/300/75.jpg?hmac=Q9eCcYH9ATzL0VgIzAYEN9lt5aI8p9qPf38tCly-Q6A"},
  { url: "https://fastly.picsum.photos/id/252/300/75.jpg?hmac=A1WLKna5szUbaYR0zaQL0SwI_q1V4qxVL201UW5Ba08"},
  { url: "https://fastly.picsum.photos/id/776/300/75.jpg?hmac=cI38GZeqExXEdrf4amnxJ_IAduZGN_llSVIAWvKTXhE"},
  { url: "https://fastly.picsum.photos/id/981/300/75.jpg?hmac=_k-mNVDefr6fwntEF4-Aq-8pt7ZJOA_9k0mKMgER3DA"},
  { url: "https://fastly.picsum.photos/id/827/300/75.jpg?hmac=HQq059k3H27sIlWcPjzDSpCtCZQuueoyOcXwT8kCQzs"},
]

const GridContent = (props: GridContent) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
  <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
    <Box sx={styles.titleWrapper}>
      <Typography sx={styles.title}>{props.title}</Typography>
    </Box>
      {props.title === "Carousel" ?
        <ImageList gap={8} sx={{ width: 300, maxHeight: 400, paddingBottom: 4}} cols={1} rowHeight={props.height}>
          {carouselFakeData.map((item, index) => (
            <ImageListItem onClick={handleOpen} key={index} sx={styles.imgWrapper}>
              {/* IF NO DATA */}
              {/* <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='template icon' /> */}
              <img src={item.url} alt='template icon' />
            </ImageListItem>
          ))}
          <Button variant="contained" color="primary">ADD MORE</Button>
        </ImageList>
        :
        <ImageListItem onClick={handleOpen}  sx={styles.imgWrapper} style={{height:props.height, width:props.width}}>
          {/* IF NO DATA */}
          {/* <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='template icon' /> */}
          <img src={props.url} alt='template icon' />
        </ImageListItem>
      }      
      <AdvertisementModal
        isOpen={openModal}
        onClose={handleClose}
        adTitle={props.title}
        width={props.width}
        height={props.height}
        url={props.url}
      />
  </Grid >
  )
}

const Advertisements = () => {
  const adsData = [
    {
      Adtitle: "Pre-Loading",
      width: 300, height: 400,
      url: "https://fastly.picsum.photos/id/992/300/400.jpg?hmac=X6DS9_-uNgb5bjdR6DMpOBq7HWiId73zayJXtxF8LDo"
    },
    {
      Adtitle: "Pop-Up",
      width: 300, height: 300,
      url: "https://fastly.picsum.photos/id/1013/300/300.jpg?hmac=ADRaBROV2SuVXk-QwUvw4FG5vlpClXwjwfCyu99TQbE"
    },
    { Adtitle: "Carousel", width: 300, height: 75 },
    {
      Adtitle: "Banner",
      width: 300, height: 75,
      url: "https://fastly.picsum.photos/id/965/300/75.jpg?hmac=uO4rmQDuRQp18disTdcBE_lZiHx1A3h6qDNXtvWFnTg"
    },
    {
      Adtitle: "Video-grid",
      width: 300, height: 170,
      url: "https://fastly.picsum.photos/id/727/300/170.jpg?hmac=4ANVVOqiP0RzyHeEN-ApfX1KnPds1C-VovJOPWMgggg"
    }
  ]

  return (
    <Box>
      <Typography sx={styles.ads}>Advertisements</Typography>
      <Grid gap={5} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="center" alignItems={{ xs: "center", md: "flex-start" }}>
        {adsData.map((item, index) => <GridContent width={item.width} height={item.height} title={item.Adtitle} key={index} url={item.url} />)}
      </Grid>
    </Box>
  )
}

export default Advertisements
