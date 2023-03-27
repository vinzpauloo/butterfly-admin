import React, { useState } from 'react'
import VIPInfoCard from './VIPInfoCard';
import VIPFeatureCard from './VIPFeatureCard';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import VIPBundleModal from './VIPBundleModal';

type bundleObject = {
	_id: string
	name: string
	permission: boolean
}

type Props = {
	bundleName: string
	bundlePrice: number
	bundleDescription: string,
	isBundleOn: boolean,
	promoBundle: bundleObject[]
}

const VIPBundleItem = (props: Props) => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	const deleteVIPBundle = () => {
		alert("delete " + props.bundleName)
	}

	return (
		<>
			<Stack gap={2} width={300}> 
				<Stack bgcolor="#D9D9D9" borderRadius={.5} p={2} width={300}>
					<VIPInfoCard
						bundleName={props.bundleName}
						bundlePrice={props.bundlePrice}
						bundleDescription={props.bundleDescription}
						isBundleOn={props.isBundleOn}
					/>
				</Stack>
				<Stack >
					<VIPFeatureCard bundleName={props.bundleName} promoBundle={props.promoBundle} />
					<Stack flexDirection="row" gap={4} mt={2}>
						<Button variant="contained" color="warning" fullWidth onClick={() => setOpen(true)}>EDIT</Button>
						<Button variant="contained" color="error" fullWidth onClick={deleteVIPBundle}>DELETE</Button>
					</Stack>
				</Stack>
			</Stack>
			{/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
			{/* EDITING VIP MODAL */}
			<Modal open={open} onClose={handleClose}>
				<VIPBundleModal
					onClose={handleClose}
					isEditingVIPBundle
					bundleName={props.bundleName}
					bundlePrice={props.bundlePrice}
					bundleDescription={props.bundleDescription}
					isBundleOn={props.isBundleOn}

					isVideoIncluded={props.promoBundle[0].permission}
					isPhotosIncluded={props.promoBundle[1].permission}
					isLiveStreamIncluded={props.promoBundle[2].permission}
					isVideoCallIncluded={props.promoBundle[3].permission}
					isLiveChatIncluded={props.promoBundle[4].permission}
					isVIPIncluded={props.promoBundle[5].permission}
					isDownloadIncluded={props.promoBundle[6].permission}
					isWatchTicketIncluded={props.promoBundle[7].permission}
					isOfflineBenefitsIncluded={props.promoBundle[8].permission}
				/>
			</Modal>
		</>
	)
}

export default VIPBundleItem