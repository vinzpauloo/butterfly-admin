import React, { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Box,
  OutlinedInput,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox,
  TableBody,
  DialogActions
} from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import Container from '@/pages/components/Container'

// ** Utils import
import formatDate from '@/utils/formatDate'
// import EditVideoDrawer from '../views/EditVideoDrawer'

// ** import types
import Icon from 'src/@core/components/icon'

// ** Interfaces
import { IVideoRow } from '@/context/types'
import useDebounce from '@/hooks/useDebounce'
import { useTranslateString } from '@/utils/TranslateString'

// ** AuthContext
import { useAuth } from '@/services/useAuth'

// ** Error Handling
import { useErrorHandling } from '@/hooks/useErrorHandling'
import RolesService from '@/services/api/RolesService'

const rolesArr: string[] = [
  'Dashboard',
  'Admin Management',
  'Super Agents Management',
  'Content Creators Management',
  'Customers Management',
  'Transactions',
  'Reports',
  'Studio',
  'Mobile App',
  'Site Settings',
  'Settings',
  'Profile',
  'Chat'
]

const Header = ({ searchName, setSearchName, setOpen, setDialogTitle }: any) => {
  // ** Auth Hook
  const auth = useAuth()

  const handleClickOpen = () => setOpen(true)

  const handleClear = () => {
    setSearchName('')
  }

  const TranslateString = useTranslateString()

  return (
    <Box mb={2}>
      <Typography variant='h4' component='h4' mb={5}>
        Roles & Permissions
      </Typography>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={340}>
          {auth.user?.role != 'CC' && (
            <OutlinedInput
              fullWidth
              style={{ marginRight: 10 }}
              placeholder={TranslateString('Search') + ' ' + TranslateString('Name')}
              size='small'
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
            />
          )}

          <Button variant='contained' color='error' sx={{ width: 40 }} onClick={handleClear}>
            {TranslateString('Clear')}
          </Button>
        </Box>
        <Button
          variant='contained'
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          Add Role
        </Button>
      </Box>
    </Box>
  )
}

const CustomTable = ({ data, isLoading, setPage, pageSize, setPageSize, rowCount }: any) => {
  // ** States
  const [editVideoOpen, setEditVideoOpen] = React.useState<boolean>(false)
  const [editVideoRow, setEditVideoRow] = React.useState<IVideoRow>()
  const toggleEditVideoDrawer = () => setEditVideoOpen(!editVideoOpen)

  const TranslateString = useTranslateString()

  const columnData = [
    {
      minWidth: 50,
      field: 'id',
      headerName: 'ID',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.id}
        </Typography>
      )
    },
    {
      flex: 0.03,
      minWidth: 60,
      field: 'name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.name}
        </Typography>
      )
    },
    {
      flex: 0.04,
      field: 'description',
      minWidth: 80,
      headerName: 'Description',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.description}
        </Typography>
      )
    },
    {
      flex: 0.04,
      minWidth: 140,
      field: 'created_at',
      headerName: 'Date Created',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
      )
    },
    {
      minWidth: 60,
      field: 'action',
      headerName: TranslateString('Action'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Icon
          onClick={() => {
            setEditVideoRow({ ...params.row }) // pass the row value to state
            toggleEditVideoDrawer()
          }}
          icon='mdi:edit-outline'
          fontSize={20}
          cursor='pointer'
        />
      )
    }
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  if (!data) {
    return <>... hehehe</>
  }

  return (
    <>
      <DataGrid
        rowCount={rowCount}
        pageSize={pageSize}
        paginationMode='server'
        getRowId={row => row.id}
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
      {/* {editVideoRow && <EditVideoDrawer open={editVideoOpen} toggle={toggleEditVideoDrawer} row={editVideoRow} />} */}
    </>
  )
}

const CustomDialog = ({ open, setOpen, dialogTitle }: any) => {
  // ** States
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)

  const handleSubmit = () => {
    console.log('selectedCheckbox', selectedCheckbox)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        // togglePermission(`${id}-read`)
        // togglePermission(`${id}-write`)
        // togglePermission(`${id}-create`)
        togglePermission(`${id}`)
      })
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  return (
    <Dialog fullWidth maxWidth='sm' scroll='body' onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='span'>
          {`${dialogTitle} Role`}
        </Typography>
        <Typography variant='body2'>Set Role Permissions</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <TextField label='Role Name' placeholder='Enter Role Name' />
          </FormControl>
        </Box>
        <Typography variant='h6'>Role Permissions</Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: '0 !important' }}>
                  <FormControlLabel
                    label='Select All'
                    sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                    control={
                      <Checkbox
                        size='small'
                        onChange={handleSelectAllCheckbox}
                        indeterminate={isIndeterminateCheckbox}
                        checked={selectedCheckbox.length === rolesArr.length * 3}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolesArr.map((i: string, index: number) => {
                const id = i.toLowerCase().split(' ').join('-')

                return (
                  <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                    <TableCell>
                      <FormControlLabel
                        label={i}
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          color: theme => `${theme.palette.text.primary} !important`
                        }}
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}`}
                            onChange={() => togglePermission(`${id}`)}
                            checked={selectedCheckbox.includes(`${id}`)}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
        <Box className='demo-space-x'>
          <Button size='large' type='submit' variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

function index() {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [postStatus, setPostStatus] = useState<'Approved' | 'Pending' | 'Declined'>('Approved')

  const { handleError } = useErrorHandling()
  const { getAllRoles } = RolesService()

  const [searchName, setSearchName] = useState('')
  const debouncedName = useDebounce(searchName, 1000)

  const filterParams = () => {
    const name = !!searchName && { name: searchName }

    return { ...name }
  }

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['videosList', page, pageSize, debouncedName, postStatus],
    queryFn: () =>
      getAllRoles({
        page,
        paginate: pageSize,
        ...filterParams()
      }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
      console.log('@@@', data)
    },
    onError: (e: any) => {
      handleError(e, `getAllVideos() video-list/table/TableVideos.tsx`)
    }
  })

  return (
    <>
      <Container>
        <Header
          searchName={searchName}
          setSearchName={setSearchName}
          setOpen={setOpen}
          setDialogTitle={setDialogTitle}
        />
        <CustomTable
          data={data}
          isLoading={isLoading || isRefetching}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          rowCount={rowCount}
        />
        <CustomDialog open={open} setOpen={setOpen} dialogTitle={dialogTitle} />
      </Container>
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'cc-page'
}

export default index
