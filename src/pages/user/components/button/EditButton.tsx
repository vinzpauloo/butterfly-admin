// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Button } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

// ** Custom Imports

const EditBtn = ({ roleId, data, handleOpenDrawer }: any) => {
  useEffect(() => {
    switch (true) {
      case roleId === 2:
        setNewRole('OPERATIONS')
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

  return (
    <>
      <Button style={styles.button} onClick={() => handleOpenDrawer(newRole, data)}>
        <EditOutlinedIcon sx={styles.icon} />
      </Button>
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
