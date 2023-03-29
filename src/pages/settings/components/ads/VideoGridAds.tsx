import React, { useState } from 'react'
import { Box, Grid, Typography, ImageList, ImageListItem, Button, Stack, Switch, styled } from '@mui/material'

type Props = {
  data: []
  openModal: () => void
}

const VideoGridAds = (props: Props) => {
  return (
    <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>Video-grid</Typography>
      </Box>
      <ImageList cols={1} rowHeight={75} sx={{ maxHeight: 400 }}>
        {props.data.map((item: any, index: any) => <VideoGridAdItem key={index} photoURL={item.photo_url} openModal={props.openModal} />)}
        <Button sx={{ mt: 4 }} variant="contained">ADD MORE</Button>
      </ImageList>
    </Grid>
  )
}

const VideoGridAdItem = ({ openModal, photoURL }: any) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <Stack>
      <Switch checked={isActive} sx={{ alignSelf: "flex-end" }} onChange={event => { setIsActive(event.target.checked) }} />
      <ImageListItem onClick={openModal} sx={imgWrapper} style={{ width: 300, height: 170, marginBottom: 12 }}>
        <Img sx={isActive ? { opacity: 1 } : { opacity: 0.25 }} src={photoURL} alt='template icon' />
      </ImageListItem>
    </Stack>
  )
}

export default VideoGridAds

const Img = styled('img')({
  height: 170,
  width: 300,
  objectFit: "cover",
  cursor: "pointer",
  "&:hover": { opacity: 0.5 }
})

const imgWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#D9D9D9',
  ":hover": {
    backgroundColor: (theme: any) => theme.palette.primary.main,
  }
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
}