import React from 'react'

// ** Import MUI
import { Box, Button } from '@mui/material'

// ** Import component
import ExpandoForm from '@/pages/fqdn/views/ExpandoForm'

// Zustand SuperAgentStore
import { editSuperAgentStore } from '@/zustand/editSuperAgentStore'

// ** Import third party components
import toast from 'react-hot-toast'

// ** Tanstack and services
import FQDNService from '@/services/api/FQDNService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** types
type SAStepTwoProps = {
  siteID: number | null
  handleNext: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type FQDNData = {
  site: number
  fqdns: {name?: string, type?: 'Api' | 'Streaming' | 'Photo'}[]
}

const SAStepTwo = ({ siteID, handleNext, setIsLoading }: SAStepTwoProps, ref: any) => {
  // ** State
  const [isLoading] = React.useState<boolean>(false)

  // References
  const formAPIRef = React.useRef<any>()
  const formPhotosRef = React.useRef<any>()
  const formStreamRef = React.useRef<any>()

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

  const handleFinish = () => {
    const allDataArray = []

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
    const apiArray = formAPIRef.current.getFormData().map( (name : any) => ( { 'name' : name.value, type : 'API'} ) ) 
    const photoArray = formPhotosRef.current.getFormData().map( (name : any) => ( { 'name' : name.value, type : 'Photo'} ) ) 
    const streamingArray = formStreamRef.current.getFormData().map( (name : any) => ( { 'name' : name.value, type : 'Streaming'} ) ) 
    const fqdnsObject = { "site" : siteID,"fqdns" : [ ...apiArray, ...photoArray, ...streamingArray ] }

    console.log('START SUBMIT fqdnsObject', fqdnsObject)

    //submit FQDN
    submitFQDN(fqdnsObject as FQDNData)
  }

  const submitFQDN = async (fqdnsObject  : FQDNData) => {

    // start stepper loader
    setIsLoading(true)

    //Do submissions!!

    if (Object.keys(fqdnsObject)?.length == 0) {
      toast.error('FQDN is required')
      return
    } else {
      console.log('allFQDNData', fqdnsObject)

      setIsLoading(true)

      await fqdnM.mutateAsync({
        data: fqdnsObject
      })
      
    }

    setTimeout(() => {
      setIsLoading(false)
      handleNext()
    }, 1500)
  }

  return (
    <>
      {/* Commented out siteID */}
      {siteID ? `Site ID: ${siteID}` : 'null'}
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
            fileType='text'
            pageHeader="API's"
            isLoading={isLoading}
            disableSaveButton={true}
          />
          <ExpandoForm
            ref={formStreamRef}
            fileType='text'
            pageHeader='STREAMING'
            isLoading={isLoading}
            disableSaveButton={true}
          />
          <ExpandoForm
            ref={formPhotosRef}
            fileType='text'
            pageHeader='PHOTOS'
            isLoading={isLoading}
            disableSaveButton={true}
          />

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

export default React.forwardRef(SAStepTwo)
