import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { useState } from 'react'
import Stack, { StackProps } from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ToggleButton from '../../user/components/button/ToggleButton';
import Modal from '@mui/material/Modal';
import GoldCoinBundleModal from './GoldCoinBundleModal';

type Props = {
	bundleName: string
	bundlePrice: string
	bundleDescription: string,
	isBundleOn: boolean,
}

const GoldCoinBundleItem = (props: Props) => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Stack gap={2} width={300}>
				<Stack {...cardContainer}>
					<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
						<Typography {...textContainer} variant="h6">{props.bundleName}</Typography>
						<ToggleButton />
					</Stack>
					<Typography {...textContainer} variant="body1">{props.bundlePrice}</Typography>
				</Stack>
				<Stack {...cardContainer}>
					<Typography bgcolor="white" variant="body2" p={2} borderRadius={0.5}>{props.bundleDescription}</Typography>
				</Stack>
				<Button fullWidth variant="contained" color="warning" onClick={() => setOpen(true)}>EDIT</Button>
			</Stack>
			{/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
			<Modal open={open} onClose={handleClose}>
				<GoldCoinBundleModal
					onClose={handleClose}
					isEditingGoldCoinBundle
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