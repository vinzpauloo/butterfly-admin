import React from 'react'
import toast from 'react-hot-toast'

// ** Import MUI
import { Box, Button } from '@mui/material'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'

// ** API queries
import { useQueryClient, useMutation } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'

export type FQDNData = {
  name: string
  values: [{ value: string }]
}

const EditStepTwo = () => {
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
          promiseArray.push({ site: 1, name: value.value, type: type }) // TESTING

          // promiseArray.push({ site: siteID, name: value.value, type: type })
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

      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}

export default EditStepTwo
