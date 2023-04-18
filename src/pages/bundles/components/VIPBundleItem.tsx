import React, { useState } from 'react'
import Switch from '@mui/material/Switch';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Grid, { GridProps } from '@mui/material/Grid';
import { Icon, IconProps } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import VIPBundleModal from './VIPBundleModal';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BundlesService from '@/services/api/BundlesService';
import IconList from './IconList';
import TranslateString from '@/utils/TranslateString';

type Props = {
	bundleID: string
	bundleName: string
	bundlePrice: number
	bundleDescription: string,
	isBundleOn: boolean,
	bundlePerks: [
		{ videos: boolean},
		{ photos: boolean},
		{ live_streaming: boolean},
		{ video_call: boolean},
		{ live_chat: boolean},
		{ forever_vip: boolean},
		{ download: boolean},
		{ watch_ticket: boolean},
		{ offline_benefit: boolean},
	]
}

const bundleNames = [
	"Video",
	"Photos",
	"Live Stream",
	"Video Call",
	"Live Chat",
	"Forever VIP",
	"Download",
	"Watch Ticket",
	"Offline Benefits",
]

const VIPBundleItem = (props: Props) => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// Get QueryClient from the context
	const queryClient = useQueryClient();
	const { deleteVIPBundle, editVIPBundle } = BundlesService();

	const { mutate: mutateDeleteVIPBundle, isLoading: deletingLoading } = useMutation(deleteVIPBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allVIPBundles"],
			});
		},
		onError: (error) => {
			alert(error);
		},
	});

	const { mutate: mutateEditVIPBundle, isLoading: editingLoading, } = useMutation(editVIPBundle, {
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["allVIPBundles"],
			});
		},
		onError: (error) => {
			alert(error);
		},
	});

	const confirmDeleteVIPBundle = () => {
		mutateDeleteVIPBundle({
			data: { bundle_id: props.bundleID },
		});
	}

	const SwtichOnAndOffVIPBundle = () => {
		mutateEditVIPBundle({
			data: {
				bundle_id: props.bundleID,
				name: props.bundleName,
				price: Number(props.bundlePrice),
				description: props.bundleDescription,
				active: !props.isBundleOn,
				videos: props.bundlePerks[0].videos,
				photos: props.bundlePerks[1].photos,
				live_streaming: props.bundlePerks[2].live_streaming,
				video_call: props.bundlePerks[3].video_call,
				live_chat: props.bundlePerks[4].live_chat,
				forever_vip: props.bundlePerks[5].forever_vip,
				download: props.bundlePerks[6].download,
				watch_ticket: props.bundlePerks[7].watch_ticket,
				offline_benefit: props.bundlePerks[8].offline_benefit,
			},
		});
	}

	const isBeingDeletedOrEdited = deletingLoading || editingLoading
	const loadingStyle = isBeingDeletedOrEdited ? { opacity: 0.5, cursor: "not-allowed" } : null

	return (
		<>
			<Stack gap={2} width={300} sx={loadingStyle} position="relative">
				{isBeingDeletedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}
				<Stack bgcolor="#D9D9D9" borderRadius={.5} p={2} width={300}>
					<Stack gap={2}>
						<Stack gap={2} flexDirection="row" justifyContent="space-between">
							<Typography variant="h6" bgcolor="white" p={2} borderRadius={.5} width="max-content" sx={{ wordBreak: "break-word" }}>{props.bundleName}</Typography>
							<Switch checked={props.isBundleOn} onClick={SwtichOnAndOffVIPBundle} />
						</Stack>
						<Typography variant="body1" bgcolor="white" p={2} borderRadius={.5} textAlign="center" sx={{ wordBreak: "break-word" }}>{props.bundlePrice}</Typography>
						<Typography variant="body2" bgcolor="white" p={2} borderRadius={.5} sx={{ wordBreak: "break-word" }}>{props.bundleDescription}</Typography>
					</Stack>
				</Stack>
				<Stack >
					<Stack bgcolor="#D9D9D9" borderRadius={.5} p={2} >
						<Stack bgcolor="white" borderRadius={.5} gap={4} p={1}>
							<Typography variant="body1" borderRadius={.5} textAlign="center" sx={{ wordBreak: "break-word" }}>{props.bundleName}</Typography>
							<Grid container gap={2} >
								{props.bundlePerks.map((item, index) =>
									<Grid item key={index} {...gridItemProps}>
										<Icon component={IconList(index, Object.values(item)[0])}  {...iconItemProps} />
										<Typography {...typographyItemProps}>{bundleNames.at(index)}</Typography>
									</Grid>
								)}
							</Grid>
						</Stack>
					</Stack>
					<Stack flexDirection="row" gap={4} mt={2}>
						<Button variant="contained" color="warning" fullWidth onClick={() => setOpen(true)}>{TranslateString("Edit")}</Button>
						<Button variant="contained" color="error" fullWidth onClick={confirmDeleteVIPBundle}>{TranslateString("Delete")}</Button>
					</Stack>
				</Stack>
			</Stack>
			{/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
			{/* EDITING VIP MODAL */}
			<Modal open={open} onClose={handleClose}>
				<VIPBundleModal
					onClose={handleClose}
					isEditingVIPBundle
					bundleID={props.bundleID}
					bundleName={props.bundleName}
					bundlePrice={props.bundlePrice}
					bundleDescription={props.bundleDescription}
					isBundleOn={props.isBundleOn}

					isVideoIncluded={props.bundlePerks[0].videos}
					isPhotosIncluded={props.bundlePerks[1].photos}
					isLiveStreamIncluded={props.bundlePerks[2].live_streaming}
					isVideoCallIncluded={props.bundlePerks[3].video_call}
					isLiveChatIncluded={props.bundlePerks[4].live_chat}
					isVIPIncluded={props.bundlePerks[5].forever_vip}
					isDownloadIncluded={props.bundlePerks[6].download}
					isWatchTicketIncluded={props.bundlePerks[7].watch_ticket}
					isOfflineBenefitsIncluded={props.bundlePerks[8].offline_benefit}
				/>
			</Modal>
		</>
	)
}

export default VIPBundleItem

const gridItemProps: GridProps = {
	item: true,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: 64,
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
		width: 32
	}
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