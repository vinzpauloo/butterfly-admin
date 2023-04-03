import React, { useEffect, useState } from 'react'

import * as yup from 'yup'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import Container from './components/Container'
import WorkgroupService from '@/services/api/Workgroup'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import WorkGroupDrawer from './components/drawer/WorkGroupDrawer'

const navData = [
  {
    value: 'selection',
    text: 'selection'
  },
  {
    value: 'latest',
    text: 'latest'
  },
  {
    value: 'original',
    text: 'original'
  },
  {
    value: 'homemade',
    text: 'homemade'
  },
  {
    value: 'hot',
    text: 'hot'
  },
  {
    value: 'local',
    text: 'local'
  },
  {
    value: 'pornstar',
    text: 'pornstar'
  },
  {
    value: 'loli',
    text: 'loli'
  },
  {
    value: 'av',
    text: 'av'
  },
  {
    value: 'animation',
    text: 'animation'
  }
]

const templateData = [
  {
    value: 'videoslider',
    text: 'videoSlider'
  },
  {
    value: 'reelslider',
    text: 'reelSlider'
  },
  {
    value: 'singlevideo',
    text: 'singleVideo'
  },
  {
    value: 'singlevideowithgrid',
    text: 'singleVideoWithGrid'
  },
  {
    value: 'singlevideolist',
    text: 'singleVideoList'
  },
  {
    value: 'grid',
    text: 'grid'
  }
]

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const Header = ({ page, setData, setPage, setPageSize, setRowCount, setOpen, setHeader }: any) => {
  const { getSearchWorkgroups } = WorkgroupService()
  const [search_value, setTitle] = useState('')
  const [navbar, setNavbar] = useState('')
  const [template_id, setTemplate] = useState('')

  const debouncedTitle = useDebounce(search_value, 1000)

  const filterParams = () => {
    const title = !!search_value && { search_value }
    const nav = !!navbar && { navbar }
    const template = !!template_id && { template_id }

    return { ...title, ...nav, ...template }
  }

  const {} = useQuery({
    queryKey: ['search-workgroup', debouncedTitle, navbar, template_id, page],
    queryFn: () =>
      getSearchWorkgroups({
        page: page,
        search_by: 'title',
        select: '_id,navbar,title,template_id',
        ...filterParams()
      }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    enabled: !!debouncedTitle || !!template_id || !!navbar
  })

  const handleClick = () => {
    setHeader('Add')
    setOpen(true)
  }

  return (
    <Box mb={2}>
      <Typography variant='h4' component='h4' mb={5}>
        Workgroup
      </Typography>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={900}>
          <OutlinedInput
            fullWidth
            style={{ marginRight: 10 }}
            placeholder='Search'
            size='small'
            value={search_value}
            onChange={e => setTitle(e.target.value)}
          />
          <FormControl fullWidth size='small' style={{ marginRight: 10 }}>
            <InputLabel id='demo-simple-select-label'>Navbar</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={navbar}
              label='Navbar'
              onChange={e => setNavbar(e.target.value)}
            >
              {navData.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size='small'>
            <InputLabel id='demo-simple-select-label'>Template</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={template_id}
              label='Template'
              onChange={e => setTemplate(e.target.value)}
            >
              {templateData.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button variant='contained' onClick={handleClick}>
          Add Workgroup
        </Button>
      </Box>
    </Box>
  )
}

const Table = ({
  data,
  isLoading,
  setPage,
  pageSize,
  setPageSize,
  rowCount,
  setOpen,
  setHeader,
  setSectionID,
  setTitle
}: any) => {
  const columnData = [
    {
      field: 'title',
      headerName: 'Title',
      width: 650
    },
    {
      field: 'navbar',
      headerName: 'Navbar',
      width: 300
    },
    {
      field: 'template_id',
      headerName: 'Template ID',
      width: 300
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params: any) => {
        const handleClick = () => {
          setHeader('Edit')
          setOpen(true)
          setSectionID(params.id)
          setTitle(params.row.title)
        }

        return (
          <Box>
            <Button onClick={handleClick}>
              <EditOutlinedIcon sx={styles.icon} />
            </Button>
          </Box>
        )
      }
    }
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  return (
    <DataGrid
      rowCount={rowCount}
      pageSize={pageSize}
      paginationMode='server'
      getRowId={row => row._id}
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      loading={isLoading}
      rows={data}
      rowsPerPageOptions={[10, 25, 50]}
      columns={columnData}
      pagination
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}

function index() {
  const { getWorkgroup } = WorkgroupService()
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [header, setHeader] = useState('')
  const [sectionID, setSectionID] = useState('')
  const [title, setTitle] = useState('')

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['workgroup', page, pageSize],
    queryFn: () => getWorkgroup({ page: page, paginate: pageSize }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    onError: err => {
      console.log('workgroup error: ', err)
    }
  })

  return (
    <>
      <Container>
        <Header
          setData={setData}
          page={page}
          setPage={setPage}
          setPageSize={setPageSize}
          setRowCount={setRowCount}
          setOpen={setOpen}
          setHeader={setHeader}
        />
        <Table
          data={data}
          isLoading={isLoading || isRefetching}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          rowCount={rowCount}
          setOpen={setOpen}
          setHeader={setHeader}
          setSectionID={setSectionID}
          setTitle={setTitle}
        />
      </Container>

      {open ? (
        <WorkGroupDrawer
          open={open}
          setOpen={setOpen}
          header={header}
          sectionID={sectionID}
          title={title}
          setTitle={setTitle}
        />
      ) : null}
    </>
  )
}

const styles = {
  button: {
    background: 'transparent',
    border: 'none'
  },
  icon: {
    color: '#98A9BC',
    fontSize: 30
  }
}

export default index
