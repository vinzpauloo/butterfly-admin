// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** Material UI Imports
import { Box, Grid, Paper } from '@mui/material'

// ** Other Imports
import ThumbnailTable from '../tables/ThumbnailTable'

// ** Style Imports
import styles from '../../styles/templateFourStyles'

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

export default TemplateFour
