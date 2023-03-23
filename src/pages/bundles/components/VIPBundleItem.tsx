import React, { useState } from 'react'
import VIPInfoCard from './VIPInfoCard';
import VIPFeatureCard from './VIPFeatureCard';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import VIPBundleModal from './VIPBundleModal';

type bundleObject = {
	promoName: string
	isPromoIncluded: boolean
}

type Props = {
	bundleName: string
	bundlePrice: string
	bundleDescription: string,
	isBundleOn: boolean,
	promoBundle: bundleObject[]
}

const VIPBundleItem = (props: Props) => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	const deleteBundle = () => {
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
						<Button variant="contained" color="error" fullWidth onClick={deleteBundle}>DELETE</Button>
					</Stack>
				</Stack>
			</Stack>
			{/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
			<Modal open={open} onClose={handleClose}>
				<VIPBundleModal
					onClose={handleClose}
					isEditingVIPBundle
					bundleName={props.bundleName}
					bundlePrice={props.bundlePrice}
					bundleDescription={props.bundleDescription}
					isBundleOn={props.isBundleOn}

					isVideoIncluded={props.promoBundle[0].isPromoIncluded}
					isPhotosIncluded={props.promoBundle[1].isPromoIncluded}
					isLiveStreamIncluded={props.promoBundle[2].isPromoIncluded}
					isVideoCallIncluded={props.promoBundle[3].isPromoIncluded}
					isLiveChatIncluded={props.promoBundle[4].isPromoIncluded}
					isVIPIncluded={props.promoBundle[5].isPromoIncluded}
					isDownloadIncluded={props.promoBundle[6].isPromoIncluded}
					isWatchTicketIncluded={props.promoBundle[7].isPromoIncluded}
					isOfflineBenefitsIncluded={props.promoBundle[8].isPromoIncluded}
				/>
			</Modal>
		</>
	)
}

export default VIPBundleItem