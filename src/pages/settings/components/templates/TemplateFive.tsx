// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Button } from '@mui/material'

// ** Other Imports
import ThumbnailTable from '../tables/ThumbnailTable'

// ** Style Imports
import styles from '../../styles/templateFiveStyles'

const Landscape = () => {
  return (
    <Box sx={styles.landscape}>
      <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='operator-icon' />
    </Box>
  )
}

const TemplateFive = () => {
  const route = useRouter()

  const handleFinishBtn = () => {
    route.push(`/settings`)
  }

  return (
    <Box sx={styles.t5Container}>
      <Box sx={styles.t5Layout}>
        <Box sx={styles.template}>
          {[...Array(4)].map((_, index) => (
            <Landscape key={index} />
          ))}
        </Box>
      </Box>

      <Box sx={styles.tableContainer}>
        <Box sx={styles.tableScroll}>
          <Box sx={styles.table}>
            {[...Array(4)].map((_, index) => (
              <ThumbnailTable
                key={index}
                xsWidth={'100%'}
                smWidth={'100%'}
                mdWidth={'100%'}
                lgWidth={'100%'}
                xsHeight={'30dvh'}
                smHeight={'32dvh'}
                mdHeight={'35dvh'}
                lgHeight={'35dvh'}
                buttons={false}
              />
            ))}
          </Box>
        </Box>

        <Box sx={styles.btnContainer}>
          <Button sx={styles.assignBtn}>Auto Assign</Button>
          <Button sx={styles.finishBtn} onClick={handleFinishBtn}>
            Finish
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateFive
