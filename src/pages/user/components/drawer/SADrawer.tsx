// ** React Imports
import React, { useState } from 'react'

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
  StepContent,
  LinearProgress
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
import CreatedSuccessful from '../form/CreatedSuccessful'

// ** Steps
import SAStepOne from './superagent/steps/StepOne'
import SAStepTwo from './superagent/steps/StepTwo'
import SAStepThree from './superagent/steps/StepThree'

// import superAgentStore
import { editSuperAgentStore } from '@/zustand/editSuperAgentStore'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  languages: string[]
  currencies: string[]
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
  const defaultStateValues = {
    step: 0,
    siteID: null
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(defaultStateValues.step)
  const [siteID, setSiteID] = useState<number | null>(defaultStateValues.siteID)

  const [fileName, setFileName] = useState('')
  const [responseError, setResponseError] = useState<any>()
  const [resetKey, setResetKey] = useState(0)

  // ** References to multisteps
  const stepOneRef = React.useRef<any>()
  const stepTwoRef = React.useRef<any>()
  const stepThreeRef = React.useRef<any>()

  // ** Props
  const { open, toggle, languages, currencies } = props

  const handleClose = () => {
    toggle()
    stepOneRef?.current?.reset() // reference to the useForm
    setResetKey(prevKey => prevKey + 1)
    setFileName('')
    setResponseError({})
  }

  // Handle Stepper
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // call last submit form
      handleFinishForm()
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }
  const handleStepsReset = () => {
    setActiveStep(0)
  }

  const handleFinishForm = async () => {
    setTimeout(() => {
      handleStepsReset()
      handleClose()
    }, 1500)
  }

  // ** SA Steps
  const steps = [
    {
      title: 'Account Details',
      subtitle: 'Enter your Account Details',
      component: (
        <SAStepOne
          ref={stepOneRef}
          toggle={toggle}
          resetKey={resetKey}
          handleClose={handleClose}
          responseError={responseError}
          setResponseError={setResponseError}
          fileName={fileName}
          setFileName={setFileName}
          setSiteID={setSiteID}
          handleNext={handleNext}
          setIsLoading={setIsLoading}
          languages={languages}
          currencies={currencies}
        />
      )
    },
    {
      title: 'FQDNS Info',
      subtitle: 'Setup FQDNS',
      component: <SAStepTwo setIsLoading={setIsLoading} siteID={siteID} ref={stepTwoRef} handleNext={handleNext} />,
      hideStepperButton : true,
    },
    {
      title: 'Integration',
      subtitle: 'Input Integration and RSA',
      component: (
        <SAStepThree
          siteID={siteID}
          ref={stepThreeRef}
          toggle={toggle}
          resetKey={resetKey}
          handleClose={handleClose}
          responseError={responseError}
          setResponseError={setResponseError}
          fileName={fileName}
          setFileName={setFileName}
          setSiteID={setSiteID}
          handleNext={handleNext}
          setIsLoading={setIsLoading}
        />
      )
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
                    {!isLoading ? (
                      <>
                        {step.component}
                        
                        {  step.hideStepperButton == undefined && index > 0 && (
                          <div className='button-wrapper' style={{ paddingTop: '1rem', textAlign: 'center' }}>
                            <Button
                              style={styles.cancelButton}
                              size='large'
                              variant='contained'
                              onClick={handleNext}
                              sx={{ ml: 4 }}
                            >
                              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <LinearProgress />
                    )}
                  </StepContent>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
        {activeStep === steps.length && <CreatedSuccessful />}
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
