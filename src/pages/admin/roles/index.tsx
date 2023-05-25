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
  DialogActions,
  CircularProgress
} from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

import { FaSquare, FaCheckSquare, FaMinusSquare } from 'react-icons/fa'
import { IoMdArrowDropright, IoMdMore } from 'react-icons/io'
import TreeView, { flattenTree } from 'react-accessible-treeview'
import cx from 'classnames'

const MultiSelectCheckboxControlled = ({ dataAbilities, selectedIds, setSelectedIds, initialSelectedIds }: any) => {
  const tempAbilityTree = {
    name: '',
    children: dataAbilities
  }
  const abilityTree = flattenTree(tempAbilityTree)

  return (
    <div className='checkbox'>
      <TreeView
        data={abilityTree}
        aria-label='Checkbox tree'
        multiSelect
        selectedIds={initialSelectedIds}
        defaultExpandedIds={[1]}
        propagateSelect
        propagateSelectUpwards
        togglableSelect
        onSelect={props => {
          const selected = Array.from(props.treeState.selectedIds)
          setSelectedIds(selected)
        }}
        // onNodeSelect={props => console.log('onNodeSelect callback: ', props)}
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          isSelected,
          isHalfSelected,
          isDisabled,
          getNodeProps,
          level,
          handleSelect,
          handleExpand
        }) => {
          return (
            <div
              {...getNodeProps({ onClick: handleExpand })}
              style={{
                marginLeft: 40 * (level - 1),
                opacity: isDisabled ? 0.5 : 1
              }}
            >
              {isBranch ? <ArrowIcon isOpen={isExpanded} /> : <IoMdMore className={'arrow'} />}
              <CheckBoxIcon
                className='checkbox-icon'
                onClick={(e: any) => {
                  handleSelect(e)
                  e.stopPropagation()
                }}
                variant={isHalfSelected ? 'some' : isSelected ? 'all' : 'none'}
              />
              <span className='name'>{element.name}</span>
            </div>
          )
        }}
      />
    </div>
  )
}

const ArrowIcon = ({ isOpen, className }: any) => {
  const baseClass = 'arrow'
  const classes = cx(baseClass, { [`${baseClass}--closed`]: !isOpen }, { [`${baseClass}--open`]: isOpen }, className)
  return <IoMdArrowDropright className={classes} />
}

const CheckBoxIcon = ({ variant, ...rest }: any) => {
  switch (variant) {
    case 'all':
      return <FaCheckSquare {...rest} />
    case 'none':
      return <FaSquare {...rest} />
    case 'some':
      return <FaMinusSquare {...rest} />
    default:
      return null
  }
}

const Header = ({ searchName, setSearchName, setOpen, setDialogTitle, setIsEditing }: any) => {
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
            setIsEditing(false)
          }}
        >
          Add Role
        </Button>
      </Box>
    </Box>
  )
}

const CustomTable = ({
  data,
  isLoading,
  setPage,
  pageSize,
  setPageSize,
  rowCount,
  setOpen,
  setDialogTitle,
  setActiveRoleId,
  setIsEditing
}: any) => {
  // ** Hooks
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
      renderCell: (params: GridRenderCellParams) => {
        return params.row.id > 5 ? (
          <Icon
            onClick={() => {
              setOpen(true)
              setDialogTitle('Edit')
              setActiveRoleId(params.row.id)
              setIsEditing(true)
            }}
            icon='mdi:edit-outline'
            fontSize={20}
            cursor='pointer'
          />
        ) : null
      }
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

const CustomDialog = ({
  open,
  setOpen,
  dialogTitle,
  dataAbilities,
  page,
  pageSize,
  debouncedName,
  activeRoleId,
  setActiveRoleId,
  isEditing
}: any) => {
  // ** States
  const [initialSelectedIds, setInitialSelectedIds] = useState<number[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [roleName, setRoleName] = useState<string>('')
  const [roleNameError, setRoleNameError] = useState<boolean>(false)
  const [selectedIdsError, setSelectedIdsError] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const queryClient = useQueryClient()
  const { handleError } = useErrorHandling()

  // ** Services
  const { getSingleRole, postRole, putRole } = RolesService()

  // ** API
  // Fetching of single role by role id
  const { isLoading: isLoadingSingleRole, isRefetching: isRefetchingSingleRole } = useQuery({
    queryKey: ['singleRole', activeRoleId],
    queryFn: () => getSingleRole(activeRoleId),
    onSuccess: data => {
      console.log('success getSingleRole', data)
      // setActiveRoleId(0)

      // Prepare initial selected menu IDs
      const mappedAbilities = data.abilities.map((ability: any) => {
        return ability.id
      })

      // Set initial values
      setRoleName(data.name)
      setSelectedIds(mappedAbilities)
      setInitialSelectedIds(mappedAbilities)
    },
    onError: (e: any) => {
      handleError(e, `getSingleRole() admin/roles/index.tsx`)
    },
    enabled: !!activeRoleId
  })

  const { mutate: mutateAddRole, isLoading: isLoadingMutateAddRole } = useMutation(postRole, {
    onSuccess: data => {
      console.log('mutateAddRole success', data)
      queryClient.invalidateQueries({
        queryKey: ['roles', page, pageSize, debouncedName]
      })

      // Close modal
      setOpen(false)
    },
    onError: error => {
      console.log('mutateAddRole error', error)
    }
  })

  const { mutate: mutateUpdateRole, isLoading: isLoadingMutateUpdateRole } = useMutation(putRole, {
    onSuccess: data => {
      console.log('mutateUpdateRole success', data)
      queryClient.invalidateQueries({
        queryKey: ['roles', page, pageSize, debouncedName]
      })

      // Close modal
      setOpen(false)
    },
    onError: error => {
      console.log('mutateUpdateRole error', error)
    }
  })

  // ** Events
  const validateInput = () => {
    if (roleName === '') {
      setRoleNameError(true)
      return false
    }

    if (selectedIds.length == 0) {
      setSelectedIdsError(true)
      return false
    }

    return true
  }

  const handleSubmit = () => {
    if (validateInput()) {
      const newRoleData = {
        name: roleName,
        abilities: selectedIds,
        ...(auth.user && auth.user.partner_id && { partner_id: auth.user.partner_id })
      }

      console.log('newRoleData', newRoleData)
      console.log('isEditing', isEditing)

      // Condition whether add new role or update a role
      isEditing ? mutateUpdateRole({ body: newRoleData, id: activeRoleId }) : mutateAddRole(newRoleData)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedIds([])
  }

  const isAddingOrUpdating = (activeRoleId && isLoadingSingleRole) || isRefetchingSingleRole || isLoadingMutateAddRole

  useEffect(() => {
    if (!open) {
      // Reset fields
      setRoleName('')
      setInitialSelectedIds([])
      setSelectedIds([])
      setRoleNameError(false)
      setSelectedIdsError(false)
      setActiveRoleId(0)
    }
  }, [open])

  return (
    <Dialog fullWidth maxWidth='sm' scroll='body' onClose={handleClose} open={open}>
      {isAddingOrUpdating && <CircularProgress sx={styles.loaderStyle} color='primary' size={64} />}

      <Box style={isAddingOrUpdating ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Typography variant='h5' component='span'>
            {`${dialogTitle} Role`}
          </Typography>
          <Typography variant='body2'>Set Role Permissions</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <TextField
                label='Role Name'
                placeholder='Enter Role Name'
                value={roleName}
                onChange={e => {
                  setRoleName(e.target.value)
                  setRoleNameError(false)
                }}
                error={roleNameError}
              />
            </FormControl>
          </Box>
          <Typography variant='h6'>Role Permissions</Typography>
          <MultiSelectCheckboxControlled
            dataAbilities={dataAbilities}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            initialSelectedIds={initialSelectedIds}
          />
          {selectedIdsError && (
            <Typography variant='body2' color='error' mt={5}>
              Please select at least 1 role permission.
            </Typography>
          )}
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
      </Box>
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
  const [activeRoleId, setActiveRoleId] = useState(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { handleError } = useErrorHandling()
  const { getAllRoles, getAbilities } = RolesService()

  const [searchName, setSearchName] = useState('')
  const debouncedName = useDebounce(searchName, 1000)

  const filterParams = () => {
    const name = !!searchName && { name: searchName }

    return { ...name }
  }

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['roles', page, pageSize, debouncedName],
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
      console.log('success getAllRoles', data)
    },
    onError: (e: any) => {
      handleError(e, `getAllRoles() admin/roles/index.tsx`)
    }
  })

  const { data: dataAbilities } = useQuery({
    queryKey: ['abilities'],
    queryFn: () => getAbilities(),
    onSuccess: data => {
      console.log('success getAbilities', data)
    },
    onError: (e: any) => {
      handleError(e, `getAbilities() admin/roles/index.tsx`)
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
          setIsEditing={setIsEditing}
        />
        <CustomTable
          data={data}
          isLoading={isLoading || isRefetching}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          rowCount={rowCount}
          setOpen={setOpen}
          setDialogTitle={setDialogTitle}
          setActiveRoleId={setActiveRoleId}
          setIsEditing={setIsEditing}
        />
        <CustomDialog
          open={open}
          setOpen={setOpen}
          dialogTitle={dialogTitle}
          dataAbilities={dataAbilities}
          page={page}
          pageSize={pageSize}
          debouncedName={debouncedName}
          activeRoleId={activeRoleId}
          setActiveRoleId={setActiveRoleId}
          isEditing={isEditing}
        />
      </Container>
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'cc-page'
}

export default index

const styles = {
  loaderStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    zIndex: 1
  }
}
