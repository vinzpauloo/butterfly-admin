// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { Box, Card, Grid, Divider, CardHeader, TextField, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

// ** Style Imports
import styles from '@/pages/user/list/styles'

// ** Other Imports
import operatorColumns from '@/pages/user/data/OperatorColumn'
import superAgentColumns from '@/pages/user/data/SuperAgentColumn'
import contentCreatorColumns from '@/pages/user/data/ContentCreatorColumn'
import operatorRows from '@/pages/user/data/OperatorData'
import superagentRows from '@/pages/user/data/SuperAgentData'
import contentcreatorRows from '@/pages/user/data/ContentCreatorData'

// ** Hooks
import { useUsersTable } from '../../../hooks/useUsersTable'

// ** TanStack Query
import { useQuery } from "@tanstack/react-query";


type UserData = {
  dataType: any
  columnType: string
  activeBtn: string
}

const UserTable = () => {

  const { getOperators } = useUsersTable();
  const { data, isLoading } = useQuery({
    queryKey: ["operators"],
    queryFn: getOperators,
    onSuccess: (data) => {
      setTableData(data?.data)
      console.log(`SUCCESSFUL FETCH`)
    },
    onError: (error) => {
      console.log(`ERROR`, error)
    }
  })

  const [tableData, setTableData] = useState([])
  console.log(`tabledata`, tableData)
  console.log(`data`, data)


  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const handleFilter = () => {
    //Test
  }
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const [dataType, setDataType] = useState('operators')
  const [columnType, setColumnType] = useState('operators')
  const [activeBtn, setActiveBtn] = useState('')

  const columnsMap = new Map([
    ['operators', operatorColumns],
    ['superagent', superAgentColumns],
    ['contentcreators', contentCreatorColumns]
  ])

  const filteredColumns: any = columnsMap.get(columnType) ?? []

  const rowsByType: any = {
    operators: tableData,

    // operators: operatorRows,
    superagent: superagentRows,
    contentcreators: contentcreatorRows
  }

  const filteredRows = rowsByType[dataType] || []

  const handleClick = ({ dataType, columnType, activeBtn }: UserData) => {
    setDataType(dataType)
    setColumnType(columnType)
    setActiveBtn(activeBtn)
  }

  const createUserData = (value: string): UserData => ({
    dataType: value,
    columnType: value,
    activeBtn: value
  })

  useEffect(() => {
    setActiveBtn('operators')
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ padding: 5, ...styles.buttonContainer }}>
            <Box sx={styles.usersButtons}>
              <Button
                onClick={() => handleClick(createUserData('operators'))}
                sx={{
                  ...styles.userButton,
                  backgroundColor: activeBtn === 'operators' ? '#9747FF' : '#FFF',
                  color: activeBtn === 'operators' ? '#FFF' : 'black'
                }}
              >
                Operators
              </Button>
              <Button
                onClick={() => handleClick(createUserData('superagent'))}
                sx={{
                  ...styles.userButton,
                  backgroundColor: activeBtn === 'superagent' ? '#9747FF' : '#FFF',
                  color: activeBtn === 'superagent' ? '#FFF' : 'black'
                }}
              >
                Super Agent
              </Button>
              <Button
                onClick={() => handleClick(createUserData('contentcreators'))}
                sx={{
                  ...styles.userButton,
                  backgroundColor: activeBtn === 'contentcreators' ? '#9747FF' : '#FFF',
                  color: activeBtn === 'contentcreators' ? '#FFF' : 'black'
                }}
              >
                Content Creators
              </Button>
            </Box>

            <Link
              style={styles.linkButton}
              href={{
                pathname: 'list/CreateAccount',
                query: { activeBtn }
              }}
            >
              <Button sx={styles.createAccount}>Create Account</Button>
            </Link>
          </Box>

          <Box sx={styles.searchContainer}>
            <CardHeader title='Search Filters' sx={styles.cardHeader} />
            <Box sx={styles.searchInput}>
              <TextField sx={styles.fullWidth} label={`Search User`} />
              <TextField sx={styles.fullWidth} label={`Search Mobile Number`} />
              <TextField sx={styles.fullWidth} label={`Search Email`} />
            </Box>
          </Box>
          <Divider />

          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />

          <DataGrid
            autoHeight
            rows={filteredRows}
            columns={filteredColumns}
            pageSize={pageSize}
            disableSelectionOnClick
            checkboxSelection={true}
            sx={styles.dataGrid}
          />
        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default UserTable
