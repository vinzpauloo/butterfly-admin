import React from 'react'

// ** MUI Imports
import { Box, Card, Grid, Tab, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

import { useRouter } from 'next/router'

import ToggleButton from '@/pages/user/components/button/ToggleButton'
import formatDate from '@/utils/formatDate'

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { GridRenderCellParams } from '@mui/x-data-grid'

import Translations from '@/layouts/components/Translations'

interface ToggleViewProps {
  data: any
}

const ToggleView: React.FC<ToggleViewProps> = ({ data }) => {
  const router = useRouter()

  const handleViewClick = () => {
    router.push(`/studio/album/upload/EditAlbum?${data}`)
  }

  return <Icon onClick={handleViewClick} icon='mdi:eye-outline' fontSize={20} cursor='pointer' />
}

export const AlbumColumns = [
  {
    field: 'title',
    headerName: <Translations text='Title' />,
    width: 400
  },
  {
    field: 'created_at',
    headerName: <Translations text='Date Created' />,
    width: 250,
    valueFormatter: (params: any) => {
      return formatDate(params?.value)
    }
  },
  {
    field: 'updated_at',
    headerName: <Translations text='Last Update' />,
    width: 250,
    valueFormatter: (params: any) => {
      return formatDate(params?.value)
    }
  },
  {
    field: 'cover',
    headerName: <Translations text='Cover Photo' />,
    width: 250,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CustomAvatar
              src={params?.row.cover.cover_photo || params?.row.cover[0].cover_photo}
              sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
            />
          </Box>
        </Box>
      )
    }
  },
  {
    field: 'album',
    headerName: <Translations text='Gallery' />,
    width: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <ToggleView data={params.row._id} />
    }
  }
]
