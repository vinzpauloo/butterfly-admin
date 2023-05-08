import React from 'react'
import toast from 'react-hot-toast'

// ** Import MUI
import { Box, Button, Typography } from '@mui/material'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'

// ** API queries
import { useQueryClient, useMutation } from '@tanstack/react-query'
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

  const { siteData } = editSuperAgentStore()

  const { data } = props
  console.log(`PROPS DATA`, data)

  console.log(`STEP 2 SITE DATA`, siteData[0])
  console.log(`STEP 2 Site Data ID`, siteData[0]?.id)

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
    const allFQDNData = handleFinish()

    if (allFQDNData?.length == 0) {
      toast.error('FQDN Values Must at least be 3 characters')

      return
    } else {
      console.log('allFQDNData', allFQDNData)

      //handleDataSubmit
      const promiseArray: any[] = []
      allFQDNData?.map((data: FQDNData) => {
        const type = data.name as 'Api' | 'Photo' | 'Streaming'
        data.values.forEach(value => {
          promiseArray.push({ site: siteData[0]?.id, name: value.value, type: type })
        })
      })

      const promises = promiseArray.map((data: { name: string; site: number; type: string }) =>
        fqdnM.mutateAsync({
          data: {
            site: data.site,
            name: data.name,
            type: data.type as 'Api' | 'Photo' | 'Streaming'
          }
        })
      )
      await Promise.all(promises)
    }
  }

  const handleAPISubmit = async (data: any) => {}

  const handleStreamSubmit = async (data: any) => {}

  const handlePhotoSubmit = async (data: any) => {}

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
      <ExpandoForm
        ref={formAPIRef}
        handleExpandoSubmit={data => handleAPISubmit(data)}
        fileType='text'
        pageHeader="API's"
        isLoading={isLoading}
        disableSaveButton={true}
      />
      <ExpandoForm
        ref={formStreamRef}
        handleExpandoSubmit={handleStreamSubmit}
        fileType='text'
        pageHeader='STREAMING'
        isLoading={isLoading}
        disableSaveButton={true}
      />
      <ExpandoForm
        ref={formPhotosRef}
        handleExpandoSubmit={handlePhotoSubmit}
        fileType='text'
        pageHeader='PHOTOS'
        isLoading={isLoading}
        disableSaveButton={true}
      />

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
