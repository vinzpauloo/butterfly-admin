// ** React Imports
import React,{ useState, useRef, SetStateAction } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import {
  Drawer,
  Button,
  IconButton,
  Typography,
  Step,
  Stepper,
  StepLabel,
  StepContent
} from '@mui/material'

// ** Style Imports
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import clsx from 'clsx'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Custom Components Imports
import StepperCustomDot from '@/layouts/components/shared-components/StepperCustomDot'
import SAStepOne from './superagent/steps/StepOne'
interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))



const SADrawer = (props: SidebarAddUserType) => {
  
  // ** State
  const [activeStep, setActiveStep] = useState<number>(0)
  const [fileName, setFileName] = useState('')
  const [responseError, setResponseError] = useState<any>()
  const [resetKey, setResetKey] = useState(0)

  // ** References
  const stepOneRef = React.useRef<any>()

  // ** Props
  const { open, toggle } = props

  const handleClose = () => {
    toggle()
    stepOneRef?.current?.reset() // reference to the useForm
    setResetKey(prevKey => prevKey + 1)
    setFileName('')
    setResponseError({})
  }

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === 1) {
      toast.success('Completed All Steps!!')
    }
  }
  const handleReset = () => {
    setActiveStep(0)
  }

  // ** SA Steps
  const steps = [
    {
      title: 'Account Details',
      subtitle: 'Enter your Account Details',
      component: <SAStepOne 
                    ref={stepOneRef}
                    toggle={toggle} 
                    resetKey={resetKey}
                    handleClose={handleClose}
                    responseError={responseError}
                    setResponseError={setResponseError}
                    fileName={fileName}
                    setFileName={setFileName}
                  />
    },
    {
      title: 'FQDNS Info',
      subtitle: 'Setup FQDNS',
      component: <Box>FQDNS</Box>
    }
  ]

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Super Agent</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <StepperWrapper>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((step, index) => {
              return (
                <Step key={index} className={clsx({ active: activeStep === index })}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                  <StepContent>
                    { step.component }
                    <div className='button-wrapper'>
                      <Button
                        size='small'
                        color='secondary'
                        variant='outlined'
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        Back
                      </Button>
                      <Button size='small' variant='contained' onClick={handleNext} sx={{ ml: 4 }}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </StepContent>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
        {activeStep === steps.length && (
          <Box sx={{ mt: 2 }}>
            <Typography>All steps are completed!</Typography>
            <Button size='small' sx={{ mt: 2 }} variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  )
}


const styles = {
  container: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#A459D1',
    padding: 4
  },
  radio: {
    display: 'flex',
    alignItems: 'center'
  },
  white: {
    color: 'white'
  },
  formContent: {
    marginTop: 5
  },
  fullWidth: {
    width: '100%',
    mt: 5
  },
  textInput: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '50%'
    }
  },
  formContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    gap: {
      xs: 0,
      lg: 5
    }
  },
  formButtonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'column'
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 5,
    gap: 3
  },
  cancelButton: {
    backgroundColor: '#98A9BC',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#7899ac'
    }
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-in-out'
    }
  },
  continueButton: {
    backgroundColor: '#9747FF',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#9747FF'
    }
  },

  // Logo Styling
  input: {
    display: 'block'
  },
  upload: {
    backgroundColor: '#979797',
    padding: '8px 12px 8px 12px',
    borderRadius: '5px'
  }
}

export default SADrawer
