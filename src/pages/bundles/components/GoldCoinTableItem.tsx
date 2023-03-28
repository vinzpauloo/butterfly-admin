import React, { useState } from "react"
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import GoldCoinBundleModal from "../components/GoldCoinBundleModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BundlesService from "../../../services/api/BudlesService";

type Props = {
	bundleID: string
	bundleName: string
	bundleDescription: string
	bundlePrice: string
	isBundleOn: boolean
}

const GoldCoinTableItem = (props: Props) => {
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
	const iconLoadingStyle = isBeingDeletedOrEdited ? { cursor: "not-allowed" } : { cursor: "pointer" }
	
	return (
		<>
			<TableRow key={props.bundleName} sx={loadingStyle}>
				<TableCell>{isBeingDeletedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}{props.bundleName}</TableCell>
				<TableCell>{props.bundleDescription}</TableCell>
				<TableCell>{props.bundlePrice}</TableCell>
				<TableCell align="right" sx={{ alignItems: "center", display: "flex", gap: 4 }}>
					<DeleteOutlineOutlinedIcon onClick={deleteGoldCoinBundle} sx={IconHoverSyle} style={iconLoadingStyle} />
					<EditOutlinedIcon onClick={() => setOpen(true)} sx={IconHoverSyle} style={iconLoadingStyle} />
					<Switch disabled={isBeingDeletedOrEdited} checked={props.isBundleOn} onClick={SwtichOnAndOffGoldCoinBundle} />
				</TableCell>
			</TableRow>
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

export default GoldCoinTableItem

const IconHoverSyle = {
	":hover": { color: (theme: any) => theme.palette.primary.main },
	transition: "0.25s ease"
}

const loaderStyle =
{
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	margin: "auto"
}