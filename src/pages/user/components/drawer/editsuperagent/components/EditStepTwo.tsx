// ** React Imports
import React, { SyntheticEvent } from 'react'
import toast from 'react-hot-toast'

// ** MUI Imports
import { Box, Button, Tab, Typography } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'
import CreatedSuccessful from '../../../form/CreatedSuccessful'

// ** API queries
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { useErrorHandling } from '@/hooks/useErrorHandling'
import FQDNService from '@/services/api/FQDNService'
import { useFQDNdata } from '@/hooks/useFQDNdata'

// ** Zustand Imports
import { editSuperAgentStore } from '@/zustand/editSuperAgentStore'

interface SidebarAddUserType {
  data: any
  toggle: () => void
}

interface FQDNProps {
  api: []
  photo: []
  streaming: []
  fqdn_admin: string
}

export type FQDNData = {
  name: string
  values: [{ value: string }]
  site: number
  fqdns: { name?: string; type?: 'api' | 'streaming' | 'photo' }[]
  fqdn_admin: { name?: string }[]
}

const EditStepTwo = (props: SidebarAddUserType) => {
  // ** Props
  const { toggle } = props

  // ** Store
  const { siteData } = editSuperAgentStore()

  // ** States
  const [value, setValue] = React.useState<string>('api')
  const [fqdnList, setFqdnList] = React.useState<FQDNProps>()
  const [submitted, setSubmitted] = React.useState<boolean>()
  const [isLoading] = React.useState<boolean>(false)
  const [validation, setValidation] = React.useState<string>()

  const [apiFormData, setApiFormData] = React.useState<{ value: string }[]>([])
  const [streamingFormData, setStreamingFormData] = React.useState<{ value: string }[]>([])
  const [photosFormData, setPhotosFormData] = React.useState<{ value: string }[]>([])
  const [fqdnFormData, setFqdnFormData] = React.useState<{ value: string }[]>()

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // ** Tanstack and services
  const { addFQDN, getSuperAgentFQDNList } = FQDNService()
  const { handleError, getErrorResponse, clearErrorResponse } = useErrorHandling()
  const queryClient = useQueryClient()
  const fqdnM = useMutation({
    mutationFn: addFQDN,
    onSuccess: response => {
      console.log('response from addFQDN', response)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['fqdns'])
    },
    onError: (e: any) => {
      handleError(e, `addFQDN() EditStepTwo.tsx`)
    }
  })

  useQuery({
    queryKey: [`editSuperAgentStepTwoFQDN`],
    queryFn: () =>
      getSuperAgentFQDNList({
        site: siteData[0]?.id
      }),
    onSuccess: data => {
      setFqdnList(data)
    },
    onError: (e: any) => {
      handleError(e, `getSuperAgentFQDNList() EditStepTwo.tsx`)
    }
  })

  // ** Helper function
  const { formatFQDNdata } = useFQDNdata()

  // ** Format the returned Object key of the FQDN fetched data
  let normalizedData
  if (fqdnList !== undefined) {
    normalizedData = formatFQDNdata(fqdnList)
  }

  // References
  const formAPIRef = React.useRef<any>()
  const formPhotosRef = React.useRef<any>()
  const formStreamRef = React.useRef<any>()
  const formAdminFQDNRef = React.useRef<any>()

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
          siteId: siteData[0]?.id,
          data: fqdnsObject
        })

        setSubmitted(true)
      }

      setTimeout(() => {
        clearErrorResponse()
        toggle()
      }, 1000)
    } catch (e: any) {
      handleError(e, `createFQDN() EditStepTwo.tsx Super Agent`)
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
              {normalizedData?.api && (
                <ExpandoForm
                  multipleInputs={true}
                  onUpdate={data => setApiFormData(data)}
                  ref={formAPIRef}
                  fileType='text'
                  isLoading={isLoading}
                  disableSaveButton={true}
                  defaultValues={{
                    expando: !apiFormData || apiFormData.length === 0 ? normalizedData?.api : apiFormData
                  }}
                />
              )}
            </TabPanel>
            <TabPanel value='streaming'>
              {normalizedData?.streaming && (
                <ExpandoForm
                  multipleInputs={true}
                  onUpdate={data => setStreamingFormData(data)}
                  ref={formStreamRef}
                  fileType='text'
                  isLoading={isLoading}
                  disableSaveButton={true}
                  defaultValues={{
                    expando:
                      !streamingFormData || streamingFormData.length === 0
                        ? normalizedData?.streaming
                        : streamingFormData
                  }}
                />
              )}
            </TabPanel>
            <TabPanel value='photos'>
              {normalizedData?.photo && (
                <ExpandoForm
                  multipleInputs={true}
                  onUpdate={data => setPhotosFormData(data)}
                  ref={formPhotosRef}
                  fileType='text'
                  isLoading={isLoading}
                  disableSaveButton={true}
                  defaultValues={{
                    expando: !photosFormData || photosFormData.length === 0 ? normalizedData?.photo : photosFormData
                  }}
                />
              )}
            </TabPanel>

            <TabPanel value='admin-fqdn'>
              <ExpandoForm
                onUpdate={data => setFqdnFormData(data)}
                ref={formAdminFQDNRef}
                fileType='text'
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{
                  expando:
                    fqdnList?.fqdn_admin !== undefined || null
                      ? [{ value: `${fqdnList?.fqdn_admin}` }]
                      : fqdnFormData ?? [{ value: '' }]
                }}
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
        <CreatedSuccessful update />
      )}
    </>
  )
}

const styles = {
  cancelButton: {
    backgroundColor: '#FF9C00',
    color: 'white',
    width: '200px',
    mr: 4,
    '&:hover': {
      backgroundColor: '#FF7c02'
    }
  }
}

export default EditStepTwo
