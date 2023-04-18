/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import Container from './components/Container'
import WorkgroupService from '@/services/api/Workgroup'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import WorkGroupDrawer from './components/drawer/WorkGroupDrawer'
import Image from 'next/image'
import { useTranslateString } from '@/utils/TranslateString';


const navData = [
  {
    value: 'selection',
    text: 'Selection'
  },
  {
    value: 'latest',
    text: 'Latest'
  },
  {
    value: 'original',
    text: 'Original'
  },
  {
    value: 'homemade',
    text: 'Homemade'
  },
  {
    value: 'hot',
    text: 'Hot'
  },
  {
    value: 'local',
    text: 'Local'
  },
  {
    value: 'pornstar',
    text: 'Pornstar'
  },
  {
    value: 'loli',
    text: 'Loli'
  },
  {
    value: 'av',
    text: 'AV'
  },
  {
    value: 'animation',
    text: 'Animation'
  }
]

const templateData = [
  {
    value: 'videoSlider',
    text: 'Video Slider',
    image: '/images/template/videoSlider.png'
  },
  {
    value: 'reelslider',
    text: 'Reel Slider',
    image: '/images/template/reelSlider.png'
  },
  {
    value: 'singleVideoWithGrid',
    text: 'Single Video With Grid',
    image: '/images/template/singleVideoWithGrid.png'
  },
  {
    value: 'singleVideoList',
    text: 'Single Video List',
    image: '/images/template/singleVideoList.png'
  },
  {
    value: 'grid',
    text: 'Grid',
    image: '/images/template/grid.png'
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

const Header = ({ setOpen, setHeader, title, navbar, template_id, setSearchValue, setNavbar, setTemplate }: any) => {
  const handleClick = () => {
    setHeader('Add')
    setOpen(true)
  }

  const handleClear = () => {
    setSearchValue('')
    setNavbar('')
    setTemplate('')
  }

  const TranslateString = useTranslateString()

  return (
    <Box mb={2}>
      <Typography variant='h4' component='h4' mb={5}>{TranslateString("Workgroup")}</Typography>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={2.5}>
          <OutlinedInput
            fullWidth
            placeholder={TranslateString("Search")}
            size='small'
            value={title}
            onChange={e => setSearchValue(e.target.value)}
          />
          <FormControl fullWidth size='small'>
            <InputLabel id='demo-simple-select-label'>{TranslateString("Navbar")}</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={navbar}
              label={TranslateString("Navbar")}
              onChange={e => setNavbar(e.target.value)}
            >
              {navData.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {TranslateString(item.text)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size='small'>
            <InputLabel id='demo-simple-select-label'>{TranslateString("Template")}</InputLabel>
            <Select
              style={{ display: 'flex', alignItems: 'center' }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={template_id}
              label={TranslateString("Template")}
              onChange={e => setTemplate(e.target.value)}
            >
              {templateData.map((item, index) => (
                <MenuItem key={index} value={item.value} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box display='flex' alignItems='center'>
                    <Image src={item.image} alt='dfs' width='24' height='24' style={{ marginRight: 10 }} />
                    {TranslateString(item.text)}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant='contained' color='error' sx={{width:150}} onClick={handleClear}>{TranslateString("Clear")}</Button>
        </Box>
        <Button variant='contained' onClick={handleClick}>{TranslateString("Add Workgroup")}</Button>
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
  const TranslateString = useTranslateString()
  const columnData = [
    {
      field: 'title',
      headerName: TranslateString("Title"),
      width: 650,
      sortable: false
    },
    {
      field: 'navbar',
      headerName: TranslateString("Navbar"),
      width: 300,
      sortable: false
    },
    {
      field: 'template_id',
      headerName: TranslateString("Template") + " ID",
      width: 300,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Box display='flex' alignItems='center'>
            <Image
              src={`/images/template/${params.value}.png`}
              alt='dfs'
              width='24'
              height='24'
              style={{ marginRight: 10 }}
            />
            {params.value}
          </Box>
        )
      }
    },
    {
      field: 'action',
      headerName: TranslateString("Action"),
      width: 100,
      sortable: false,
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
      disableColumnMenu
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
  const [search_value, setSearchValue] = useState('')
  const [navbar, setNavbar] = useState('')
  const [template_id, setTemplate] = useState('')

  const debouncedTitle = useDebounce(search_value, 1000)

  const filterParams = () => {
    const title = !!search_value && { search_value }
    const nav = !!navbar && { navbar }
    const template = !!template_id && { template_id }

    return { ...title, ...nav, ...template }
  }

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['search-workgroup', debouncedTitle, navbar, template_id, page, pageSize],
    queryFn: () =>
      getWorkgroup({
        page: page,
        paginate: pageSize,
        sort: 'desc',
        sort_by: 'updated_at',
        search_by: 'title',
        select: '_id,navbar,title,template_id,updated_at',
        ...filterParams()
      }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    }
  })

  return (
    <>
      <Container>
        <Header
          setOpen={setOpen}
          setHeader={setHeader}
          title={search_value}
          navbar={navbar}
          template_id={template_id}
          setSearchValue={setSearchValue}
          setNavbar={setNavbar}
          setTemplate={setTemplate}
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
