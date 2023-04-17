// ** React Imports
import React, { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import { Box, Card, Grid, Typography } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import AlbumTableToolbar from '../components/AlbumTableToolbar'

// ** Other Imports
import { AlbumColumns } from '@/data/AlbumColumns'
import TranslateString from '@/utils/TranslateString'

// ** Hooks/Services
import { AlbumService } from '@/services/api/AlbumService'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

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
  const [rowCount, setRowCount] = useState<any>()

  const [sort, setSort] = useState<SortType>('desc')
  const [sortName, setSortName] = useState<string>('created_at')

  const [search, setSearch] = useState<string>()
  const [titleSearchValue, setTitleSearchValue] = useState<string>('')

  const debouncedTitle = useDebounce(titleSearchValue, 1000)

  interface AlbumData {
    id: string
    title: string
    photo: string[]
    _id: string
  }

  const [albumData, setAlbumData] = useState<AlbumData[] | undefined>()

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['allAlbums', page, sort, sortName, search, search === 'title' ? debouncedTitle : undefined],
    queryFn: () => {
      const requestData: any = {
        page: page,
        sort: sort,
        sort_by: sortName
      }

      if (search && search !== '') {
        requestData.search_by = search
      }

      if (search === 'title' && debouncedTitle) {
        requestData.search_value = search === 'title' && debouncedTitle
      }

      return getAlbums({ data: requestData })
    },
    onSuccess: (response: any) => {
      setAlbumData(response?.data)
      setRowCount(response?.total)
      setPageSize(response?.per_page)
      setPage(response?.current_page)
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
      case 'title':
        setTitleSearchValue(value)
        break
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ mx: 5, mt: 5, ...styles.buttonContainer }}>
            <Typography variant='h4' component='h4'>
              {TranslateString("Album List")}
            </Typography>
          </Box>

          <DataGrid
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
