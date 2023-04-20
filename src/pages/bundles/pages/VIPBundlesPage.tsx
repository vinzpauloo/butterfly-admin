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
import { useTranslateString } from '@/utils/TranslateString';
import SitesService from '@/services/api/SitesService';
import { Box, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const VIPBundlesPage = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)
  const isMenuOpen = Boolean(anchorEl)
  const [selectedSiteID, setSelectedSiteID] = useState<any>(undefined)
  const [uniqueSites, setUniqueSites] = useState<any>([])
  const TranslateString = useTranslateString()

  // FETCH ALL VIP BUNDLES
  const { getAllVIPBundles } = BundlesService()
  const { isLoading, data } = useQuery({
    queryKey: ['allVIPBundles', selectedSiteID],
    queryFn: () => getAllVIPBundles({
      data: {
        site_id: selectedSiteID,
        with: "sites",
        exclude: selectedSiteID === undefined ? 0 : undefined
      }
    }),
    onSuccess: (data) => { console.log("VIP BUNDLES:", data?.data) },
    onError: (error) => { console.log(error) }
  })

  // AS GOD USER, WE FETCH THE UNIQUE SITE IDs
  const { getSitesList } = SitesService()
  const { } = useQuery({
    queryKey: ["allSitesList"],
    queryFn: () => getSitesList({}),
    onSuccess: (data) => { console.log("SITES LIST:", data?.data); setUniqueSites(data?.data) },
    onError: (error) => { console.log(error) }
  })

  
  return (
    <>
      <Stack sx={{ padding: { xs: 4, sm: 8 }}} bgcolor={theme => theme.customBflyColors.alwaysPrimary} borderRadius={1}>
        <Stack justifyContent={{ xs: "center", sm: "space-between" }} alignItems="center" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={4}>
          <Box display="flex" gap={10} alignItems="center">
            <Typography variant="h5" component="div" color="white">{TranslateString("VIP Bundle")} - {TranslateString("Membership")}</Typography>
            <Button variant="contained" onClick={openMenu} endIcon={<KeyboardArrowDownIcon />}>
              {selectedSiteID === 0 ? "Default" : null}
              {selectedSiteID === undefined ? "All Sites" : null}
              {uniqueSites.find((item: any) => item.id === selectedSiteID)?.name}
            </Button>
            <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={closeMenu}>
              <MenuItem onClick={() => { setSelectedSiteID(undefined); closeMenu() }}>All Sites</MenuItem>
              <MenuItem onClick={() => { setSelectedSiteID(0); closeMenu() }}>0: Default</MenuItem>
              {uniqueSites.map((item: any) =>
                <MenuItem key={item} onClick={() => { setSelectedSiteID(item?.id); closeMenu() }}>{item?.id}: {item?.name}</MenuItem>
              )}
            </Menu>
          </Box>
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
            justifyContent={{ xs: "center", sm: data?.data?.length % 4 === 0 ? "space-between" : "flex-start" }}>
            {data?.data?.map((item: any) =>
              <VIPBundleItem
                key={item._id}
                bundleID={item._id}
                site_id={item.site_id}
                bundleName={item.name}
                bundlePrice={item.price}
                bundleDescription={item.description}
                isBundleOn={item.active}
                bundlePerks={item.perks}
                siteName={item.sites === null ? "Default" : item.sites.name}
              />
            )}
          </Grid>
        }
      </Stack>
      {/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
      {/* CREATING VIP MODAL */}
      <Modal open={open} onClose={handleClose}>
        <VIPBundleModal onClose={handleClose} uniqueSites={uniqueSites} />
      </Modal>
    </>
  );
}

export default VIPBundlesPage