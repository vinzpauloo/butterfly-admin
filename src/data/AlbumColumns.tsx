// ** React Imports
import React from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'

// ** Project Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** Utils Imports
import formatDate from '@/utils/formatDate'
import { useTranslateString } from '@/utils/TranslateString'

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

export const AlbumColumns = () => {
  const TranslateString = useTranslateString()

  return [
    {
      flex: 0.04,
      minWidth: 220,

      field: 'title',
      headerName: TranslateString('Title')
    },
    {
      flex: 0.03,
      minWidth: 200,

      field: 'created_at',
      headerName: TranslateString('Date Created'),
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.03,
      minWidth: 200,

      field: 'updated_at',
      headerName: TranslateString('Last Update'),
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.03,
      minWidth: 120,

      field: 'cover',
      headerName: TranslateString('Cover Photo'),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CustomAvatar
                src={
                  FILE_SERVER_URL + params?.row.cover.cover_photo || FILE_SERVER_URL + params?.row.cover[0].cover_photo
                }
                sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
              />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.01,
      minWidth: 95,

      field: 'album',
      headerName: TranslateString('Gallery'),
      renderCell: (params: GridRenderCellParams) => {
        return <ToggleView data={params.row._id} />
      }
    }
  ]
}
