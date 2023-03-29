// ** React Imports
import { useState } from 'react'

// ** Next Imports

// ** MUI Imports
import { Box, TextField, Typography, Button } from '@mui/material'

// ** Style Imports

// ** Other Imports
import TemplateModal from '../components/modal/TemplateModal'
import TemplateOne from '../components/templates/TemplateOne'
import TemplateTwo from '../components/templates/TemplateTwo'
import TemplateThree from '../components/templates/TemplateThree'
import TemplateFour from '../components/templates/TemplateFour'
import TemplateFive from '../components/templates/TemplateFive'
import WorksModal from '../components/modal/WorksModal'

type ModalType = 'template' | 'works' | null

interface HeaderProps {
  activeBtnChange: (activeBtn: string) => void
}

const Header: React.FC<HeaderProps> = ({ activeBtnChange }) => {
  const [openModal, setOpenModal] = useState<ModalType>(null)

  const handleModalToggle = (modalType: ModalType) => {
    setOpenModal(prevModal => (prevModal === modalType ? null : modalType))
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
          onClick={() => handleModalToggle('template')}
        >
          <Typography>Select Template</Typography>
          <Typography>{`>`}</Typography>
        </Button>
        <TemplateModal
          isOpen={openModal === 'template'}
          onClose={() => handleModalToggle('template')}
          onActiveBtnChange={handleActiveBtnChange}
        />

        <Button sx={styles.headBtns} onClick={() => handleModalToggle('works')}>
          <Typography>Select Multiple Contents</Typography>
        </Button>
        <WorksModal isOpen={openModal === 'works'} onClose={() => handleModalToggle('works')} />
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

      {(() => {
        switch (templateBtn) {
          case 'template1':
            return <TemplateOne />
          case 'template2':
            return <TemplateTwo />
          case 'template3':
            return <TemplateThree />
          case 'template4':
            return <TemplateFour />
          case 'template5':
            return <TemplateFive />
          default:
            return <Box sx={styles.placeholder}>Please pick a template.</Box>
        }
      })()}
    </Box>
  )
}

const styles = {
  //Head
  headContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  textFields: {
    width: {
      xs: '100%',
      md: '25%',
      lg: '25%'
    }
  },
  headSecondRow: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    justifyContent: 'space-between',
    gap: {
      xs: 2,
      sm: 2,
      md: 0,
      lg: 0
    }
  },
  headBtns: {
    border: '1px solid black',
    width: {
      xs: '100%',
      md: '100%',
      lg: '25%'
    },
    textTransform: 'uppercase',
    color: '#000'
  },
  template: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  //Please Pick A Template
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 20
  }
}

export default WorkGroupings
