// ** React Imports
import React from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Other Imports
import rows from '../../data/TemplateRows'
import columns from '../../data/TemplateColumns'

// ** Style Imports
import styles from '../../styles/thumbnailTableStyles'

interface ThumbnailTableProps {
  xsWidth: string | number
  smWidth: string | number
  mdWidth: string | number
  lgWidth: string | number
  xsHeight: string | number
  smHeight: string | number
  mdHeight: string | number
  lgHeight: string | number
  buttons: boolean
}

const ThumbnailTable = (TableProps: ThumbnailTableProps) => {
  const { xsWidth, smWidth, mdWidth, lgWidth, xsHeight, smHeight, mdHeight, lgHeight, buttons } = TableProps

  const route = useRouter()

  const handleFinishBtn = () => {
    route.push(`/settings`)
  }

  return (
    <Box
      sx={[
        styles.container,
        {
          width: [xsWidth, smWidth, mdWidth, lgWidth],
          height: [xsHeight, smHeight, mdHeight, lgHeight]
        }
      ]}
    >
      <DataGrid rows={rows} columns={columns} sx={styles.datagrid} rowHeight={80} hideFooterPagination hideFooter />

      {buttons ? (
        <Box sx={styles.btnContainer}>
          <Button sx={styles.assignBtn}>Auto Assign</Button>
          <Button sx={styles.finishBtn} onClick={handleFinishBtn}>
            Finish
          </Button>
        </Box>
      ) : null}
    </Box>
  )
}

export default ThumbnailTable
