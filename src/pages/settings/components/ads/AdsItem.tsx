import React, { useState } from 'react'
import { ImageListItem, Switch, Stack, styled } from '@mui/material'
import { adsGlobalStore } from "../../../../zustand/adsGlobalStore";
import Image from 'next/image'

const AdsItem = ({ containerID, adsID, openModal, photoURL, adsURL, startDate, endDate, isHidden, itemWidth, itemHeight, itemName }: any) => {
	// change later to onClick instead and POST
	const [isActive, setIsActive] = useState(!isHidden)

	// subscribe to ads global store
	const [
		setAdsCategory,
		setAdsWidth,
		setAdsHeight,
		setAdsPhotoURL,
		setAdsLink,
		setAdsStartDate,
		setAdsEndDate,
		setContainerID,
		setAdsID,
		setIsCreatingNewAds,
	] = adsGlobalStore((state) => [
		state.setAdsCategory,
		state.setAdsWidth,
		state.setAdsHeight,
		state.setAdsPhotoURL,
		state.setAdsLink,
		state.setAdsStartDate,
		state.setAdsEndDate,
		state.setContainerID,
		state.setAdsID,
		state.setIsCreatingNewAds,
	]);

	const openModalEditingAds = () => {
		setAdsCategory(itemName)
		setAdsWidth(itemWidth / 1.25)
		setAdsHeight(itemHeight / 1.25)
		setAdsPhotoURL(photoURL)
		setAdsLink(adsURL)
		setAdsStartDate(new Date(startDate))
		setAdsEndDate(new Date(endDate))
		setContainerID(containerID)
		setAdsID(adsID)
		setIsCreatingNewAds(false)
		openModal()
	}

	const Img = styled('img')({
		height: itemHeight,
		width: itemWidth,
		objectFit: "cover",
		"&:hover": { opacity: 0.5 }
	})

	return (
		<Stack>
			<Switch checked={isActive} sx={{ alignSelf: "flex-end" }} onChange={event => { setIsActive(event.target.checked) }} />
			<ImageListItem onClick={openModalEditingAds} sx={imgWrapper} style={{ width: itemWidth, height: itemHeight, marginBottom: 12 }}>
				{photoURL === null ?
					<Image
						src={'/images/icons/butterfly-template-icon.png'}
						width={50}
						height={50}
						alt='butterfly icon'
						style={{ objectFit: "fill" }}
					/> : <Img sx={isActive ? { opacity: 1 } : { opacity: 0.25 }} src={photoURL} alt='ads image' />}
			</ImageListItem>
		</Stack>
	)
}

export default AdsItem

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