import React from 'react'
import toast from 'react-hot-toast'

// ** Import MUI
import { Box, Button, Typography } from '@mui/material'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'

// ** API queries
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'

// ** Zustand Imports
import { editSuperAgentStore } from '@/zustand/editSuperAgentStore'

interface SidebarAddUserType {
  data: any
}

export type FQDNData = {
  name: string
  values: [{ value: string }]
}

const EditStepTwo = (props: SidebarAddUserType) => {
  // ** Tanstack and services
  const { addFQDN, getSuperAgentFQDNList } = FQDNService()
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

  interface FQDNProps {
    Api: []
    Photo: []
    Streaming: []
  }

  const [fqdnList, setFqdnList] = React.useState<FQDNProps>()

  useQuery({
    queryKey: [`editSuperAgentStepTwoFQDN`],
    queryFn: () =>
      getSuperAgentFQDNList({
        site: siteData[0]?.id
      }),
    onSuccess: data => {
      setFqdnList(data)
    }
  })

  // ** Used to set default values for Expando Forms
  const apiDefaultValues = fqdnList?.Api.map(value => ({ value })) || []
  const streamDefaultValues = fqdnList?.Streaming.map(value => ({ value })) || []
  const photoDefaultValues = fqdnList?.Photo.map(value => ({ value })) || []

  const { siteData } = editSuperAgentStore()

  // const { data } = props

  // console.log(`PROPS DATA`, data)
  // console.log(`STEP 2 SITE DATA`, siteData[0])
  // console.log(`STEP 2 Site Data ID`, siteData[0]?.id)

  // ** State
  const [isLoading] = React.useState<boolean>(false)

  // References
  const formAPIRef = React.useRef<any>()
  const formPhotosRef = React.useRef<any>()
  const formStreamRef = React.useRef<any>()

  const handleFinish = () => {
    const allDataArray = []

    // check for empty values handleVALIDATIONS
    let noEmptyvalues = false
    noEmptyvalues = formAPIRef.current.getFormData().some((item: { value: string }) => {
      return item.value.length < 3
    })
      ? true
      : false
    noEmptyvalues = formStreamRef.current.getFormData().some((item: { value: string }) => {
      return item.value.length < 3
    })
      ? true
      : false
    noEmptyvalues = formPhotosRef.current.getFormData().some((item: { value: string }) => {
      return item.value.length < 3
    })
      ? true
      : false

    if (noEmptyvalues) return []

    allDataArray.push({ name: 'API', values: formAPIRef.current.getFormData() })
    allDataArray.push({ name: 'Photo', values: formPhotosRef.current.getFormData() })
    allDataArray.push({ name: 'Streaming', values: formStreamRef.current.getFormData() })

    return allDataArray
  }

  const handleSubmit = async () => {
    // TODO ** edit fqdns waiting for api changes
    return
  }

  return (
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
      {fqdnList?.Api && (
        <ExpandoForm
          ref={formAPIRef}
          fileType='text'
          pageHeader="API's"
          isLoading={isLoading}
          disableSaveButton={true}
          defaultValues={{ expando: apiDefaultValues }}
        />
      )}
      {fqdnList?.Streaming && (
        <ExpandoForm
          ref={formStreamRef}
          fileType='text'
          pageHeader='STREAMING'
          isLoading={isLoading}
          disableSaveButton={true}
          defaultValues={{ expando: streamDefaultValues }}
        />
      )}
      {fqdnList?.Photo && (
        <ExpandoForm
          ref={formPhotosRef}
          fileType='text'
          pageHeader='PHOTOS'
          isLoading={isLoading}
          disableSaveButton={true}
          defaultValues={{ expando: photoDefaultValues }}
        />
      )}

      <Button sx={styles.submitButton} onClick={handleSubmit}>
        <Typography sx={styles.text}>Submit</Typography>
      </Button>
    </Box>
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
