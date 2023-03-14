// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Box, TextField, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Style Imports
import styles from '../styles/workStyles'

// ** Other Imports
import TemplateModal from '../components/modal/TemplateModal'
import rows from '../data/TemplateRows'
import columns from '../data/TemplateColumns'

interface HeaderProps {
  activeBtnChange: (activeBtn: string) => void
}

const Header: React.FC<HeaderProps> = ({ activeBtnChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleActiveBtnChange = (activeBtn: string) => {
    activeBtnChange(activeBtn)
  }

  return (
    <Box sx={styles.headContainer}>
      <Box>
        <TextField label='Grouping Title(Type here)' sx={styles.textFields} />
      </Box>

      <Box sx={styles.headSecondRow}>
        <Button
          sx={{
            ...styles.headBtns,
            ...styles.template
          }}
          onClick={handleModalOpen}
        >
          <Typography>Select Template</Typography>
          <Typography>{`>`}</Typography>
        </Button>
        <TemplateModal isOpen={isModalOpen} onClose={handleModalClose} onActiveBtnChange={handleActiveBtnChange} />
        <Button sx={styles.headBtns}>
          <Typography>Select Multiple Contents</Typography>
        </Button>
      </Box>
    </Box>
  )
}

const WorkGroupings = () => {
  const [templateBtn, setTemplateBtn] = useState('')

  const handleActiveBtnChange = (activeBtn: string) => {
    setTemplateBtn(activeBtn)
  }

  return (
    <Box>
      <Header activeBtnChange={handleActiveBtnChange} />

      {templateBtn === 'template1' ? (
        <Box
          sx={{
            backgroundColor: '#2A3446',
            width: '100%',
            height: ['100dvh', '80dvh', '50dvh'],
            marginTop: 10,
            display: 'flex',
            flexDirection: ['column', 'column', 'row'],
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            gap: 10
          }}
        >
          <Box
            sx={{
              backgroundColor: 'grey',
              width: ['120%', '100%', '50%'],
              height: ['300px', '520px', '400px'],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image src='/images/icons/butterfly-template-icon.png' width={100} height={100} alt='operator-icon' />
          </Box>

          <Box
            sx={{
              backgroundColor: '#FFF',
              width: ['120%', '100%', '50%'],
              height: ['100%', '400px', '400px'],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <DataGrid rows={rows} columns={columns} sx={{ width: '100%' }} rowHeight={80} />
          </Box>
        </Box>
      ) : templateBtn === 'template2' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'column', 'row'],
            gap: 5,
            marginTop: 5
          }}
        >
          <Box
            sx={{
              backgroundColor: '#2A3446',
              width: ['100%', '100%', '50%'],
              height: '100dvh',
              borderRadius: '12px',
              padding: 5
            }}
          ></Box>

          <Box
            sx={{
              backgroundColor: '#2A3446',
              width: ['100%', '100%', '50%'],
              height: '100dvh',
              borderRadius: '12px'
            }}
          ></Box>
        </Box>
      ) : templateBtn === 'template3' ? (
        <Box>Template 3</Box>
      ) : templateBtn === 'template4' ? (
        <Box>Template 4</Box>
      ) : (
        <Box>Template 5</Box>
      )}
    </Box>
  )
}

export default WorkGroupings
