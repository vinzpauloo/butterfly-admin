import React from 'react'
import { Box, Grid, Typography, ImageList, ImageListItem } from '@mui/material'
import { styles } from '../../styles/advertisementStyles'

type Props = {
  data: any
  openModal: () => void
}

const PreloadingAds = (props: Props) => {

  return (
    <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>Pre-Loading</Typography>
      </Box>
      <ImageList cols={1}>
        <ImageListItem onClick={props.openModal} sx={styles.imgWrapper} style={{ width: 300, height: 400 }}>
          <img src={props.data?.photo_url} style={{ width: 300, height: 400, objectFit: "cover" }} alt='template icon' />
        </ImageListItem>
      </ImageList>
    </Grid>
  )
}

export default PreloadingAds