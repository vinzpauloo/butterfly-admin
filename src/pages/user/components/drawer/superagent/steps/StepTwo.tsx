import React from 'react'

// ** Import MUI
import { Box, Button } from '@mui/material'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'

// ** API queries
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'

type SAStepTwoProps = {
  siteID: number | null
}

const SAStepTwo = ({ siteID }: SAStepTwoProps, ref : any) => {

  // ** State
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // ** Tanstack api calls
  const { addFQDN } = FQDNService()

  // References
  const formAPIRef = React.useRef<any>()
  const formPhotosRef = React.useRef<any>()
  const formStreamRef = React.useRef<any>()

  // ** Use Imperative
  React.useImperativeHandle(ref, () => {
    return { handleFinish : () => handleFinish() }
  }, [])

  const queryClient = useQueryClient()
  const fqdnMutate = useMutation({
    mutationFn: addFQDN,
    onSuccess: response => {
      console.log('response from addFQDN', response)
    },
    onMutate: () => {},
    onSettled: () => {
      queryClient.invalidateQueries(['fqdns'])
    }
  })


  const handleFinish = () => {
    const allDataArray = []

    //handleVALIDATIONS
    allDataArray.push(formAPIRef.current.getFormData())
    allDataArray.push(formPhotosRef.current.getFormData())
    allDataArray.push(formStreamRef.current.getFormData())
    console.log('alLDataarray', allDataArray )
  }

  const handleAPISubmit = async (data: any) => {

  }

  const handleStreamSubmit = async (data: any) => {

  }

  const handlePhotoSubmit = async (data: any) => {

  }

  return (
    <>
      {siteID && (
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
            }
          }}
        >
          <ExpandoForm
            ref={formAPIRef}
            handleExpandoSubmit={ data => handleAPISubmit(data)}
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
        </Box>
      )}
    </>
  )
}

export default React.forwardRef(SAStepTwo)
