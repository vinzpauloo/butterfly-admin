import React from 'react'
import Typography from '@mui/material/Typography';
import ToggleButton from '../../user/components/button/ToggleButton';
import { Stack } from '@mui/material';

type Props = {
	bundleName: string
	bundlePrice: number
	bundleDescription: string,
	isBundleOn: boolean,
}

const BundleInfoCard = (props: Props) => {
	return (
		<Stack gap={2}>
			<Stack gap={2} flexDirection="row" justifyContent="space-between">
				<Typography variant="h6" bgcolor="white" p={2} borderRadius={.5} width="max-content">{props.bundleName}</Typography>
				{/* WIP ON / OFF FUNCTIONALITY WITH props.isBundleOn */}
				<ToggleButton />
			</Stack>
			<Typography variant="body1" bgcolor="white" p={2} borderRadius={.5} textAlign="center">{props.bundlePrice}</Typography>
			<Typography variant="body2" bgcolor="white" p={2} borderRadius={.5}>{props.bundleDescription}</Typography>
		</Stack>
	)
}

export default BundleInfoCard