// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Button, CircularProgress, Grid, Menu, MenuItem, Modal, Stack, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// ** Project/Other Imports
import VIPBundleModal from '../components/VIPBundleModal'
import VIPBundleItem from '../components/VIPBundleItem'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services Imports
import BundlesService from '@/services/api/BundlesService'
import SitesService from '@/services/api/SitesService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

const VIPBundlesPage = () => {
  const { handleError } = useErrorHandling()

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
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
    queryFn: () =>
      getAllVIPBundles({
        data: {
          site_id: selectedSiteID,
          with: 'sites',
          exclude: selectedSiteID === undefined ? 0 : undefined
        }
      }),
    onSuccess: data => {
      console.log('VIP BUNDLES:', data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getAllVIPBundles() VIPBundlesPage`)
    }
  })

  // AS GOD USER, WE FETCH THE UNIQUE SITE IDs
  const { getSitesList } = SitesService()
  const {} = useQuery({
    queryKey: ['allSitesList'],
    queryFn: () => getSitesList({}),
    onSuccess: data => {
      console.log('SITES LIST:', data?.data)
      setUniqueSites(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getSitesList() VIPBundlesPage`)
    }
  })

  return (
    <>
      <Stack>
        <Stack
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems='center'
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          mb={4}
        >
          <Box display='flex' flexDirection={['column', 'row']} gap={4} alignItems='center'>
            <Typography variant='h5' component='div' color='black'>
              {TranslateString('VIP Bundle')} - {TranslateString('Membership')}
            </Typography>
            <Button variant='outlined' size='small' onClick={openMenu} endIcon={<KeyboardArrowDownIcon />}>
              {selectedSiteID === 0 ? 'Default' : null}
              {selectedSiteID === undefined ? 'All Sites' : null}
              {uniqueSites.find((item: any) => item.id === selectedSiteID)?.name}
            </Button>
            <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={closeMenu}>
              <MenuItem
                onClick={() => {
                  setSelectedSiteID(undefined)
                  closeMenu()
                }}
              >
                All Sites
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedSiteID(0)
                  closeMenu()
                }}
              >
                0: Default
              </MenuItem>
              {uniqueSites.map((item: any) => (
                <MenuItem
                  key={item}
                  onClick={() => {
                    setSelectedSiteID(item?.id)
                    closeMenu()
                  }}
                >
                  {item?.id}: {item?.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button variant='contained' onClick={() => setOpen(true)}>
            {TranslateString('Create VIP Bundle')}
          </Button>
        </Stack>
        {isLoading ? (
          <Stack my={16} alignItems='center'>
            <CircularProgress />
          </Stack>
        ) : (
          <Grid
            container
            gap={4}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
          >
            {data?.data?.map((item: any) => (
              <VIPBundleItem
                key={item._id}
                bundleID={item._id}
                site_id={item.site_id}
                bundleName={item.name}
                bundlePrice={item.price}
                bundleDescription={item.description}
                bundleDuration={item.duration_days}
                isBundleOn={item.active}
                bundlePerks={item.perks}
                siteName={item.sites === null ? 'Default' : item.sites.name}
              />
            ))}
          </Grid>
        )}
      </Stack>
      {/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
      {/* CREATING VIP MODAL */}
      <Modal open={open} onClose={handleClose}>
        <VIPBundleModal onClose={handleClose} uniqueSites={uniqueSites} />
      </Modal>
    </>
  )
}

export default VIPBundlesPage
