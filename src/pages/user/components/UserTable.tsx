// ** React Imports
import React, { useState } from 'react'

// ** Next Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {TextField} from '@mui/material';

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

import styles from "@/pages/user/list/styles";
import {Button} from "@mui/material";

import operatorColumns from "@/pages/user/data/OperatorColumn";
import superAgentColumns from "@/pages/user/data/SuperAgentColumn";
import contentCreatorColumns from "@/pages/user/data/ContentCreatorColumn";
import operatorRows from "@/pages/user/data/OperatorData";
import superagentRows from "@/pages/user/data/SuperAgentData";
import contentcreatorRows from "@/pages/user/data/ContentCreatorData";
import Link from "next/link";

const UserTable = () => {

  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const handleFilter = () => {
    console.log(filteredRows)
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const [dataType, setDataType] = useState('operators');
  const [columnType, setColumnType] = useState('operators');
  const [activeBtn, setActiveBtn] = useState('')

  let filteredColumns: any = [];
  if (columnType === 'operators') {
    filteredColumns = operatorColumns;
  } else if (columnType === 'superagent') {
    filteredColumns = superAgentColumns;
  } else if (columnType === 'content-creators') {
    filteredColumns = contentCreatorColumns;
  }

  let filteredRows: any = [];

  if (dataType === 'operators') {
    filteredRows = operatorRows;
  } else if (dataType === 'superagent') {
    filteredRows = superagentRows;
  } else if (dataType === 'content-creators') {
    filteredRows = contentcreatorRows;
  }

  const handleOperatorsClick = () => {
    setDataType('operators');
    setColumnType('operators');
    setActiveBtn('operators')
  }

  const handleSuperAgentClick = () => {
    setDataType('superagent');
    setColumnType('superagent');
    setActiveBtn('superagent')
  }

  const handleContentCreatorsClick = () => {
    setDataType('content-creators');
    setColumnType('content-creators');
    setActiveBtn('contentcreators')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{padding: 5, ...styles.buttonContainer}}>
            <Box sx={styles.usersButtons}>
              <Button onClick={handleOperatorsClick} sx={{...styles.userButton, backgroundColor: activeBtn === 'operators' ? '#9747FF' : '#FFF',
                color: activeBtn === 'operators' ? '#FFF' : 'black'}}>
                Operators
              </Button>
              <Button onClick={handleSuperAgentClick} sx={{...styles.userButton, backgroundColor: activeBtn === 'superagent' ? '#9747FF' : '#FFF',
                color: activeBtn === 'superagent' ? '#FFF' : 'black'}}>
                Super Agent
              </Button>
              <Button onClick={handleContentCreatorsClick} sx={{...styles.userButton, backgroundColor: activeBtn === 'contentcreators' ? '#9747FF' : '#FFF',
                color: activeBtn === 'contentcreators' ? '#FFF' : 'black'}}>
                Content Creators
              </Button>
            </Box>

            <Link
              style={styles.linkButton}
              href={{
                pathname: activeBtn === 'operators' ? 'list/CreateAccount' : activeBtn === 'superagent' ? 'list/CreateAccount' : 'list/CreateAccount',
                query: { activeBtn }
              }}>
              <Button sx={styles.createAccount}>Create Account</Button>
            </Link>
          </Box>

          <Box sx={{padding: 5, borderTop: '1px solid black'}}>
            <CardHeader title='Search Filters' sx={{margin: 0, padding: 0}}/>
            <Box sx={{display: 'flex', flexDirection: ['column', 'column','row'] ,padding: 0, gap: 5}}>
              <TextField
                sx={{width: '100%'}}
                label={`Search User`}
              />
              <TextField
                sx={{width: '100%'}}
                label={`Search Mobile Number`}
              />
              <TextField
                sx={{width: '100%'}}
                label={`Search Email`}
              />
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
          />

        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default UserTable
