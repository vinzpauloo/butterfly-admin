// ** React Imports
import React from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import {
  IconButton,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material'

// ** Style Imports
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Project/Other Imports
import EditStepOne from './components/EditStepOne'
import EditStepTwo from './components/EditStepTwo'
import StepperWrapper from '@/@core/styles/mui/stepper'
import StepperCustomDot from '@/layouts/components/shared-components/StepperCustomDot'
import { editSuperAgentStore } from '@/zustand/editSuperAgentStore'

// ** Third Party Imports
import clsx from 'clsx'

// ** Zustand Imports
import { useUserTableStore } from '@/zustand/userTableStore'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: '#FF9C00'
}))

const Steps = () => {
  // ** Zustand Store
  const { drawerData, drawerRole, languages, currencies, setDrawerRole } = useUserTableStore()

  return [
    {
      title: 'Update Account Details',
      subtitle: 'Edit your Account Details',
      component: (
        <EditStepOne
          data={drawerData}
          open={drawerRole === 'SA'}
          toggle={() => setDrawerRole(null)}
          languages={languages}
          currencies={currencies}
        />
      )
    },
    {
      title: 'Configure FQDN Info',
      subtitle: 'Modify Setup',
      component: <EditStepTwo data={drawerData} toggle={() => setDrawerRole(null)} />
    }

    // {
    //   title: 'Modify Integration',
    //   subtitle: 'Edit Integration and RSA Details',
    //   component: <EditStepThree toggle={() => setDrawerRole(null)} />
    // }
  ]
}

const EditSuperAgentDrawer = (props: SidebarAddUserType) => {
  const { activeStep, setActiveStep } = editSuperAgentStore()

  React.useEffect(() => {
    setActiveStep(0)
  }, [])

  const steps = Steps()

  const { open, toggle } = props

  const handleClose = () => {
    toggle()
  }

  const handleStepToggle = (stepIndex: number) => {
    if (activeStep === stepIndex) {
      setActiveStep(-1) // Close the currently active step
    } else {
      setActiveStep(stepIndex) // Open the clicked step
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
      <Header>
        <DialogTitle color='#FFF' textTransform='uppercase'>
          Edit Super Agent
        </DialogTitle>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <DialogContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((step, index) => {
              return (
                <Step key={index} className={clsx({ active: activeStep === index })}>
                  <StepLabel StepIconComponent={StepperCustomDot} onClick={() => handleStepToggle(index)}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`Step 0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                  <StepContent>{step.component}</StepContent>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </DialogContent>
    </Dialog>
  )
}

export default EditSuperAgentDrawer
