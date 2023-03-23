import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import GoldCoinBundleItem from './GoldCoinBundleItem';
import Modal from '@mui/material/Modal';
import GoldCoinBundleModal from './GoldCoinBundleModal';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import BundlesService from '../../../services/api/BudlesService'

// FETCHED FAKE DATA
const goldCoinBundleData = [
	{
		bundleName: "Best Deal",
		bundlePrice: "500 Gold Coins",
		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et. Pharetra nulla sit facilisis scelerisque et ultricies eu aliquet.",
		isBundleOn: true,
	},
	{
		bundleName: "Limited",
		bundlePrice: "400 Gold Coins",
		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et. Pharetra nulla sit facilisis scelerisque et ultricies eu aliquet.",
		isBundleOn: true,
	},
	{
		bundleName: "Season",
		bundlePrice: "350 Gold Coins",
		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et. Pharetra nulla sit facilisis scelerisque et ultricies eu aliquet.",
		isBundleOn: true,
	},
	{
		bundleName: "Low Ball",
		bundlePrice: "300 Gold Coins",
		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et. Pharetra nulla sit facilisis scelerisque et ultricies eu aliquet.",
		isBundleOn: false,
	},
	{
		bundleName: "Low Ball 2",
		bundlePrice: "200 Gold Coins",
		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et. Pharetra nulla sit facilisis scelerisque et ultricies eu aliquet.",
		isBundleOn: false,
	},
]

const GoldCoinBundlesCard = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// FETCH ALL VIP BUNDLES
	// const { getAllCoinsBundle } = BundlesService()
	// const { isLoading, isError, data, error } = useQuery({
	// 	queryKey: ['allVIPBundles'],
	// 	queryFn: () => getAllCoinsBundle({
	// 		data: {
	// 			site_id: 1
	// 		}
	// 	}),
	// 	onSuccess: (data) => { console.log("COINS BUNDLE:",data?.bundles) },
	// 	onError: (error) => { console.log(error) }
	// })

	return (
		<>
			<Card sx={{ backgroundColor: theme => theme.customBflyColors.alwaysPrimary }}>
				<CardContent sx={{ padding: { xs: 4, sm: 8 } }}>
					<Stack justifyContent={{ xs: "center", sm: "space-between" }} flexDirection={{xs:"column", sm:"row"}} alignItems="center" gap={2} mb={4}>
						<Typography variant="h5" component="div" color="white"> GOLD COIN BUNDLES </Typography>
						<Button variant="contained" onClick={() => setOpen(true)}>CREATE GOLD BUNDLE</Button>
					</Stack>
					<Grid
						container
						gap={4}
						pr={goldCoinBundleData.length > 4 ? { sm: 4 } : undefined}
						justifyContent={{xs: "center", sm: goldCoinBundleData.length >= 4 ? "space-between" : "flex-start"}}
						sx={{ maxHeight: 348, overflowY: "auto" }}>
						{goldCoinBundleData.map((item, index) => 
							<GoldCoinBundleItem
								key={index}
								bundleName={item.bundleName}
								bundlePrice={item.bundlePrice}
								bundleDescription={item.bundleDescription}
								isBundleOn={item.isBundleOn}
							/>
						)}
					</Grid>
				</CardContent>
			</Card>
			{/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
			<Modal open={open} onClose={handleClose}>
				<GoldCoinBundleModal onClose={handleClose} />
			</Modal>
		</>
	)
}

export default GoldCoinBundlesCard