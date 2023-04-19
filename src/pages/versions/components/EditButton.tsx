// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Button } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import EditVersionDrawer from './EditDrawer'

// ** Custom Imports

const EditButton = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleDrawerToggle = () => {
    setOpenDrawer(isDrawerOpen => !isDrawerOpen)
  }

  return (
    <>
      <Button style={styles.button} onClick={handleDrawerToggle}>
        <EditOutlinedIcon sx={styles.icon} />
      </Button>
      <EditVersionDrawer open={openDrawer} toggle={handleDrawerToggle} />
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

export default EditButton
