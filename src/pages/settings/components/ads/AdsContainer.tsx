import React from 'react'
import { ImageList, Button, Stack } from '@mui/material'
import AdsItem from './AdsItem'
import { adsGlobalStore } from '../../../../zustand/adsGlobalStore'

type Props = {
  containerID: string
  data: []
  openModal: () => void
  type: string
}

const AdsContainer = (props: Props) => {

  // subscribe to ads global store
  const [
    setIsCreatingNewAds,
    setAdsCategory,
    setAdsWidth,
    setAdsHeight,
    setContainerID,
  ] = adsGlobalStore((state) => [
    state.setIsCreatingNewAds,
    state.setAdsCategory,
    state.setAdsWidth,
    state.setAdsHeight,
    state.setContainerID,
  ]);

  let customWidht = 0
  let customHeight = 0
  let customName = ""

  if (props.type === "fullscreen_banner") { customHeight = 650; customWidht = 475; customName = "Pre-Loading" }
  else if (props.type === "popup_banner") { customHeight = 475; customWidht = 475; customName = "Pop-Up" }
  else if (props.type === "carousel_banner") { customHeight = 150; customWidht = 475; customName = "Carousel" }
  else if (props.type === "single_banner") { customHeight = 150; customWidht = 475; customName = "Banner" }
  else if (props.type === "multiple_random_gif") { customHeight = 250; customWidht = 475; customName = "Video-Grid" }

  const openModalCreatingNewAds = () => {
    setAdsCategory(customName)
    setAdsWidth(customWidht / 1.25)
    setAdsHeight(customHeight / 1.25)
    setIsCreatingNewAds(true)
    setContainerID(props.containerID)
    props.openModal()
  }

  return (
    <Stack sx={styles.gridContentWrapper}>
      <ImageList cols={1} rowHeight={customHeight} sx={{ maxHeight: 650}} >
        {props.data.map((item: any, index: any) =>
          <AdsItem
            containerID={props.containerID}
            adsID={item._id}
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
        <Button sx={{ mt: 4 }} variant="contained" onClick={openModalCreatingNewAds}>ADD MORE</Button>
      </ImageList>
    </Stack>
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