// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  LinearProgress
} from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import clsx from 'clsx'

// ** Custom Components Imports
import StepperCustomDot from '@/layouts/components/shared-components/StepperCustomDot'
import CreatedSuccessful from '../form/CreatedSuccessful'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import Icon from 'src/@core/components/icon'

// ** Steps
import SuperAgentModal from '../modal/SuperAgentModal'
import SuperAgentModalStepTwo from '../modal/SuperAgentModalStepTwo'

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
  backgroundColor: '#FF9C00'
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

  const [fileName, setFileName] = useState<string | File>('')

  const [responseError, setResponseError] = useState<any>()
  const [resetKey, setResetKey] = useState(0)

  // ** References to multisteps
  const stepOneRef = React.useRef<any>()
  const stepTwoRef = React.useRef<any>()

  // const stepThreeRef = React.useRef<any>()

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
        <SuperAgentModal
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
      component: (
        <SuperAgentModalStepTwo setIsLoading={setIsLoading} siteID={siteID} ref={stepTwoRef} handleNext={handleNext} />
      ),
      hideStepperButton: true
    }

    // {
    //   title: 'Integration',
    //   subtitle: 'Input Integration and RSA',
    //   component: (
    //     <SAStepThree
    //       siteID={siteID}
    //       // ref={stepThreeRef}
    //       toggle={toggle}
    //       resetKey={resetKey}
    //       handleClose={handleClose}
    //       responseError={responseError}
    //       setResponseError={setResponseError}
    //       fileName={fileName}
    //       setFileName={setFileName}
    //       setSiteID={setSiteID}
    //       handleNext={handleNext}
    //       setIsLoading={setIsLoading}
    //     />
    //   )
    // }
  ]

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
      <Header>
        <DialogTitle color='#FFF' textTransform='uppercase'>
          Super Agent
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
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`Step 0${index + 1}`}</Typography>
                      {/* <Typography className='step-number'>{`0${index + 1}`}</Typography> */}
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

                        {/* {  step.hideStepperButton == undefined && index > 0 && (
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
                        )} */}
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
      </DialogContent>
    </Dialog>
  )
}

export default SADrawer
