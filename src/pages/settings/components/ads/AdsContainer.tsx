import React, { useState } from 'react'
import { Box, Grid, Typography, ImageList, Button } from '@mui/material'
import AdsItem from './AdsItem'

type Props = {
  data: []
  openModal: () => void
  type: string
}

const AdsContainer = (props: Props) => {
  const [newTemplate, setNewTemplate] = useState([1])

  let customWidht = 0
  let customHeight = 0
  let customName = ""

  if (props.type === "fullscreen_banner") { customHeight = 400; customWidht = 300; customName = "Pre-Loading" }
  else if (props.type === "popup_banner") { customHeight = 300; customWidht = 300; customName = "Pop-Up" }
  else if (props.type === "carousel_banner") { customHeight = 75; customWidht = 300; customName = "Carousel" }
  else if (props.type === "single_banner") { customHeight = 75; customWidht = 300; customName = "Banner" }
  else if (props.type === "multiple_random_gif") { customHeight = 170; customWidht = 300; customName = "Video-Grid" }

  return (
    <Grid item xs={6} md={4} sx={styles.gridContentWrapper}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>{customName}</Typography>
      </Box>
      <ImageList cols={1} rowHeight={customHeight} sx={{ maxHeight: 400 }}>
        {props.data.map((item: any, index: any) =>
          <AdsItem
            key={index}
            photoURL={item.photo_url}
            openModal={props.openModal}
            adsURL={item.url}
            startDate={item.start_date}
            endDate={item.end_date}
            isHidden={item.hidden}
            itemWidth={customWidht}
            itemHeight={customHeight}
            itemName={customName}
          />
        )}
        {newTemplate.map((item: any, index: any) =>
          <AdsItem
            key={index}
            photoURL={null}
            adsURL={null}
            openModal={props.openModal}
            startDate={new Date()}
            endDate={new Date()}
            isHidden={false}
            itemWidth={customWidht}
            itemHeight={customHeight}
            itemName={customName}
          />
        )}
        <Button sx={{ mt: 4 }} variant="contained" onClick={() => setNewTemplate(prev => [...prev].concat([1]))}>ADD MORE</Button>
      </ImageList>
    </Grid>
  )
}

export default AdsContainer

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