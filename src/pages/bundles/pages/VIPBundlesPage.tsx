import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import VIPBundleItem from '../components/VIPBundleItem';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import VIPBundleModal from '../components/VIPBundleModal';
import CircularProgress from '@mui/material/CircularProgress';
import BundlesService from '@/services/api/BundlesService';
import { useQuery } from '@tanstack/react-query';
import TranslateString from '@/utils/TranslateString';

const VIPBundlesPage = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // FETCH ALL VIP BUNDLES
  const { getAllVIPBundles } = BundlesService()
  const { isLoading, data } = useQuery({
    queryKey: ['allVIPBundles'],
    queryFn: () => getAllVIPBundles({data: {site_id: 0}}),
    onSuccess: (data) => { console.log("VIP BUNDLES:", data?.bundles) },
    onError: (error) => { console.log(error) }
  })
  
  return (
    <>
      <Stack sx={{ padding: { xs: 4, sm: 8 }}} bgcolor={theme => theme.customBflyColors.alwaysPrimary} borderRadius={1}>
        <Stack justifyContent={{ xs: "center", sm: "space-between" }} alignItems="center" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={4}>
          <Typography variant="h5" component="div" color="white">{TranslateString("VIP Bundle")} - {TranslateString("Membership")}</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>{TranslateString("Create VIP Bundle")}</Button>
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
            {data?.bundles.map((item: any) =>
              <VIPBundleItem
                key={item.bundle_id}
                bundleID={item.bundle_id}
                bundleName={item.name}
                bundlePrice={item.price}
                bundleDescription={item.description}
                isBundleOn={item.active}
                bundlePerks={item.perks}
              />
            )}
          </Grid>
        }
      </Stack>
      {/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
      {/* CREATING VIP MODAL */}
      <Modal open={open} onClose={handleClose}>
        <VIPBundleModal onClose={handleClose} />
      </Modal>
    </>
  );
}

export default VIPBundlesPage