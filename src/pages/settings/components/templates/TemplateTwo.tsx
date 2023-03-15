// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** Material UI Imports
import { Box, Typography } from '@mui/material'

// ** Other Imports
import ThumbnailTable from '../tables/ThumbnailTable'

// ** Style Imports
import styles from '../../styles/templateTwoStyles'

type PortraitProps = {
  num: number | string
}

const Portrait: React.FC<PortraitProps> = ({ num }) => {
  return (
    <Box sx={styles.template}>
      <Box sx={styles.image}>
        <Image src='/images/icons/butterfly-template-icon.png' width={100} height={100} alt='template icon' />
      </Box>
      <Typography sx={styles.text}>{num}</Typography>
    </Box>
  )
}

const TemplateTwo = () => {
  return (
    <Box sx={styles.t2Container}>
      <Box sx={styles.t2Layout}>
        <Box sx={styles.templateContainer}>
          <Portrait num={1} />
          <Portrait num={2} />
          <Portrait num={3} />
          <Portrait num={4} />
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

export default TemplateTwo
