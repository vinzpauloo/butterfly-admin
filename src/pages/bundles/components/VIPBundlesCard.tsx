import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import VIPBundleItem from './VIPBundleItem';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import VIPBundleModal from './VIPBundleModal';
import CircularProgress from '@mui/material/CircularProgress';
import  BundlesService  from '../../../services/api/BudlesService'
import { useQuery } from '@tanstack/react-query';

// FAKE DATA FOR NOW
// const promoBundleData = [
// 	{
// 		bundleName: "Platinum",
// 		bundlePrice: "¥500 (CNY)",
// 		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et.",
// 		isBundleOn: true,
// 		promoBundle: [
// 			{ promoName: "Video", isPromoIncluded: true },
// 			{ promoName: "Photos", isPromoIncluded: true },
// 			{ promoName: "Live Stream", isPromoIncluded: true },
// 			{ promoName: "Video Call", isPromoIncluded: true },
// 			{ promoName: "Live Chat", isPromoIncluded: true },
// 			{ promoName: "Forever VIP", isPromoIncluded: true },
// 			{ promoName: "Download", isPromoIncluded: true },
// 			{ promoName: "Watch Ticket", isPromoIncluded: true },
// 			{ promoName: "Offline Benefits", isPromoIncluded: true },
// 		]
// 	},

// 	{
// 		bundleName: "Gold",
// 		bundlePrice: "¥300 (CNY)",
// 		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et.",
// 		isBundleOn: true,
// 		promoBundle: [
// 			{ promoName: "Video", isPromoIncluded: true },
// 			{ promoName: "Photos", isPromoIncluded: true },
// 			{ promoName: "Live Stream", isPromoIncluded: true },
// 			{ promoName: "Video Call", isPromoIncluded: true },
// 			{ promoName: "Live Chat", isPromoIncluded: true },
// 			{ promoName: "Forever VIP", isPromoIncluded: false },
// 			{ promoName: "Download", isPromoIncluded: true },
// 			{ promoName: "Watch Ticket", isPromoIncluded: true },
// 			{ promoName: "Offline Benefits", isPromoIncluded: false },
// 		]
// 	},
// 	{
// 		bundleName: "Silver",
// 		bundlePrice: "¥200 (CNY)",
// 		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et.",
// 		isBundleOn: true,
// 		promoBundle: [
// 			{ promoName: "Video", isPromoIncluded: true },
// 			{ promoName: "Photos", isPromoIncluded: true },
// 			{ promoName: "Live Stream", isPromoIncluded: true },
// 			{ promoName: "Video Call", isPromoIncluded: false },
// 			{ promoName: "Live Chat", isPromoIncluded: false },
// 			{ promoName: "Forever VIP", isPromoIncluded: false },
// 			{ promoName: "Download", isPromoIncluded: false },
// 			{ promoName: "Watch Ticket", isPromoIncluded: true },
// 			{ promoName: "Offline Benefits", isPromoIncluded: false },
// 		]
// 	},
// 	{
// 		bundleName: "Bronze",
// 		bundlePrice: "¥100 (CNY)",
// 		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et.",
// 		isBundleOn: true,
// 		promoBundle: [
// 			{ promoName: "Video", isPromoIncluded: true },
// 			{ promoName: "Photos", isPromoIncluded: true },
// 			{ promoName: "Live Stream", isPromoIncluded: false },
// 			{ promoName: "Video Call", isPromoIncluded: false },
// 			{ promoName: "Live Chat", isPromoIncluded: false },
// 			{ promoName: "Forever VIP", isPromoIncluded: false },
// 			{ promoName: "Download", isPromoIncluded: false },
// 			{ promoName: "Watch Ticket", isPromoIncluded: false },
// 			{ promoName: "Offline Benefits", isPromoIncluded: false },
// 		]
// 	},
// 	{
// 		bundleName: "Iron",
// 		bundlePrice: "¥50 (CNY)",
// 		bundleDescription: "Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl dolor et magna neque pharetra in porttitor. Sit id rhoncus viverra et.",
// 		isBundleOn: true,
// 		promoBundle: [
// 			{ promoName: "Video", isPromoIncluded: false },
// 			{ promoName: "Photos", isPromoIncluded: true },
// 			{ promoName: "Live Stream", isPromoIncluded: false },
// 			{ promoName: "Video Call", isPromoIncluded: false },
// 			{ promoName: "Live Chat", isPromoIncluded: false },
// 			{ promoName: "Forever VIP", isPromoIncluded: false },
// 			{ promoName: "Download", isPromoIncluded: false },
// 			{ promoName: "Watch Ticket", isPromoIncluded: false },
// 			{ promoName: "Offline Benefits", isPromoIncluded: false },
// 		]
// 	},
// ]

const VIPBundlesCard = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// FETCH ALL VIP BUNDLES
	const { getAllVIPBundles } = BundlesService()
	const { isLoading, data } = useQuery({
		queryKey: ['allVIPBundles'],
		queryFn: () => getAllVIPBundles({
			data: {
				site_id: 1
			},
		}),
		onSuccess: (data) => { console.log("VIP BUNDLES:",data?.bundles) },
		onError: (error) => { console.log(error) }
	})

	return (
		<>
			<Card sx={{ backgroundColor: theme => theme.customBflyColors.alwaysPrimary }} >
				<CardContent sx={{ padding: { xs: 4, sm: 8 } }}>
					<Stack justifyContent={{ xs: "center", sm: "space-between" }} alignItems="center" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={4}>
						<Typography variant="h5" component="div" color="white"> VIP BUNDLES - MEMBERSHIP </Typography>
						<Button variant="contained" onClick={() => setOpen(true)}>CREATE VIP BUNDLE</Button>
					</Stack>
					{isLoading ? 
						<Stack my={16} alignItems="center">
							<CircularProgress />
						</Stack>
						:
						<Grid
							container
							pr={data?.bundles?.length > 4 ? {sm:4} : undefined}
							gap={4}
							justifyContent={{xs: "center", sm: data?.bundles?.length >= 4 ? "space-between" : "flex-start"}}
							sx={{ maxHeight: 525, overflowY: "auto" }}>
							{data?.bundles.map((item: any) =>
								<VIPBundleItem
									key={item._id}
									bundleName={item.name}
									bundlePrice={item.price}
									bundleDescription={item.description}
									isBundleOn={item.active}
									promoBundle={item.perks}
								/>
							)}
						</Grid>
					}
				</CardContent>
			</Card>
			{/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
			<Modal open={open} onClose={handleClose}>
				<VIPBundleModal onClose={handleClose}/>
			</Modal>
		</>
	);
}

export default VIPBundlesCard