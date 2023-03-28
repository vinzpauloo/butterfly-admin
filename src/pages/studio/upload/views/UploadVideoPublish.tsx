// ** React import
import React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

// ** Next Imports
import { useRouter } from 'next/navigation'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

// ** Custom component imports
import ProgressCircularWithLabel from '@/layouts/components/shared-components/ProgressCircular'

//* Context Import
import { StudioContext, DisplayPage } from '..'

// Styled components
const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none'
  }
}))

const UploadVideoPublish = () => {
  const studioContext = React.useContext(StudioContext)
  const router = useRouter()
  // ** State
  const [finalTags, setFinalTags] = React.useState<string | undefined>('')
  const [finalGroupings, setFinalGroupings] = React.useState<string | undefined>('')

  React.useEffect(() => {
    renderTags()
    renderGroups()
  }, [])

  const handleCancelButton = () => {
    //navigate back
    studioContext?.setDisplayPage(DisplayPage.MainPage)
  }
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    studioContext?.setTitle(event.target.value)
  }
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    studioContext?.setDescription(event.target.value)
  }
  const renderTags = () => {
    setFinalTags(studioContext?.tags.join(', '))
  }
  const renderGroups = () => {
    setFinalGroupings(studioContext?.groupings.join(', '))
  }
  const handlePublish = () => {
    viewStudioContextValues()
    dummyNavigate()
  }
  const viewStudioContextValues = () => {
    console.log('studioContext', studioContext)
  }
  const dummyNavigate = () => {
    viewStudioContextValues()
  }

  return (
    <Box
      sx={{
        maxWidth: '800px',
        marginInline: 'auto',
        minWidth: '85%'
      }}
    >
      <Typography
        variant='h6'
        sx={{
          mb: 7,
          lineHeight: 1,
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '1.5rem !important',
          textAlign: 'left'
        }}
        color={theme => theme.customBflyColors.primaryText}
      >
        VIDEO PUBLISH
      </Typography>
      <BasicCard
        sx={{
          width: '100%',
          paddingTop: '0',
          '& .MuiCardContent-root': {
            paddingTop: '1rem'
          }
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <CustomTextField
              onChange={event => {
                handleTitleChange(event)
              }}
              value={studioContext?.title}
              sx={{ marginBlock: '.5rem' }}
              variant='filled'
              fullWidth
              placeholder='Title'
            />
            <CustomTextField
              onChange={event => {
                handleDescriptionChange(event)
              }}
              value={studioContext?.description}
              rows={3}
              multiline
              variant='filled'
              fullWidth
              placeholder='Description or Caption'
            />
          </Grid>

          <Grid item sm={12}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <CustomTextField
                  variant='filled'
                  fullWidth
                  placeholder='#TAGS'
                  value={finalTags}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={6}>
                <CustomTextField
                  variant='filled'
                  fullWidth
                  placeholder='GROUPING TEMPLATE'
                  value={finalGroupings}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item sm={5}>
            <Box
              sx={{
                marginTop: '1rem',
                borderRadius: '15px',
                backgroundColor: '#C4C4C4',
                display: 'flex',
                padding: '.5rem',
                gap: '1rem',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '160px',
                alignItems: 'center'
              }}
            >
              <Typography>Uploading Work Video</Typography>
              <ProgressCircularWithLabel progress={Number(studioContext?.workProgress)} />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                marginTop: '2rem'
              }}
              className='buttonContainer'
            >
              <Box>
                <CustomButton onClick={handleCancelButton}>Cancel</CustomButton>
              </Box>
              <Box>
                <CustomButton
                  onClick={() => handlePublish()}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'common.white'
                  }}
                >
                  {studioContext?.publishDate === 'publish' ? 'Publish' : 'Schedule'}
                </CustomButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </BasicCard>
    </Box>
  )
}

export default UploadVideoPublish
