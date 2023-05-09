// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack
} from '@mui/material'

// ** Project/Other Imports
import GoldCoinBundleModal from '../components/GoldCoinBundleModal'
import GoldCoinTableItem from '../components/GoldCoinTableItem'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services Imports
import BundlesService from '@/services/api/BundlesService'
import { captureError } from '@/services/Sentry'

const tableHeader = ['Site ID', 'Bundle Name', 'Description', 'Price', 'Active / Edit / Delete']

const loadingArray = [1, 2, 3, 4, 5, 6]

const GoldCoinTablesPage = () => {
  const router = useRouter()
  const currentLocation = router.asPath

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  // FETCH ALL GOLD COIN BUNDLES
  const { getAllCoinsBundle } = BundlesService()
  const { isLoading, data } = useQuery({
    queryKey: ['allCoinsBundle'],
    queryFn: () => getAllCoinsBundle({}),
    onSuccess: data => {
      console.log('COINS BUNDLE:', data?.data)
    },
    onError: (e: any) => {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value} getAllCoinsBundle() GoldCoinTablesPage`)
        })
      }
    }
  })

  return (
    <>
      <Stack
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems='center'
        gap={2}
        mb={4}
      >
        <Typography variant='h5' component='div' color='primary'>
          {' '}
          GOLD COIN BUNDLES{' '}
        </Typography>
        <Button variant='contained' onClick={() => setOpen(true)}>
          CREATE GOLD BUNDLE
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 600, borderRadius: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeader.map((item, index) => (
                <TableCell align={index === tableHeader.length - 1 ? 'right' : 'left'} key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? loadingArray.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>Loading...</TableCell>
                    <TableCell>Loading...</TableCell>
                    <TableCell>Loading...</TableCell>
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                ))
              : data?.data?.map((item: any) => (
                  <GoldCoinTableItem
                    key={item._id}
                    bundleID={item._id}
                    site_id={item.site_id}
                    bundleName={item.name}
                    bundleDescription={item.description}
                    bundlePrice={item.price}
                    isBundleOn={item.active}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* CREATING GCB MODAL */}
      {/* WORKING~~ */}
      <Modal open={open} onClose={handleClose}>
        <GoldCoinBundleModal onClose={handleClose} />
      </Modal>
    </>
  )
}

export default GoldCoinTablesPage
