import React from 'react'

// ** MUI Imports
import { Dialog, DialogContent } from '@mui/material'

import SelectFeaturedFeeds from '../feeds'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const SelectFeeds: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
      <DialogContent sx={{ padding: 10 }}>
        <SelectFeaturedFeeds onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default SelectFeeds
