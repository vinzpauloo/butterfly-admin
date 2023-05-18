// ** React Imports
import React from 'react'
import toast from 'react-hot-toast'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'
import CreatedSuccessful from '../../../form/CreatedSuccessful'

// ** API queries
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { useErrorHandling } from '@/hooks/useErrorHandling'
import FQDNService from '@/services/api/FQDNService'

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
}

export type FQDNData = {
  name: string
  values: [{ value: string }]
  site: number
  fqdns: { name?: string; type?: 'api' | 'streaming' | 'photo' }[]
}

// ** Used to handle the Object key of FQDN array retured by backend
function normalizeData(data: FQDNProps) {
  const normalizedData: { [key: string]: Array<{ value: string }> } = {
    api: [],
    photo: [],
    streaming: []
  }

  Object.keys(data).forEach(key => {
    const lowerKey = key.toLowerCase()
    if (normalizedData[lowerKey] !== undefined) {
      normalizedData[lowerKey] = normalizedData[lowerKey].concat(data[key as keyof FQDNProps].map(value => ({ value })))
    }
  })

  return normalizedData
}

const EditStepTwo = (props: SidebarAddUserType) => {
  // ** Props
  const { toggle } = props

  // ** Store
  const { siteData } = editSuperAgentStore()

  // ** States
  const [fqdnList, setFqdnList] = React.useState<FQDNProps>()
  const [submitted, setSubmitted] = React.useState<boolean>()
  const [isLoading] = React.useState<boolean>(false)

  // ** Tanstack and services
  const { addFQDN, getSuperAgentFQDNList } = FQDNService()
  const { handleError, getErrorResponse } = useErrorHandling()
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

  let normalizedData

  if (fqdnList !== undefined) {
    normalizedData = normalizeData(fqdnList)
  }

  // References
  const formAPIRef = React.useRef<any>()
  const formPhotosRef = React.useRef<any>()
  const formStreamRef = React.useRef<any>()

  const handleFinish = () => {
    // check for empty values handleVALIDATIONS
    let hasEmptyvalues = false
    hasEmptyvalues = formAPIRef.current.getFormData().some((item: { value: string }) => {
      return item.value.length < 3
    })
      ? true
      : false
    hasEmptyvalues = formStreamRef.current.getFormData().some((item: { value: string }) => {
      return item.value.length < 3
    })
      ? true
      : false
    hasEmptyvalues = formPhotosRef.current.getFormData().some((item: { value: string }) => {
      return item.value.length < 3
    })
      ? true
      : false

    if (hasEmptyvalues) {
      console.log('has empty values dont submit')

      return
    }

    // structure
    const apiArray = formAPIRef.current.getFormData().map((name: any) => ({ name: name.value, type: 'api' }))
    const photoArray = formPhotosRef.current.getFormData().map((name: any) => ({ name: name.value, type: 'photo' }))
    const streamingArray = formStreamRef.current
      .getFormData()
      .map((name: any) => ({ name: name.value, type: 'streaming' }))
    const fqdnsObject = { fqdns: [...apiArray, ...photoArray, ...streamingArray] }

    console.log('START SUBMIT fqdnsObject', fqdnsObject)

    //submit FQDN
    handleSubmit(fqdnsObject as FQDNData)
  }

  const handleSubmit = async (fqdnsObject: FQDNData) => {
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
        setSubmitted(false)
        toggle()
      }, 1500)
    } catch (e: any) {
      handleError(e, `createFQDN() EditStepTwo.tsx Super Agent`)
    }
  }

  return (
    <>
      {!submitted ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
          {normalizedData?.api && (
            <ExpandoForm
              ref={formAPIRef}
              fileType='text'
              pageHeader="API's"
              isLoading={isLoading}
              disableSaveButton={true}
              defaultValues={{ expando: normalizedData?.api || [] }}
            />
          )}
          {normalizedData?.streaming && (
            <ExpandoForm
              ref={formStreamRef}
              fileType='text'
              pageHeader='STREAMING'
              isLoading={isLoading}
              disableSaveButton={true}
              defaultValues={{ expando: normalizedData?.streaming || [] }}
            />
          )}
          {normalizedData?.photo && (
            <ExpandoForm
              ref={formPhotosRef}
              fileType='text'
              pageHeader='PHOTOS'
              isLoading={isLoading}
              disableSaveButton={true}
              defaultValues={{ expando: normalizedData?.photo || [] }}
            />
          )}

          {/* Error Response from backend */}
          {getErrorResponse(12)}

          <Button
            sx={styles.submitButton}
            onClick={() => {
              handleFinish()
            }}
          >
            <Typography sx={styles.text}>Submit</Typography>
          </Button>
        </Box>
      ) : (
        <CreatedSuccessful update />
      )}
    </>
  )
}

const styles = {
  submitButton: {
    backgroundColor: '#9747FF',
    color: 'white',
    width: '200px',
    mr: 4,
    '&:hover': {
      backgroundColor: '#9747FF'
    }
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-in-out'
    }
  }
}

export default EditStepTwo
