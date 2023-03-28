// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Button } from '@mui/material'

// ** Custom Imports
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const EditBtn = ({ userId, data, modal: ModalComponent }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button style={{ background: 'transparent', border: 'none' }} onClick={handleModalOpen}>
        <EditOutlinedIcon sx={{ color: '#98A9BC', fontSize: 30 }} />
      </Button>
      <ModalComponent isOpen={isModalOpen} onClose={handleModalClose} userId={userId} data={data} />
    </>
  )
}

export default EditBtn
