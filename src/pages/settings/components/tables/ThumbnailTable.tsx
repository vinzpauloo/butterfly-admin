// ** React Imports
import React from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'


// ** Style Imports

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

import CustomAvatar from 'src/@core/components/mui/avatar'

const rows = [
  {
    id: 1,
    thumbnail: '/images/avatars/cc/1.png',
    title: 'Wholesome Video',
    lastUpdate: '2022-03-14'
  },
  {
    id: 2,
    thumbnail: '/images/avatars/cc/2.png',
    title: 'Bended Silver Spoon',
    lastUpdate: '2022-03-14'
  },
  {
    id: 3,
    thumbnail: '/images/avatars/cc/3.png',
    title: 'Wish You Were Here',
    lastUpdate: '2022-03-14'
  },
  {
    id: 4,
    thumbnail: '/images/avatars/cc/4.png',
    title: 'Wish You Were Here',
    lastUpdate: '2022-03-14'
  },
  {
    id: 5,
    thumbnail: '/images/avatars/cc/5.png',
    title: 'Wish You Were Here',
    lastUpdate: '2022-03-14'
  },
  {
    id: 6,
    thumbnail: '/images/avatars/cc/6.png',
    title: 'Wish You Were Here',
    lastUpdate: '2022-03-14'
  },
  {
    id: 7,
    thumbnail: '/images/avatars/cc/7.png',
    title: 'Wish You Were Here',
    lastUpdate: '2022-03-14'
  }
]

const columns = [
  {
    field: 'thumbnail',
    headerName: 'Video Thumbnail',
    flex: 0.1,
    minWidth: 300,
    renderCell: (params: any) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin='light'
            src={params.value}
            sx={{
              borderRadius: '10px',
              mr: 3,
              fontSize: '.8rem',
              width: '7.875rem',
              height: '4rem'
            }}
          ></CustomAvatar>
        </Box>
      )
    }
  },
  { field: 'title', headerName: 'Title', flex: 0.1, minWidth: 200 },
  { field: 'lastUpdate', headerName: 'Last Update', flex: 0.1, minWidth: 200 }
]

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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  //DataGrid
  datagrid: {
    width: '100%',
    backgroundColor: '#FFF'
  },

  //Button
  btnContainer: {
    display: 'flex',
    gap: 5
  },
  assignBtn: {
    backgroundColor: '#FFF',
    color: '#000',
    marginTop: 5,
    width: 120,
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0',
      color: '#FFF'
    }
  },
  finishBtn: {
    backgroundColor: '#9747FF',
    color: '#FFF',
    marginTop: 5,
    width: 120,
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0'
    }
  }
}


export default ThumbnailTable
