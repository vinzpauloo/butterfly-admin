import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GoldCoinBundleModal from '../components/GoldCoinBundleModal';
import GoldCoinTableItem from '../components/GoldCoinTableItem';
import BundlesService from '../../../services/api/BudlesService';
import { useQuery } from '@tanstack/react-query';
import { Button, Stack } from '@mui/material';

const tableHeader = [
	"Bundle Name",
	"Description",
	"Price",
	"Active / Edit / Delete"
]

const loadingArray = [1,2,3,4,5,6]


const GoldCoinTablesPage = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// FETCH ALL GOLD COIN BUNDLES
	const { getAllCoinsBundle } = BundlesService()
	const { isLoading, data } = useQuery({
		queryKey: ["allCoinsBundle"],
		queryFn: () => getAllCoinsBundle({ data: { site_id: 1 } }),
		onSuccess: (data) => { console.log("COINS BUNDLE:", data?.bundles) },
		onError: (error) => { console.log(error) }
	})
	
	return (
		<>
			<Stack justifyContent={{ xs: "center", sm: "space-between" }} flexDirection={{ xs: "column", sm: "row" }} alignItems="center" gap={2} mb={4}>
				<Typography variant="h5" component="div" color="primary"> GOLD COIN BUNDLES </Typography>
				<Button variant="contained" onClick={() => setOpen(true)}>CREATE GOLD BUNDLE</Button>
			</Stack>
			<TableContainer sx={{ maxHeight: 600, borderRadius:1}}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{tableHeader.map((item, index) =>
								<TableCell
									align={index === tableHeader.length - 1 ? "right" : "left"}
									key={index}>{item}
								</TableCell>
							)}						
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ? 
							loadingArray.map((item, index) => 
								<TableRow key={index} >
									<TableCell>Loading...</TableCell>
									<TableCell>Loading...</TableCell>
									<TableCell>Loading...</TableCell>
									<TableCell>Loading...</TableCell>
								</TableRow>
							)
								:
							data?.bundles?.map((item: any) => 
								<GoldCoinTableItem
									key={item.bundle_id}
									bundleID={item.bundle_id}
									bundleName={item.name}
									bundleDescription={item.description}
									bundlePrice={item.price}
									isBundleOn={item.active}
								 />
							)
						}
					</TableBody>
				</Table>
			</TableContainer>
			{/* CREATING GCB MODAL */}
			{/* WORKING~~ */}
			<Modal open={open} onClose={handleClose}>
				<GoldCoinBundleModal onClose={handleClose} />
			</Modal>
		</>
	);

}

export default GoldCoinTablesPage