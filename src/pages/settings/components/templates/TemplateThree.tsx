// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** Material UI Imports
import { Box, Grid, Paper } from '@mui/material'

// ** Other Imports
import ThumbnailTable from '../tables/ThumbnailTable'

// ** Style Imports
import styles from '../../styles/templateThreeStyles'

const GridContent = () => {
  return (
    <Grid item xs={6}>
      <Paper sx={styles.paper}>
        <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
      </Paper>
    </Grid>
  )
}

const TemplateThree = () => {
  return (
    <Box sx={styles.t3Container}>
      <Box sx={styles.t3Layout}>
        <Box>
          <Box sx={styles.templateContainer}>
            <Box sx={styles.image}>
              <Image src='/images/icons/butterfly-template-icon.png' width={100} height={100} alt='template icon' />
            </Box>

            <Grid container spacing={3} mt={1}>
              {[...Array(4)].map((_, index) => (
                <GridContent key={index} />
              ))}
            </Grid>
          </Box>
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

export default TemplateThree
