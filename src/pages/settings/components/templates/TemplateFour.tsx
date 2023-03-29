// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** Material UI Imports
import { Box, Grid, Paper } from '@mui/material'

// ** Other Imports
import ThumbnailTable from '../tables/ThumbnailTable'

// ** Style Imports

const GridContent = () => {
  return (
    <Grid item xs={6}>
      <Paper sx={styles.paper}>
        <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='template icon' />
      </Paper>
    </Grid>
  )
}

const TemplateFour = () => {
  return (
    <Box sx={styles.t4Container}>
      <Box sx={styles.t4Layout}>
        <Box sx={styles.templateContainer}>
          <Grid container spacing={3} mt={1}>
            {[...Array(6)].map((_, index) => (
              <GridContent key={index} />
            ))}
          </Grid>
        </Box>
      </Box>

      <Box sx={styles.tableContainer}>
        <ThumbnailTable
          xsWidth={'100%'}
          smWidth={'100%'}
          mdWidth={'100%'}
          lgWidth={'100%'}
          xsHeight={'100%'}
          smHeight={'100%'}
          mdHeight={'65dvh'}
          lgHeight={'65dvh'}
          buttons={true}
        />
      </Box>
    </Box>
  )
}

const styles = {
  t4Container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    gap: 5,
    marginTop: 5
  },
  t4Layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A3446',
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%'
    },
    height: '70dvh',
    borderRadius: '12px',
    padding: 0,
    overflow: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '20px'
    }
  },
  templateContainer: {
    margin: '0 50px 0 50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },

  //Grid
  paper: {
    backgroundColor: 'grey',
    padding: {
      xs: '45px',
      lg: '60px'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  //Table
  tableContainer: {
    backgroundColor: '#2A3446',
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%',
      lg: '50%'
    },
    height: '70dvh',
    borderRadius: '12px',
    padding: 5
  }
}

export default TemplateFour
