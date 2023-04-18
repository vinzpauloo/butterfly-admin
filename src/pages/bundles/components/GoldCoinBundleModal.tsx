import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BundlesService from '@/services/api/BundlesService';
import TranslateString from '@/utils/TranslateString';

type Props = {

	// optional props to be passed if editing a bundle instead
	isEditingGoldCoinBundle?: boolean
	bundleID?: string
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

	const [isBundleActive, setIsBundleActive] = useState(props.isBundleOn ?? false)

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

	// Get QueryClient from the context
	const queryClient = useQueryClient();
	const { addCoinsBundle, editCoinsBundle } = BundlesService();

	const { mutate: mutateAddNewCoinBundle, isLoading: addedLoading, isSuccess: addedSuccess } = useMutation(addCoinsBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allCoinsBundle"],
			});
			props.onClose()
		},
		onError: (error) => {
			alert(error);
		},
	});

	const { mutate: mutateEditCoinBundle, isLoading: editingLoading, isSuccess: editingSuccess } = useMutation(editCoinsBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allCoinsBundle"],
			});
			props.onClose()
		},
		onError: (error) => {
			alert(error);
		},
	});

	const editGoldCoinBundle = () => {
		if (validateInputs()) {
			mutateEditCoinBundle({
				data: {
					bundle_id: props.bundleID,
					name: bundleName,
					price: Number(bundlePrice),
					amount: Number(bundlePrice),
					description: bundleDescription,
					active: isBundleActive,
				},
			});
		}
	}

	const addGoldCoinBundle = () => {
		if (validateInputs()) {
			mutateAddNewCoinBundle({
				data: {
					name: bundleName,
					price: Number(bundlePrice),
					amount: Number(bundlePrice),
					description: bundleDescription,
					active: isBundleActive,
				},
			});
		}
	}

	const isBeingAddedOrEdited = (addedLoading || addedSuccess) || (editingLoading || editingSuccess)
	const loadingStyle = isBeingAddedOrEdited ? {opacity: 0.5, cursor: "not-allowed"} : null
	
	return (
		<Stack {...modalContainer}>
			<Typography variant="h5" color="white" textAlign="center" my={2} mb={4}>{props.isEditingGoldCoinBundle ? TranslateString("Edit") : TranslateString("Add")} {TranslateString("Gold Coin Bundle")}</Typography>
			<Stack gap={2} width={300} sx={loadingStyle}>
				{isBeingAddedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}
				<Stack {...cardContainer}>
					<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
						<TextField
							error={bundleName !== "" ? false : undefined || bundleNameError}
							sx={textFieldStyle}
							value={bundleName}
							onChange={(event) => { setBundleName(event.target.value); console.log(bundleName)}}
							label={TranslateString("Bundle Name")} />
						<Switch checked={isBundleActive} onChange={event => { setIsBundleActive(event.target.checked)}} />
					</Stack>
					<TextField
						type="number"
						error={bundlePrice !== "" ? false : undefined || bundlePriceError}
						sx={textFieldStyle}
						inputProps={{ min: 0 }}
						value={bundlePrice}
						onChange={(event) => {setBundlePrice(event.target.value); console.log(bundlePrice)}}
						label={TranslateString("Gold Coin")} />
				</Stack>
				<Stack {...cardContainer}>
					<TextField
						error={bundleDescription !== "" ? false : undefined || bundleDescriptionError}
						sx={textFieldStyle}
						value={bundleDescription}
						onChange={(event) => setBundleDescription(event.target.value)}
						label={TranslateString("Description")}
						multiline
						rows={4} />
				</Stack>
				<Stack flexDirection="row" gap={2} mt={4}>
					<Button variant="contained" color="error" onClick={props.onClose} fullWidth>{TranslateString("Cancel")}</Button>
					<Button variant="contained" color="success" onClick={props.isEditingGoldCoinBundle ? editGoldCoinBundle : addGoldCoinBundle} fullWidth>{TranslateString("Save")}</Button>
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