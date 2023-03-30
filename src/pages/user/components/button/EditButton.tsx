// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Button } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

// ** Custom Imports
import EditSupervisorDrawer from '../drawer/EditSupervisorDrawer'
import EditSuperAgentDrawer from '@/pages/user/components/drawer/EditSuperAgentDrawer'
import EditCreatorDrawer from '../drawer/EditCreatorDrawer'

type DrawerType = 'SUPERVISOR' | 'SA' | 'CC' | null

const EditBtn = ({ roleId, userId, data }: any) => {
  useEffect(() => {
    switch (true) {
      case roleId === 2:
        setNewRole('SUPERVISOR')
        break

      case roleId === 3:
        setNewRole(`CC`)
        break
      case roleId === 4:
        setNewRole(`SA`)
        break
      case roleId === 5:
        setNewRole(`AGENT`)
        break
      default:
        console.log(`NO USER TYPE`)
    }
  }, [roleId])

  const [newRole, setNewRole] = useState('')

  const [openDrawer, setOpenDrawer] = useState<DrawerType>(null)
  const handleDrawerToggle = (role: string | null) => {
    let drawerType: DrawerType

    switch (role) {
      case 'SUPERVISOR':
        drawerType = 'SUPERVISOR'
        break
      case 'SA':
        drawerType = 'SA'
        break
      case 'CC':
        drawerType = 'CC'
        break
      default:
        drawerType = null
    }
    setOpenDrawer(prevDrawer => (prevDrawer === drawerType ? null : drawerType))
  }

  return (
    <>
      <Button style={styles.button} onClick={() => handleDrawerToggle(newRole)}>
        <EditOutlinedIcon sx={styles.icon} />
      </Button>
      {roleId === 2 && (
        <EditSupervisorDrawer
          data={data}
          userId={userId}
          roleId={roleId}
          open={openDrawer === 'SUPERVISOR'}
          toggle={() => handleDrawerToggle('SUPERVISOR')}
        />
      )}
      {roleId === 4 && (
        <EditSuperAgentDrawer
          data={data}
          userId={userId}
          roleId={roleId}
          open={openDrawer === 'SA'}
          toggle={() => handleDrawerToggle('SA')}
        />
      )}
      {roleId === 3 && (
        <EditCreatorDrawer
          data={data}
          userId={userId}
          roleId={roleId}
          open={openDrawer === 'CC'}
          toggle={() => handleDrawerToggle('CC')}
        />
      )}
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

export default EditBtn
