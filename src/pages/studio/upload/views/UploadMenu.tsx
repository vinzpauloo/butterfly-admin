// ** React Imports
import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'
import CreateFeedModal from '@/pages/settings/components/modal/CreateFeedModal'

//* Context Import
import { StudioContext } from '..'
import { DisplayPage } from '..'
import Translations from '@/layouts/components/Translations'

// ** Hooks
import { useAuth } from '@/services/useAuth'

// ** Styled Components
const UploadBoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    maxWidth: '416px',
    marginInline: 'auto'
  },
  color: theme.palette.primary.dark
}))

const TOSLink = styled(Link)(({ theme }) => ({
  color: theme.customBflyColors.primaryTextContrast
}))

// ** Types & Interfaces
type Props = {}

const UploadMenu = (props: Props) => {
  const router = useRouter()
  const [feedModal, setFeedModal] = React.useState(false)

  // ** Hooks
  const auth = useAuth()

  const studioContext = React.useContext(StudioContext)

  const handleUploadButtonClick = () => {
    studioContext?.setDisplayPage(DisplayPage.UploadVideoStep1)
  }

  const handleUploadAlbumClick = () => {
    // studioContext?.setDisplayPage(DisplayPage.UploadAlbum)
    router.push(`/studio/album/upload`)
  }

  const handleNewsfeedsButtonClick = () => {
    //studioContext?.setDisplayPage(DisplayPage.UploadNewsfeedsStep1)
    setFeedModal(true)
  }

  return (
    <>
      <Typography
        variant='h6'
        sx={{
          marginInline: 'auto',
          mt: ['1rem', 0],
          mb: 7,
          lineHeight: 1,
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: ['1rem', '1.5rem !important'],
          textAlign: 'center'
        }}
        color={theme => theme.customBflyColors.primaryText}
      >
        <Translations text='THE STUDIO PAGE - UPLOAD' />
      </Typography>

      <BasicCard
        sx={{
          paddingInline: [null, null, null, '3rem'],
          paddingTop: [null, null, null, '2rem'],
          maxWidth: 800
        }}
      >
        <Grid maxWidth={700} container rowGap={5}>
          <Grid xs={12} item>
            <Typography
              color={theme => theme.customBflyColors.primaryTextContrast}
              variant='body1'
              sx={{
                mb: 2,
                textAlign: 'center',
                fontWeight: 400,
                fontSize: ['.875rem', '1rem']
              }}
            >
              <Translations text='Please Select content to upload' />
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <UploadBoxContainer>
              <CustomButton onClick={handleUploadButtonClick}>
                <Translations text='Upload Video' />
              </CustomButton>
            </UploadBoxContainer>
          </Grid>

          {auth?.user?.role != 'CC' && (
            <Grid xs={12} item>
              <UploadBoxContainer>
                <CustomButton onClick={handleUploadAlbumClick}>
                  <Translations text='Upload Album' />
                </CustomButton>
              </UploadBoxContainer>
            </Grid>
          )}

          <Grid xs={12} item>
            <UploadBoxContainer sx={{ mt: '.5rem' }}>
              <CustomButton onClick={handleNewsfeedsButtonClick}>
                <Translations text='Upload NEWSFEEDS' />
              </CustomButton>
              <CreateFeedModal isOpen={feedModal} onClose={() => setFeedModal(false)} />
            </UploadBoxContainer>
          </Grid>
          <Grid xs={12} item>
            <Typography
              fontSize={['.72rem', '0.8125rem']}
              textAlign='center'
              sx={{ fontWeight: 'normal' }}
              color={theme => theme.customBflyColors.primaryTextContrast}
            >
              <br />
              Your videos or photos will be private until you publish them.
              <br />
              <br />
              By submitting your videos to <strong>Butterfly Project</strong>, you acknowledge that you agree to
              Butterfly’s <TOSLink href=''>Terms of Service and Community Guidelines.</TOSLink>
              <br />
              Please be sure not to violate others' copyright or privacy rights. Learn more.
            </Typography>
          </Grid>
        </Grid>
      </BasicCard>
    </>
  )
}

export default UploadMenu
