import React from 'react'
import { Box, Button, Drawer, Grid, Typography } from '@mui/material'
import TranslateString from '@/utils/TranslateString'

function ShowWithdrawDrawer({ open, setOpen }: any) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 600 } } }}
    >
      <Box height='100%' display='flex' flexDirection='column' alignItems='center' p={5} sx={{ background: '#3c4b64' }}>
        <Box display='flex' alignItems='center' justifyContent='space-around' width='100%'>
          <Typography color='#FFF'>{TranslateString("Withdraw Request")}</Typography>
          <Typography color='#FFF'>Ticket Nos.: 000123</Typography>
        </Box>
        <Box mt={2} p={2} sx={styles.donation}>
          <Typography variant='h6' textTransform="uppercase">{TranslateString("Donation Record")}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Donations
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Donations
              </Typography>
            </Grid>
            {/* This will change later if going to integrate the API */}
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Site 1
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Y1,000 CNY
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Site 2
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Y1,800 CNY
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Site 3
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Y3,500 CNY
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Site 4
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Y1,200 CNY
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Site 5
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1' align='center'>
                Y13,050 CNY
              </Typography>
            </Grid>
          </Grid>
          <Typography mt={2} variant='h6' textTransform="uppercase">
            {TranslateString("Donation Total")}: Y20,550
          </Typography>
        </Box>
        <Box mt={2} p={2} sx={styles.donation}>
          <Typography variant='h6' textTransform="uppercase">{TranslateString("Total Amount to Withdraw")}</Typography>
          <Box mt={2} style={{ border: '1px solid #000', borderRadius: 10 }} px={3}>
            <Typography variant='h4'>Y41,100 CNY</Typography>
          </Box>
        </Box>
        <Box mt={2} p={2} sx={styles.donation}>
          <Typography variant='h6' textTransform="uppercase">{TranslateString("Notes")}</Typography>
          <Box mt={2} style={{ border: '1px solid #000', borderRadius: 10 }} px={3}>
            <Typography variant='body1' p={2} align='center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </Typography>
          </Box>
        </Box>
        <Box mt={2} p={2} sx={styles.donation}>
          <Typography textTransform="uppercase">{TranslateString("Action")}</Typography>
          <Box mt={2} display='flex' alignItems='center' justifyContent='space-evenly' width='100%'>
            <Button variant='contained' color='warning'>
              {TranslateString("Pending")}
            </Button>
            <Button variant='contained' color='error'>
              {TranslateString("Decline")}
            </Button>
            <Button variant='contained' color='success'>
              {TranslateString("Approve")}
            </Button>
            <Button variant='contained' style={{ backgroundColor: 'cyan' }}>
              {TranslateString("Done")}
            </Button>
          </Box>
        </Box>
        <Box mt={5}>
          <Button style={{ marginRight: 20, textTransform: "uppercase" }} variant='contained' onClick={handleClose}>
            {TranslateString("Back")}
          </Button>
          <Button style={{ marginLeft: 20, textTransform: "uppercase" }} variant='contained'>
            {TranslateString("Update")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

const styles = {
  donation: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: '5px'
  }
}

export default ShowWithdrawDrawer
