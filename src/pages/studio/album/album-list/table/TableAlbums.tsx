// ** React Imports
import React, { useState, ChangeEvent, useCallback } from 'react'

// ** MUI Imports
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import { AlbumColumns } from '@/data/AlbumColumns'
import AlbumTableToolbar from '../components/AlbumTableToolbar'

// ** Project/Other Imports
import Container from '@/pages/components/Container'

// ** Hooks/Services
import { AlbumService } from '@/services/api/AlbumService'
import useDebounce from '@/hooks/useDebounce'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

interface AlbumData {
  id: string
  title: string
  photo: string[]
  _id: string
}

type SortType = 'asc' | 'desc' | undefined | null

const TableAlbums = () => {
  // ** DataGrid
  const albumColumns = AlbumColumns()

  // ** Service
  const { getAlbums } = AlbumService()
  const { handleError } = useErrorHandling()

  // ** Utilities
  const TranslateString = useTranslateString()

  // ** States
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>()
  const [rowCount, setRowCount] = useState<number>()
  const [sort] = useState<SortType>('desc')
  const [sortName] = useState<string>('created_at')
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [titleSearchValue, setTitleSearchValue] = useState<string | undefined>(undefined)
  const debouncedTitle = useDebounce(titleSearchValue, 1000)
  const [albumData, setAlbumData] = useState<AlbumData[] | undefined>()

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['allAlbums', page, sort, sortName, search, debouncedTitle],
    queryFn: () =>
      getAlbums({
        data: {
          page: page,
          sort: sort,
          sort_by: sortName,
          search_by: search,
          search_value: debouncedTitle
        }
      }),
    onSuccess: response => {
      setAlbumData(response?.data)
      setRowCount(response?.total)
      setPageSize(response?.per_page)
      setPage(response?.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getAlbums() TableAlbums.tsx`)
    }
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handleSearch = useCallback((value: string, type: string) => {
    setSearch(type)
    switch (type) {
      case 'title':
        setTitleSearchValue(value || undefined)
        break
    }
  }, [])

  return (
    <Container>
      <Box sx={styles.buttonContainer}>
        <Typography variant='h4' component='h4'>
          {TranslateString('Album List')}
        </Typography>
      </Box>

      <DataGrid
        disableColumnMenu
        loading={isLoading || isRefetching}
        checkboxSelection={false}
        disableSelectionOnClick
        paginationMode='server'
        sortingMode='server'
        autoHeight
        rows={albumData ?? []}
        getRowId={(row: AlbumData) => row?._id}
        columns={albumColumns}
        pageSize={pageSize || 10}
        pagination
        onPageChange={handlePageChange}
        rowCount={rowCount || 10}
        rowsPerPageOptions={[10]}
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
    </Container>
  )
}

const styles = {
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
    mb: 5
  }
}

export default TableAlbums
