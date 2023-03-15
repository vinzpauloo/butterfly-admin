// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Box, Dialog, DialogContent, DialogTitle, Backdrop, Grid, Paper, Button, TextField } from '@mui/material'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
}

const WorksModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const handleBackdropClick = () => {
    onClose()
  }

  const [backgroundColor, setBackgroundColor] = useState(Array(5).fill('grey'))

  const [activeBtn, setActiveBtn] = useState('')

  const handleHoverIn = (index: any) => {
    setBackgroundColor(prevColors => {
      const newColors = [...prevColors]
      newColors[index] = 'purple'

      return newColors
    })
  }

  const handleHoverOut = (index: any) => {
    setBackgroundColor(prevColors => {
      const newColors = [...prevColors]
      newColors[index] = 'grey'

      return newColors
    })
  }

  const handleTemplateClick = (templateName: string) => {
    setActiveBtn(templateName)
    // onActiveBtnChange(templateName)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          height: '80dvh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey'
        }}
      >
        <Box sx={{ width: [400, 700, 1200], padding: 0 }}>
          <Box
            sx={{
              backgroundColor: 'inherit',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              margin: '0 50px 0 50px'
            }}
          >
            <Button
              sx={{ backgroundColor: '#FFF', width: 120, height: '4dvh', fontSize: 11, textTransform: 'uppercase' }}
            >
              All
            </Button>
            <Button
              sx={{ backgroundColor: '#FFF', width: 120, height: '4dvh', fontSize: 11, textTransform: 'uppercase' }}
            >
              Selected
            </Button>
            <Button
              sx={{ backgroundColor: '#FFF', width: 120, height: '4dvh', fontSize: 11, textTransform: 'uppercase' }}
            >
              Not Selected
            </Button>
            <TextField label={`Search`} name={`Search`} placeholder={`Search`} variant={`outlined`} />
          </Box>
          <DialogContent sx={{}}>
            {/* Templates */}
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                gap: 10,
                overflow: 'auto',
                maxHeight: '70vh',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '4px'
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,0,0,0.1)'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '20px'
                }
              }}
            ></Box>
          </DialogContent>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          backgroundColor: 'transparent'
        }}
      >
        <Button
          sx={{
            backgroundColor: '#FFF',
            width: 120
          }}
        >
          Back
        </Button>
        <Button
          sx={{
            backgroundColor: '#FFF',
            width: 120
          }}
        >
          Continue
        </Button>
      </Box>
    </Dialog>
  )
}

export default WorksModal
