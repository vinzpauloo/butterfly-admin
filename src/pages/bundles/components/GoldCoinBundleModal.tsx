import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ToggleButton from '../../user/components/button/ToggleButton';
import TextField from '@mui/material/TextField';

type Props = {

	// optional props to be passed if editing a bundle instead
	isEditingGoldCoinBundle?: boolean
	bundleName?: string
	bundlePrice?: string
	bundleDescription?: string
	isBundleOn?: boolean
	onClose: () => void
}

const GoldCoinBundleModal = (props: Props) => {
	const [bundleName, setBundleName] = useState(props.bundleName ?? "")
	const [bundleNameError, setBundleNameError] = useState(false)

	const [bundlePrice, setBundlePrice] = useState(props.bundlePrice ?? "")
	const [bundlePriceError, setBundlePriceError] = useState(false)

	const [bundleDescription, setBundleDescription] = useState(props.bundleDescription ?? "")
	const [bundleDescriptionError, setBundleDescriptionError] = useState(false)

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

		return true
	}

	const addNewGoldCoinBundle = () => {
		if (validateInputs()) {
			// POST TO BACK-END
			console.log("Name:", bundleName)
			console.log("Price:", bundlePrice)
			console.log("Description:", bundleDescription)
			props.onClose()
		}
	}
	
	return (
		<Stack {...modalContainer}>
			<Typography variant="h5" color="white" textAlign="center" my={2} mb={4}>{props.isEditingGoldCoinBundle ? "EDIT" : "ADD"} GOLD COIN BUNDLE</Typography>
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
						label="Gold Coins" />
				</Stack>
				<Stack {...cardContainer}>
					<TextField
						error={bundleDescription !== "" ? false : undefined || bundleDescriptionError}
						sx={textFieldStyle}
						value={bundleDescription}
						onChange={(event) => setBundleDescription(event.target.value)}
						label="Description"
						multiline
						rows={4} />
				</Stack>
				<Stack flexDirection="row" gap={2} mt={4}>
					<Button variant="contained" color="error" onClick={props.onClose} fullWidth>CANCEL</Button>
					<Button variant="contained" color="success" onClick={addNewGoldCoinBundle} fullWidth>SAVE</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}

export default GoldCoinBundleModal

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