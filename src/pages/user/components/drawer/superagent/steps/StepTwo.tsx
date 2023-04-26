import React from 'react'

// ** Import MUI
import { Box, Button } from '@mui/material'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'

// ** API queries
import { useQueryClient } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'

type SAStepTwoProps = {
  siteID: number | null
}

export type FQDNData = {
  name : string
  values : [{ value : string }]
} 

const SAStepTwo = ({ siteID }: SAStepTwoProps, ref : any) => {

  // ** State
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // References
  const formAPIRef = React.useRef<any>()
  const formPhotosRef = React.useRef<any>()
  const formStreamRef = React.useRef<any>()

  // ** Use Imperative
  React.useImperativeHandle(ref, () => {
    return { handleFinish : () => handleFinish() }
  }, [])

  const handleFinish = () => {
    const allDataArray = []

    // check for empty values handleVALIDATIONS
    let noEmptyvalues : boolean = false
    noEmptyvalues = formAPIRef.current.getFormData().some( (item : {value : string} ) => { return item.value.length < 3 }) ? true : false
    noEmptyvalues = formStreamRef.current.getFormData().some( (item : {value : string} ) => { return item.value.length < 3 }) ? true : false
    noEmptyvalues = formPhotosRef.current.getFormData().some( (item : {value : string} ) => { return item.value.length < 3 }) ? true : false

    if (noEmptyvalues) return []

    allDataArray.push({ name : 'API', values :  formAPIRef.current.getFormData()})
    allDataArray.push({ name : 'Photo', values :  formPhotosRef.current.getFormData()})
    allDataArray.push({ name : 'Streaming', values :  formStreamRef.current.getFormData()})

    return allDataArray
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
            },
            '& .expandoGrid .MuiGrid-item' : {
              paddingLeft: 0
            },
            '& .expandoGrid .expandoInput input' : {
              height:'8px'
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
