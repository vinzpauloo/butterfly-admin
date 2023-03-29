// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** Material UI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ThumbnailTable from '../tables/ThumbnailTable'

// ** Style Imports

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

const styles = {
  t1Container: {
    backgroundColor: '#2A3446',
    width: '100%',
    height: {
      xs: '100dvh',
      sm: '100dvh',
      md: '80dvh',
      lg: '50dvh'
    },
    marginTop: 10,
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10
  },
  t1Layout: {
    backgroundColor: 'grey',
    width: {
      xs: '120%',
      sm: '110%',
      md: '100%',
      lg: '50%'
    },
    height: {
      xs: '300px',
      sm: '300px',
      md: '520px',
      lg: '400px'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default TemplateOne
