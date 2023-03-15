// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** Material UI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ThumbnailTable from '../tables/ThumbnailTable'

// ** Style Imports
import styles from '../../styles/templateOneStyles'

const TemplateOne = () => {
  return (
    <Box sx={styles.t1Container}>
      <Box sx={styles.t1Layout}>
        <Image src='/images/icons/butterfly-template-icon.png' width={100} height={100} alt='template icon' />
      </Box>

      <ThumbnailTable
        xsWidth={'120%'}
        smWidth={'110%'}
        mdWidth={'100%'}
        lgWidth={'50%'}
        xsHeight={'100%'}
        smHeight={'100%'}
        mdHeight={'400px'}
        lgHeight={'400px'}
        buttons={true}
      />
    </Box>
  )
}

export default TemplateOne
