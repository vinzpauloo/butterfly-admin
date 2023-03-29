import React from 'react'
import { Box, Grid, Typography, ImageList, ImageListItem } from '@mui/material'

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
    backgroundColor: '#D9D9D9',
    border: '1px solid #000',
    cursor: "pointer",
    ":hover": {
      backgroundColor: (theme: any) => theme.palette.primary.main,
      opacity: 0.5,
      scale: 0.5,
      border: '1px solid',
      borderColor: (theme: any) => theme.palette.primary.main,
    }
  },
}