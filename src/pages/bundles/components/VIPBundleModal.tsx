import React, { useState } from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import Grid, { GridProps } from '@mui/material/Grid';
import { Icon, IconProps } from '@mui/material';
import IconList from './IconList';
import ToggleButton from '../../user/components/button/ToggleButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {

	// optional props to be passed if editing a bundle instead
	isEditingVIPBundle?: boolean
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

	const selectedFeatures: string[] = []

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

	const editVIPBundle = () => {
		alert("WIP: edit vip bundle")
		props.onClose()
	}

	const addNewVIPBundle = () => {
		if (validateInputs()) {
			// POST TO BACK-END
			console.log("Name:", bundleName)
			console.log("Price:", bundlePrice)
			console.log("Description:", bundleDescription)

			featuresList.forEach(item => {if (item.isIncluded) selectedFeatures.push(item.featureName)})
			console.log(selectedFeatures)
			props.onClose()
		}
	}

	return (
		<Stack {...modalContainer}>
			<Typography variant="h5" color="white" textAlign="center" my={2} mb={4}>{props.isEditingVIPBundle ? "EDIT" : "ADD"} VIP BUNDLE</Typography>
			<Stack flexDirection="column" gap={2}>
				<Stack gap={2} width={300}>
					<Stack {...cardContainer}>
						<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
							<TextField
								error={bundleName !== "" ? false : undefined || bundleNameError}
								sx={textFieldStyle}
								value={bundleName}
								onChange={(event) => setBundleName(event.target.value)}
								label="Bundle Name" />
							<ToggleButton />
						</Stack>
						<TextField
							error={bundlePrice !== "" ? false : undefined || bundlePriceError}
							sx={textFieldStyle}
							value={bundlePrice}
							onChange={(event) => setBundlePrice(event.target.value)}
							label="Bundle Price" />
					</Stack>
					<Stack {...cardContainer}>
						<TextField
							error={bundleDescription !== "" ? false : undefined || bundleDescriptionError}
							sx={textFieldStyle}
							value={bundleDescription}
							onChange={(event) => setBundleDescription(event.target.value)}
							label="Bundle Description"
							multiline
							rows={4} />
					</Stack>
				</Stack>
				<Stack bgcolor="#D9D9D9" borderRadius={.5} p={2} width={300} height="max-content">
					<Stack bgcolor="white" borderRadius={.5} gap={4} p={1} sx={featuresSelectionError? { outline: "1px solid red" }: null}>
						<Typography variant="subtitle1" borderRadius={.5} textAlign="center">Select Features</Typography>
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
				<Button variant="contained" color="error" onClick={props.onClose} fullWidth>CANCEL</Button>
				<Button variant="contained" color="success" onClick={props.isEditingVIPBundle? editVIPBundle : addNewVIPBundle} fullWidth>SAVE</Button>
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
}