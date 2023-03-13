// ** React Imports
import React, { ReactNode } from 'react'

// ** Next Imports

// ** MUI Imports
import { Box } from '@mui/material'
import { styled } from '@mui/system'

// ** Other Imports
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'
import styles from './styles'
import UserTable from '@/pages/user/components/UserTable'

// ** Custom Layout Style Components
const BoxBG = styled(Box)(({ theme }) => {
  return {
    backgroundColor: '#d3d6df',
    padding: 0,
    height: 'auto',

    [theme.breakpoints.up('sm')]: {
      padding: 0
    }
  }
})

const UserList = () => {
  return (
    <BoxBG>
      <Box sx={styles.container}>
        <UserTable />
      </Box>
    </BoxBG>
  )
}

UserList.contentHeightFixed = false
UserList.getLayout = (page: ReactNode) => (
  <UserLayoutNoPadding contentHeightFixed={UserList.contentHeightFixed}>{page}</UserLayoutNoPadding>
)
export default UserList
