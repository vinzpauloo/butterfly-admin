// ** React imports
import React from 'react'

// ** Next Images
import Image from 'next/image'

// ** MUI Imports
import { Grid, Select, Typography, Box, TextField, Stack } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

// ** Services Import

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

// ** Third Party Components

// ** Configs

//* Context Import
import { StudioContext, DisplayPage } from '..'
import { style } from '@mui/system'

// Styled components
const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxHeight: '87px',
  objectFit: 'contain'
}))

const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none'
  }
}))

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  '& .MuiSelect-select': {
    paddingBlock: '.5em'
  }
}))

const CustomStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '5px',
  padding: '1em',
  marginTop: '1rem',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: '.6rem'
}))

const ThumbnailBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  justifyContent: 'center',
  borderRadius: '5px',
  padding: '0',
  marginBottom: 18,
  maxWidth: '180px',
  marginLeft: 'auto',
  height: '100%',
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  paddingBlock: '.5rem'
}))

// ** Data

// ** Props and interfaces
type Props = {}

const UploadAlbum = (props: Props) => {
  /* States */
  const studioContext = React.useContext(StudioContext)

  // ** react query / api services

  // load groupings

  // load contentCreators

  // ** File Upload Dropzone

  // ** Component Functions
  const handleCancelButton = () => {
    //navigate back
    studioContext?.setDisplayPage(DisplayPage.MainPage)
  }

  return (
    <BasicCard sx={{ ...styles.container }}>
      <Box>
        <Typography sx={{ ...styles.title }} variant='h6' color={theme => theme.customBflyColors.primaryTextContrast}>
          Album Title
        </Typography>
        <form>
          <CustomTextField sx={{ width: ['100%', '100%', '45%'] }} id='title' placeholder='Title' type='text' />
        </form>
      </Box>

      {/* LEFT AND TOP SIDE CONTAINER */}
      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], gap: 5, mt: 5 }}>
        <Box
          sx={{
            backgroundColor: theme => theme.customBflyColors.grayBG,
            width: ['100%', '100%', '50dvw'],
            height: '60dvh',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
              height: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
              }}
            >
              <Image src='/images/studio/butterfly_file_upload.png' alt='SINGLE FILE LOAD' width={100} height={100} />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography sx={{ ...styles.title }} variant='h6'>
                Album Cover
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* RIGHT and BOTTOM SIDE CONTAINER */}
        <Box
          sx={{
            backgroundColor: theme => theme.customBflyColors.grayBG,
            width: ['100%', '100%', '50dvw'],
            height: '60dvh',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: {
              xs: 'row',
              sm: 'row',
              md: 'column',
              lg: 'column'
            },
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}>TEST TOP</Box>
          <Box sx={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>TEST BOTTOM</Box>
        </Box>
      </Box>

      {/* BUTTON CONTAINER */}
      <Box sx={{ ...styles.btnWrapper }}>
        <Box>
          <CustomButton sx={{ ...styles.buttons }} onClick={handleCancelButton}>
            Cancel
          </CustomButton>
        </Box>
        <Box>
          <CustomButton sx={{ ...styles.buttons }} onClick={handleCancelButton}>
            Continue
          </CustomButton>
        </Box>
      </Box>
    </BasicCard>
  )
}

const styles = {
  container: {
    width: {
      xs: '100%',
      sm: '85%',
      md: '85%',
      lg: '85%'
    },
    paddingTop: '0',
    '& .MuiCardContent-root': {
      paddingTop: '1rem'
    }
  },
  title: {
    mb: '.8rem',
    textTransform: 'uppercase'
  },

  // Button Container
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    mt: 5,
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    }
  },
  buttons: {
    width: 150
  }
}

export default UploadAlbum
