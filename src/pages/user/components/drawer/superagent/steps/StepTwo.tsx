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
  name: string
  values: [{ value: string }]
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
      alert('DONT SUBMIT')
      return
    }

    // structure
    allDataArray.push({ name: 'API', values: formAPIRef.current.getFormData() })
    allDataArray.push({ name: 'Photo', values: formPhotosRef.current.getFormData() })
    allDataArray.push({ name: 'Streaming', values: formStreamRef.current.getFormData() })

    console.log('START SUBMIT', allDataArray)

    //submit FQDN
    submitFQDN(allDataArray)
  }

  const submitFQDN = async (allDataArray: FQDNData[]) => {
    const allFQDNData = allDataArray
    console.log('SUBMIT THIS FQDN', allFQDNData)

    // start stepper loader
    setIsLoading(true)

    //Do submissions!!

    if (allFQDNData?.length == 0) {
      toast.error('FQDN Values Must at least be 3 characters')
      return
    } else {
      console.log('allFQDNData', allFQDNData)

      const promiseArray: any[] = []
      allFQDNData?.map((data: FQDNData) => {
        const type = data.name as 'Api' | 'Photo' | 'Streaming'
        data.values.forEach(value => {
          promiseArray.push({ site: siteID, name: value.value, type: type })
        })
      })

      setIsLoading(true)
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
