import React from 'react'
import { ImageListItem, Switch, Stack, CircularProgress, styled } from '@mui/material'
import { adsGlobalStore } from "../../../../zustand/adsGlobalStore";
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdvertisementService from '../../../../services/api/AdvertisementService';

const AdsItem = ({ containerID, adsID, openModal, photoURL, adsURL, startDate, endDate, isActive, itemWidth, itemHeight, itemName }: any) => {
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
	
	// Get QueryClient from the context
	const queryClient = useQueryClient();
	const { updateAds } = AdvertisementService();

	const { mutate, isLoading } = useMutation(updateAds, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allAdvertisement"],
			});
		},
		onError: (error) => {
			alert(error);
		},
	});

	const ActivateOrInactiveAds = () => {
		// PUT data to back-end
		mutate({
			id: containerID,
			banner_id: adsID,
			relation: itemName === "Video-Grid" ? "gif" : "banner",
			data: {
				active: isActive? 0 : 1,
				_method: "put"
			},
		});
	}

	return (
		<Stack>
			<Switch disabled={isLoading} checked={isActive} sx={{ alignSelf: "flex-end" }} onClick={ActivateOrInactiveAds} />
			<ImageListItem onClick={isLoading ? undefined : openModalEditingAds} sx={[styles.imgWrapper, { width: itemWidth, height: itemHeight }]} style={isLoading ? { opacity: 0.5, cursor: "not-allowed" }: undefined}>
				{isLoading ? <CircularProgress sx={styles.loaderStyle} color="primary" size={64} /> : null}
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

const styles = {
	imgWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: "pointer",
		backgroundColor: '#D9D9D9',
		":hover": {
			backgroundColor: (theme: any) => theme.palette.primary.main,
		},
		marginBottom: 12
	},
	loaderStyle: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: "auto",
		zIndex: 1
	},
}