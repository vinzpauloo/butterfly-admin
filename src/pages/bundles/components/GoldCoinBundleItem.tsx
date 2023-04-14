import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import GoldCoinBundleModal from './GoldCoinBundleModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BundlesService from '../../../services/api/BudlesService';
import TranslateString from '@/utils/TranslateString';

type Props = {
	bundleID: string
	bundleName: string
	bundlePrice: string
	bundleDescription: string,
	isBundleOn: boolean,
}

const GoldCoinBundleItem = (props: Props) => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// Get QueryClient from the context
	const queryClient = useQueryClient();
	const { deleteCoinsBundle, editCoinsBundle } = BundlesService();
	const { mutate: mutateDeleteCoinBundle, isLoading: deletingLoading } = useMutation(deleteCoinsBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allCoinsBundle"],
			});
		},
		onError: (error) => {
			alert(error);
		},
	});

	const { mutate: mutateEditCoinBundle, isLoading: editingLoading } = useMutation(editCoinsBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allCoinsBundle"],
			});
		},
		onError: (error) => {
			alert(error);
		},
	});

	const deleteGoldCoinBundle = () => {
		mutateDeleteCoinBundle({
			data: { bundle_id: props.bundleID },
		});
	}

	const SwtichOnAndOffGoldCoinBundle = () => {
		mutateEditCoinBundle({
			data: {
				bundle_id: props.bundleID,
				name: props.bundleName,
				price: Number(props.bundlePrice),
				amount: Number(props.bundlePrice),
				description: props.bundleDescription,
				active: !props.isBundleOn,
			},
		});
	}

	const isBeingDeletedOrEdited = deletingLoading || editingLoading
	const loadingStyle = isBeingDeletedOrEdited ? { opacity: 0.5, cursor: "not-allowed" } : null

	return (
		<>
			<Stack gap={2} height="max-content" width={300} sx={loadingStyle} position="relative">
				{isBeingDeletedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}
				<Stack {...cardContainer}>
					<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
						<Typography {...textContainer} variant="h6" sx={{ wordBreak: "break-word" }}>{props.bundleName}</Typography>
						<Switch checked={props.isBundleOn} onClick={SwtichOnAndOffGoldCoinBundle} />
					</Stack>
					<Typography {...textContainer} variant="body1" sx={{ wordBreak: "break-word" }}>{props.bundlePrice}</Typography>
				</Stack>
				<Stack {...cardContainer}>
					<Typography bgcolor="white" variant="body2" p={2} borderRadius={0.5} sx={{ wordBreak: "break-word" }} >{props.bundleDescription}</Typography>
				</Stack>
				<Stack flexDirection="row" gap={4} mt={2}>
					<Button variant="contained" color="warning" fullWidth onClick={() => setOpen(true)}>{TranslateString("Edit")}</Button>
					<Button variant="contained" color="error" fullWidth onClick={deleteGoldCoinBundle}>{TranslateString("Delete")}</Button>
				</Stack>
			</Stack>
			{/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
			{/* EDITING GCB MODAL */}
			<Modal open={open} onClose={handleClose}>
				<GoldCoinBundleModal
					onClose={handleClose}
					isEditingGoldCoinBundle
					bundleID={props.bundleID}
					bundleName={props.bundleName}
					bundlePrice={props.bundlePrice}
					bundleDescription={props.bundleDescription}
					isBundleOn={props.isBundleOn}
				/>
			</Modal>
		</>
	)
}

export default GoldCoinBundleItem

const cardContainer: StackProps = {
	bgcolor: "#D9D9D9",
	borderRadius: 0.5,
	p: 2,
	gap: 2,
}

const textContainer: TypographyProps = {
	bgcolor: "white",
	variant: "h5",
	p: 2,
	borderRadius: 0.5,
	textAlign: "center",
}

const loaderStyle = 
{
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	margin:"auto"
}