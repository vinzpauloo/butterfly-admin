// ** React Imports
import React, { SyntheticEvent } from 'react'
import toast from 'react-hot-toast'

// ** MUI Imports
import { Box, Button, Tab, Typography } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'

// ** Project/Other Imports
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'

// ** Tanstack Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import FQDNService from '@/services/api/FQDNService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import CreatedSuccessful from '../form/CreatedSuccessful'

// ** types
type SAStepTwoProps = {
  siteID: number | null
  handleNext: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type FQDNData = {
  site: number
  fqdns: { name?: string; type?: 'api' | 'streaming' | 'photo' }[]
  fqdn_admin: { name?: string }[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SuperAgentModalStepTwo = ({ siteID, handleNext, setIsLoading }: SAStepTwoProps, ref: any) => {
  // ** State
  const [isLoading] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>('api')
  const [submitted, setSubmitted] = React.useState<boolean>()

  const [apiFormData, setApiFormData] = React.useState<{ value: string }[]>([])
  const [streamingFormData, setStreamingFormData] = React.useState<{ value: string }[]>([])
  const [photosFormData, setPhotosFormData] = React.useState<{ value: string }[]>([])
  const [fqdnFormData, setFqdnFormData] = React.useState<{ value: string }[]>()

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // References
  const formAPIRef = React.useRef<any>()
  const formPhotosRef = React.useRef<any>()
  const formStreamRef = React.useRef<any>()
  const formAdminFQDNRef = React.useRef<any>()

  // ** Hooks
  const { addFQDN } = FQDNService()
  const queryClient = useQueryClient()
  const fqdnM = useMutation({
    mutationFn: addFQDN,
    onSuccess: response => {
      console.log('response from addFQDN', response)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['fqdns'])
    }
  })

  // ** Error Handling Hooks
  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()
  const [validation, setValidation] = React.useState<string>()

  const handleFinish = () => {
    // check for empty values handleVALIDATIONS
    let hasEmptyvalues = false
    if (apiFormData) {
      hasEmptyvalues =
        apiFormData.some((item: { value: string }) => {
          return item.value.length < 3
        }) || hasEmptyvalues
    }

    if (streamingFormData) {
      hasEmptyvalues =
        streamingFormData.some((item: { value: string }) => {
          return item.value.length < 3
        }) || hasEmptyvalues
    }

    if (photosFormData) {
      hasEmptyvalues =
        photosFormData.some((item: { value: string }) => {
          return item.value.length < 3
        }) || hasEmptyvalues
    }

    if (fqdnFormData) {
      hasEmptyvalues =
        fqdnFormData.some((item: { value: string }) => {
          return item.value.length < 1
        }) || hasEmptyvalues
    }

    if (hasEmptyvalues) {
      console.log('has empty values dont submit')
      setValidation('Please input all fields. Make sure they are valid URLs.')

      return
    }

    // structure
    const apiArray = apiFormData ? apiFormData.map((name: any) => ({ name: name.value, type: 'api' })) : []
    const photoArray = photosFormData ? photosFormData.map((name: any) => ({ name: name.value, type: 'photo' })) : []
    const streamingArray = streamingFormData
      ? streamingFormData.map((name: any) => ({ name: name.value, type: 'streaming' }))
      : []
    const [fqdnAdmin] = fqdnFormData ? fqdnFormData.map((name: any) => name.value).filter(Boolean) : []
    const fqdnsObject = {
      fqdns: [...apiArray, ...photoArray, ...streamingArray],
      fqdn_admin: fqdnAdmin
    }

    console.log('START SUBMIT fqdnsObject', fqdnsObject)

    //submit FQDN
    submitFQDN(fqdnsObject as FQDNData)
  }

  const submitFQDN = async (fqdnsObject: FQDNData) => {
    try {
      //Do submissions!!

      if (Object.keys(fqdnsObject)?.length == 0) {
        toast.error('FQDN is required')

        return
      } else {
        console.log('allFQDNData', fqdnsObject)

        await fqdnM.mutateAsync({
          siteId: siteID as number,
          data: fqdnsObject
        })
      }
      setSubmitted(true)

      setTimeout(() => {
        clearErrorResponse()
        handleNext()
      }, 1000)
    } catch (e: any) {
      handleError(e, `createFQDN() StepTwo.tsx Super Agent`)
    }
  }

  return (
    <>
      {!submitted ? (
        <TabContext value={value}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={handleTabsChange}
            sx={{
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
              '.Mui-selected': {
                color: `#FF9C00 !important`
              }
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#FF9C00'
              }
            }}
          >
            <Tab value='api' label='API' />
            <Tab value='streaming' label='STREAMING' />
            <Tab value='photos' label='PHOTOS' />
            <Tab value='admin-fqdn' label='ADMIN FQDN' />
          </TabList>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              '& .MuiPaper-root': {
                boxShadow: 'none'
              },
              '& .MuiCardContent-root': {
                paddingTop: '0'
              },
              '& .expandoGrid .MuiGrid-item': {
                paddingLeft: 0
              },
              '& .expandoGrid .expandoInput input': {
                height: '8px'
              }
            }}
          >
            <TabPanel value='api'>
              <ExpandoForm
                multipleInputs={true}
                onUpdate={data => setApiFormData(data)}
                ref={formAPIRef}
                fileType='text'
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{
                  expando: !apiFormData || apiFormData.length === 0 ? [{ value: '' }] : apiFormData
                }}
              />
            </TabPanel>
            <TabPanel value='streaming'>
              <ExpandoForm
                multipleInputs={true}
                onUpdate={data => setStreamingFormData(data)}
                ref={formStreamRef}
                fileType='text'
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{
                  expando: !streamingFormData || streamingFormData.length === 0 ? [{ value: '' }] : streamingFormData
                }}
              />
            </TabPanel>
            <TabPanel value='photos'>
              <ExpandoForm
                multipleInputs={true}
                onUpdate={data => setPhotosFormData(data)}
                ref={formPhotosRef}
                fileType='text'
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{
                  expando: !photosFormData || photosFormData.length === 0 ? [{ value: '' }] : photosFormData
                }}
              />
            </TabPanel>

            <TabPanel value='admin-fqdn'>
              <ExpandoForm
                onUpdate={data => setFqdnFormData(data)}
                ref={formAdminFQDNRef}
                fileType='text'
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{ expando: fqdnFormData ?? [{ value: '' }] }}
              />
            </TabPanel>

            <Typography color='error'>{validation}</Typography>
            {/* Error Messages from backend */}
            {getErrorResponse(12)}

            <div className='button-wrapper' style={{ paddingTop: '1rem', textAlign: 'center' }}>
              <Button
                style={styles.cancelButton}
                size='large'
                variant='contained'
                onClick={() => {
                  handleFinish()
                }}
                sx={{ ml: 4 }}
              >
                Save and Continue
              </Button>
            </div>
          </Box>
        </TabContext>
      ) : (
        <CreatedSuccessful />
      )}
    </>
  )
}

const styles = {
  cancelButton: {
    backgroundColor: '#98A9BC',
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#7899ac'
    }
  }
}

export default React.forwardRef(SuperAgentModalStepTwo)
