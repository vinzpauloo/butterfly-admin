// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'


// ** Custom Components
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { VideoType } from '@/types/videoTypes'

// ** API Import
import VideoService from '@/services/api/VideoService'

// ** Utils import
import formatDate from '@/utils/formatDate'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

type SortType = 'asc' | 'desc' | null | undefined

const columns: GridColumns = [
  {
    flex: 0.06,
    minWidth: 70,
    field: 'thumbnail_url',
    headerName: 'Video Thumbnail',
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CustomAvatar src={params.row.thumbnail_url} sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }} />
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.09,
    minWidth: 90,
    headerName: 'Content Creator',
    field: 'content_creator',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.user.username}
      </Typography>
    )
  },
  {
    flex: 0.09,
    minWidth: 60,
    field: 'title',
    headerName: 'Title',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.title}
      </Typography>
    )
  },
  {
    flex: 0.100,
    field: 'category',
    minWidth: 80,
    headerName: 'Category',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.tags.join(", ")}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 140,
    field: 'last_update',
    headerName: 'Last Update',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
         { formatDate(params.row.updated_at) }
      </Typography>
    )
  },
  {
    flex: 0.01,
    minWidth: 60,
    field: 'action',
    headerName: 'Action',
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Icon onClick={() => console.log('setShow')} icon='mdi:eye-outline' fontSize={20} cursor='pointer' />
      </>
    )
  }
]

const TableVideos = () => {
  // ** State
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0)
  const [sortType, setSortType] = useState<SortType>('desc')
  const [pageSize, setPageSize] = useState<number>(7)
  const [rows, setRows] = useState<VideoType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('')

  // ** Service API Calls
  const { getAllVideos } = VideoService()

  //tanstack usage
  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: [
  //     'allVideos',
  //   ],
  //   queryFn: () => getAllVideos( {data:{}} ),
  //   onSuccess : (data : any) => {
  //     console.log('tablevideossuccess', data)
  //   }
  // })

  
  function loadServerRows(currentPage: number, data: VideoType[]) {
    console.log('data',data)
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }

  const fetchTableData = useCallback(
    async (sortType: SortType, q: string, column: string) => {

      const allVids = await getAllVideos({data : { sort: 'created_at', sort_by: sortType, with: 'user' }})

      setRows(loadServerRows(page, allVids.data))
      setTotal(allVids.total)
      
      // await axios
      //   .get('/api/table/data', {
      //     params: {
      //       q,
      //       sort,
      //       column
      //     }
      //   })
      //   .then(res => {
      //     setTotal(res.data.total)
      //     setRows(loadServerRows(page, res.data.data))
      //   })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize]
  )

  useEffect(() => {
    fetchTableData(sortType, searchValue, sortColumn)
  }, [fetchTableData, searchValue, sortType, sortColumn])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSortType(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSortType('desc')
      setSortColumn('content_creator')
    }
  }

  const handleSearch = (value: string) => {
    console.log('value',value)
    setSearchValue(value)
    fetchTableData(sortType, value, sortColumn)
  }

  return (
    <Card>
      <CardHeader title='' />
      <DataGrid
        getRowId={(row)=> row._id}
        autoHeight
        pagination
        rows={rows}
        rowCount={total}
        columns={columns}
        checkboxSelection
        pageSize={pageSize}
        sortingMode='server'
        paginationMode='server'
        onSortModelChange={handleSortModel}
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageChange={newPage => setPage(newPage)}
        components={{ Toolbar: ServerSideToolbar }}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        componentsProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default TableVideos
