// ** React Imports
import React,{ useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import SearchToolbar from '@/pages/studio/shared-component/SearchToolbar'
import VideoApprovalDialog from '@/pages/studio/shared-component/VideoApprovalDialog'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataVideosGridRowType } from '@/pages/studio/types/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from '@/data/dummyVideosUploaded'

// ** API Imports
import VideoService from '@/services/api/VideoService'

import TableVideos from './table/TableVideos'

const VideosList = () => {

  React.useEffect( ()=>{
    //initial state load

  },[])

  return (
    <>
      <TableVideos />
    </>
  )
}

export default VideosList
