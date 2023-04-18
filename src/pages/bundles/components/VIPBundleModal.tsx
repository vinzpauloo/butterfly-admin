import React, { useState } from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import Grid, { GridProps } from '@mui/material/Grid';
import { Icon, IconProps } from '@mui/material';
import IconList from './IconList';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import BundlesService from '@/services/api/BundlesService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslateString } from '@/utils/TranslateString';

type Props = {

	// optional props to be passed if editing a bundle instead
	isEditingVIPBundle?: boolean
	bundleID?: string
	bundleName?: string
	bundlePrice?: number
	bundleDescription?: string
	isBundleOn?: boolean
	isVideoIncluded?: boolean
	isPhotosIncluded?: boolean
	isLiveStreamIncluded?: boolean
	isVideoCallIncluded?: boolean
	isLiveChatIncluded?: boolean
	isVIPIncluded?: boolean
	isDownloadIncluded?: boolean
	isWatchTicketIncluded?: boolean
	isOfflineBenefitsIncluded?: boolean
	onClose: () => void
}

const VIPBundleModal = (props: Props) => {
	const [bundleName, setBundleName] = useState(props.bundleName ?? "")
	const [bundleNameError, setBundleNameError] = useState(false)
	
	const [bundlePrice, setBundlePrice] = useState(props.bundlePrice ?? "")
	const [bundlePriceError, setBundlePriceError] = useState(false)

	const [bundleDescription, setBundleDescription] = useState(props.bundleDescription ?? "")
	const [bundleDescriptionError, setBundleDescriptionError] = useState(false)

	const [isBundleActive, setIsBundleActive] = useState(props.isBundleOn ?? false)

	const [isVideoIncluded, setIsVideoIsIncluded] = useState(props.isVideoIncluded ?? false)
	const [isPhotosIncluded, setIsPhotosIncluded] = useState(props.isPhotosIncluded ?? false)
	const [isLiveStreamIncluded, setIsLiveStreamIncluded] = useState(props.isLiveStreamIncluded ?? false)
	const [isVideoCallIncluded, setIsVideoCallIncluded] = useState(props.isVideoCallIncluded ?? false)
	const [isLiveChatIncluded, setIsLiveChatIncluded] = useState(props.isLiveChatIncluded ?? false)
	const [isVIPIncluded, setIsVIPIncluded] = useState(props.isVIPIncluded ?? false)
	const [isDownloadIncluded, setIsDownloadIncluded] = useState(props.isDownloadIncluded ?? false)
	const [isWatchTicketIncluded, setIsWatchTicketIncluded] = useState(props.isWatchTicketIncluded ?? false)
	const [isOfflineBenefitsIncluded, setIsOfflineBenefitsIncluded] = useState(props.isOfflineBenefitsIncluded ?? false)

	const [featuresSelectionError, setFeaturesSelectionError] = useState(false)

	const featuresList = [
		{
			featureName: "Video",
			isIncluded: isVideoIncluded,
			setFunction: () => setIsVideoIsIncluded(prev => !prev),
		},
		{
			featureName: "Photos",
			isIncluded: isPhotosIncluded,
			setFunction: () => setIsPhotosIncluded(prev => !prev),
		},
		{
			featureName: "Live Stream",
			isIncluded: isLiveStreamIncluded,
			setFunction: () => setIsLiveStreamIncluded(prev => !prev),
		},
		{
			featureName: "Video Call",
			isIncluded: isVideoCallIncluded,
			setFunction: () => setIsVideoCallIncluded(prev => !prev),
		},
		{
			featureName: "Live Chat",
			isIncluded: isLiveChatIncluded,
			setFunction: () => setIsLiveChatIncluded(prev => !prev),
		},
		{
			featureName: "Forever VIP",
			isIncluded: isVIPIncluded,
			setFunction: () => setIsVIPIncluded(prev => !prev),
		},
		{
			featureName: "Download",
			isIncluded: isDownloadIncluded,
			setFunction: () => setIsDownloadIncluded(prev => !prev),
		},
		{
			featureName: "Watch Ticket",
			isIncluded: isWatchTicketIncluded,
			setFunction: () => setIsWatchTicketIncluded(prev => !prev),
		},
		{
			featureName: "Offline Benefits",
			isIncluded: isOfflineBenefitsIncluded,
			setFunction: () => setIsOfflineBenefitsIncluded(prev => !prev),
		},
	]

	const validateInputs = () => {
		if (bundleName === "") {
			setBundleNameError(true) 

			return false
		}
		if (bundlePrice === "") {
			setBundlePriceError(true)

			return false
		}
		if (bundleDescription === "") {
			setBundleDescriptionError(true)

			return false
		}
		if (featuresList.every(item => item.isIncluded === false)) {
			setFeaturesSelectionError(true)
			
			return false
		}

		return true
	}

	// Get QueryClient from the context
	const queryClient = useQueryClient();
	const { addVIPBundle, editVIPBundle } = BundlesService();

	const { mutate: mutateAddNewVIPBundle, isLoading: addedLoading, isSuccess: addedSuccess } = useMutation(addVIPBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allVIPBundles"],
			});
		props.onClose()
		},
		onError: (error) => {
			alert(error);
		},
	});

	const { mutate: mutateEditVIPBundle, isLoading: editingLoading, isSuccess: editingSuccess } = useMutation(editVIPBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allVIPBundles"],
			});
			props.onClose()
		},
		onError: (error) => {
			alert(error);
		},
	});

	const confirmEditVIPBundle = () => {
		if (validateInputs()) {
			mutateEditVIPBundle({
				data: {
					bundle_id: props.bundleID,
					name: bundleName,
					price: Number(bundlePrice),
					description: bundleDescription,
					active: isBundleActive,
					videos: featuresList[0].isIncluded,
					photos: featuresList[1].isIncluded,
					live_streaming: featuresList[2].isIncluded,
					video_call: featuresList[3].isIncluded,
					live_chat: featuresList[4].isIncluded,
					forever_vip: featuresList[5].isIncluded,
					download: featuresList[6].isIncluded,
					watch_ticket: featuresList[7].isIncluded,
					offline_benefit: featuresList[8].isIncluded,
				},
			});
		}
	}

	const addNewVIPBundle = () => {
		if (validateInputs()) {
			mutateAddNewVIPBundle({
				data: {
					name: bundleName,
					price: Number(bundlePrice),
					description: bundleDescription,
					active: isBundleActive,
					videos: featuresList[0].isIncluded,
					photos: featuresList[1].isIncluded,
					live_streaming: featuresList[2].isIncluded,
					video_call: featuresList[3].isIncluded,
					live_chat: featuresList[4].isIncluded,
					forever_vip: featuresList[5].isIncluded,
					download: featuresList[6].isIncluded,
					watch_ticket: featuresList[7].isIncluded,
					offline_benefit: featuresList[8].isIncluded,
				},
			});
		}
	}

	const isBeingAddedOrEdited = (addedLoading || addedSuccess) || (editingLoading || editingSuccess)
	const loadingStyle = isBeingAddedOrEdited ? { opacity: 0.5, cursor: "not-allowed" } : null

	const TranslateString = useTranslateString()

	return (
		<Stack {...modalContainer}>
			<Typography variant="h5" color="white" textAlign="center" my={2} mb={4}>{props.isEditingVIPBundle ? TranslateString("Edit") : TranslateString("Add")} {TranslateString("VIP Bundle")}</Typography>
			<Stack flexDirection="column" gap={2} sx={loadingStyle} width={300}>
				{isBeingAddedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}
				<Stack gap={2}>
					<Stack {...cardContainer}>
						<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
							<TextField
								error={bundleName !== "" ? false : undefined || bundleNameError}
								sx={textFieldStyle}
								value={bundleName}
								onChange={(event) => setBundleName(event.target.value)}
								label={TranslateString("Bundle Name")} />
							<Switch checked={isBundleActive} onChange={event => { setIsBundleActive(event.target.checked) }} />
						</Stack>
						<TextField
							type="number"
							error={bundlePrice !== "" ? false : undefined || bundlePriceError}
							sx={textFieldStyle}
							inputProps={{ min: 0 }}
							value={bundlePrice}
							onChange={(event) => setBundlePrice(event.target.value)}
							label={TranslateString("Bundle Price")} />
					</Stack>
					<Stack {...cardContainer}>
						<TextField
							error={bundleDescription !== "" ? false : undefined || bundleDescriptionError}
							sx={textFieldStyle}
							value={bundleDescription}
							onChange={(event) => setBundleDescription(event.target.value)}
							label={TranslateString("Bundle Description")}
							multiline
							rows={4} />
					</Stack>
				</Stack>
				<Stack bgcolor="#D9D9D9" borderRadius={.5} p={2} width={300} height="max-content">
					<Stack bgcolor="white" borderRadius={.5} gap={4} p={1} sx={featuresSelectionError? { outline: "1px solid red" }: null}>
						<Typography variant="subtitle1" borderRadius={.5} textAlign="center">{TranslateString("Select")} {TranslateString("Features")}</Typography>
						<Grid container gap={2.5}>
							{featuresList.map((item, index) =>
								<Grid style={{ cursor: "pointer" }} onClick={item.setFunction} item key={index} {...gridItemProps}>
									<Icon component={IconList(index, item.isIncluded)}  {...iconItemProps} />
									<Typography {...typographyItemProps}>{item.featureName}</Typography>
								</Grid>
							)}
						</Grid>
					</Stack>
				</Stack>
			</Stack>
			<Stack flexDirection="row" gap={2} mt={4}>
				<Button variant="contained" color="error" onClick={props.onClose} fullWidth>{TranslateString("Cancel")}</Button>
				<Button variant="contained" color="success" onClick={props.isEditingVIPBundle ? confirmEditVIPBundle : addNewVIPBundle} fullWidth>{TranslateString("Save")}</Button>
			</Stack>
		</Stack>
	)
}

export default VIPBundleModal

// STYLINGS
const modalContainer: StackProps = {
	sx: {
		backgroundColor: theme => theme.customBflyColors.alwaysPrimary,
		transform: "translate(-50%, -50%)",
	},
	position: "absolute",
	top: "50%",
	left: "50%",
	p: 4,
	borderRadius: 1,
}

const gridItemProps: GridProps = {
	item: true,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	xs: 3.7,
}

const typographyItemProps: TypographyProps = {
	textAlign: "center",
	variant: "subtitle1",
	borderRadius: 0.5,
	fontSize: 10
}

const iconItemProps: IconProps = {
	sx: {
		height: 32,
		width: 32,
	}
}

const cardContainer: StackProps = {
	bgcolor: "#D9D9D9",
	borderRadius: 0.5,
	p: 2,
	gap: 2,
}

const textFieldStyle = {
	backgroundColor: "white",
	borderRadius: 1,
	'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
		"WebkitAppearance": "none",
		"margin": 0
	},
}

const loaderStyle =
{
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	margin: "auto",
	zIndex: 1,
}