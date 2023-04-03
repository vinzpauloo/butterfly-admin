// ** React Imports
import React, { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import { Box, Card, Grid, Typography } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import AlbumTableToolbar from '../components/AlbumTableToolbar'

// ** Style Imports

// ** Other Imports

// ** Hooks/Services
import { AlbumService } from '@/services/api/AlbumService'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'
import { AlbumColumns } from '@/data/AlbumColumns'

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

type SortType = 'asc' | 'desc' | undefined | null

const TableAlbums = () => {
  const { getAlbums } = AlbumService()
  const [page, setPage] = useState<number>()
  const [pageSize, setPageSize] = useState<number>()
  const [role, setRole] = useState('SUPERVISOR')
  const [roleId, setRoleId] = useState<any>()
  const [columnType, setColumnType] = useState('SUPERVISOR')
  const [rowCount, setRowCount] = useState<any>()

  const [sort, setSort] = useState<SortType>('desc')
  const [sortName, setSortName] = useState<string>('created_at')

  const [search, setSearch] = useState<string>()
  const [emailSearchValue, setEmailSearchValue] = useState<string>('')
  const [mobileSearchValue, setMobileSearchValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [titleSearchValue, setTitleSearchValue] = useState<string>('')

  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)
  const debouncedTitle = useDebounce(titleSearchValue, 1000)
  const [columns, setColumns] = useState<any[]>([])

  interface AlbumData {
    id: string
    title: string
    photo: string[]
    _id: string
  }

  const [albumData, setAlbumData] = useState<AlbumData[] | undefined>()
  const [dataGridKey, setDataGridKey] = useState<number>(0)
  const [filter, setFilter] = useState<string>('')

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['allAlbums', page, sort, sortName, search, search === 'title' ? debouncedTitle : undefined, filter],
    queryFn: () =>
      getAlbums({
        data: {
          page: page,
          sort: sort,
          sort_by: sortName,
          search_by: search,
          search_value: search === 'title' && debouncedTitle,
          filter: filter
        }
      }),
    onSuccess: (response: any) => {
      setAlbumData(response?.data)
      setRowCount(response?.total)
      setPageSize(response?.per_page)
      setPage(response?.current_page)
      setDataGridKey(prevKey => prevKey + 1)
    },
    enabled: true
  })

  const handlePageChange = (newPage: any) => {
    setPage(newPage + 1)
  }

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortName(newModel[0].field)
    } else {
      setSort('asc')
      setSortName('title')
    }
  }

  const handleSearch = (value: string, type: string) => {
    setSearch(type)
    switch (type) {
      case 'username':
        setSearchValue(value)
        break
      case 'email':
        setEmailSearchValue(value)
        break
      case 'mobile':
        setMobileSearchValue(value)
        break
      case 'title':
        setTitleSearchValue(value)
    }
  }

  useEffect(() => {
    setFilter('')
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ mx: 5, mt: 5, ...styles.buttonContainer }}>
            <Typography variant='h4' component='h4'>
              Album List
            </Typography>
          </Box>

          <DataGrid
            key={dataGridKey}
            rowsPerPageOptions={[]}
            loading={isLoading || isRefetching}
            checkboxSelection={false}
            disableSelectionOnClick
            paginationMode='server'
            sortingMode='server'
            autoHeight
            rows={albumData ?? []}
            getRowId={(row: AlbumData) => row?._id}
            columns={AlbumColumns}
            pageSize={pageSize}
            pagination
            onPageChange={handlePageChange}
            rowCount={rowCount}
            onSortModelChange={handleSortModel}
            components={{ Toolbar: AlbumTableToolbar }}
            componentsProps={{
              toolbar: {
                role: role,
                role_id: roleId,
                usernameValue: searchValue,
                emailValue: emailSearchValue,
                mobileValue: mobileSearchValue,
                titleValue: titleSearchValue,
                clearSearch: () => {
                  handleSearch('', 'title')
                },
                onTitleChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'title')
              }
            }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'space-between'
    },
    mb: 0
  },
  usersButtons: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    mb: {
      xs: 5,
      sm: 5,
      md: 5,
      lg: 0,
      xl: 0
    }
  },
  userButton: {
    border: 1,
    height: '56px',
    minWidth: {
      xs: '224px',
      sm: 'auto',
      md: 'auto',
      lg: '224px'
    },
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    },
    textTransform: 'uppercase'
  },
  linkButton: {
    textDecoration: 'none'
  },
  createAccount: {
    border: 1,
    height: '56px',
    minWidth: '224px',
    width: {
      xs: '100%',
      md: '100%',
      lg: '224px'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderColor: 'black',
    textTransform: 'uppercase',
    color: 'black',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    }
  },
  tableContainer: {
    minHeight: 540,
    overflowX: 'auto'
  },
  paginationContainer: {
    margin: '0 auto'
  },
  paginationContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  icon: {
    fontSize: 12,
    color: 'black'
  },
  text: {
    color: 'black',
    fontSize: 12
  },
  pageNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 2,
    marginLeft: 2,
    marginRight: 2,
    cursor: 'pointer'
  },
  searchContainer: {
    padding: 5,
    borderTop: '1px solid black'
  },
  cardHeader: {
    margin: 0,
    padding: 0
  },
  searchInput: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    padding: 0,
    gap: 5
  },
  fullWidth: {
    width: '100%'
  },
  dataGrid: {
    padding: 5
  }
}

export default TableAlbums
