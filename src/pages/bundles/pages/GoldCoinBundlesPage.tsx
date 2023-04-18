import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import GoldCoinBundleItem from '../components/GoldCoinBundleItem';
import Modal from '@mui/material/Modal';
import GoldCoinBundleModal from '../components/GoldCoinBundleModal';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import BundlesService from '@/services/api/BundlesService';
import { useTranslateString }  from '@/utils/TranslateString';


const GoldCoinBundlesPage = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // FETCH ALL GOLD COIN BUNDLES
  const { getAllCoinsBundle } = BundlesService()
  const { isLoading, data } = useQuery({
    queryKey: ["allCoinsBundle"],
    queryFn: () => getAllCoinsBundle({ data: { site_id: 0 } }),
    onSuccess: (data) => { console.log("COINS BUNDLE:", data?.bundles) },
    onError: (error) => { console.log(error) }
  })

  const TranslateString = useTranslateString()
  
  return (
    <>
      <Stack sx={{ padding: { xs: 4, sm: 8 }}} bgcolor={theme => theme.customBflyColors.alwaysPrimary} borderRadius={1}>
        <Stack justifyContent={{ xs: "center", sm: "space-between" }} flexDirection={{ xs: "column", sm: "row" }} alignItems="center" gap={2} mb={4}>
          <Typography variant="h5" component="div" color="white">{TranslateString("Gold Coin Bundle")}</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>{TranslateString("Create Gold Coin Bundle")}</Button>
        </Stack>
        {isLoading ?
          <Stack my={16} alignItems="center">
            <CircularProgress />
          </Stack>
          :
          <Grid
            container
            gap={10.5}
            justifyContent={{ xs: "center", sm: data?.bundles?.length % 4 === 0 ? "space-between" : "flex-start" }}>
            {data?.bundles?.map((item: any) =>
              <GoldCoinBundleItem
                key={item.bundle_id}
                bundleID={item.bundle_id}
                bundleName={item.name}
                bundlePrice={item.price}
                bundleDescription={item.description}
                isBundleOn={item.active}
              />
            )}
          </Grid>
        }
        </Stack>
      {/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
      {/* CREATING GCB MODAL */}
      <Modal open={open} onClose={handleClose}>
        <GoldCoinBundleModal onClose={handleClose} />
      </Modal>
    </>
  )
}

export default GoldCoinBundlesPage