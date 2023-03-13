// ** React Imports
import React, { ReactNode } from 'react'

// ** MUI Imports
import Box, {BoxProps} from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Layout Imports
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'

//** Views Imports */
import UploadMenu from './views/UploadMenu'
import UploadVideoStep1 from './views/UploadVideoStep1'
import UploadNewsfeedsStep1 from './views/UploadNewsfeedsStep1'
import LoadingScreen from './views/LoadingScreen'
import VideoVisibility from './views/VideoVisibility'
import UploadVideoPublish from './views/UploadVideoPublish'


// ** Styled Components
const BoxBG = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundImage: `url("${bgPath}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '100% 75%',
  backgroundColor: '#d3d6df',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',

  [theme.breakpoints.down('sm')]: {
      padding:'1em 1em',
  },
  

  [theme.breakpoints.up('sm')]: {
      paddingTop: '5rem',
  }
}))

export enum DisplayPage {
    MainPage,
    UploadVideoStep1,
    UploadNewsfeedsStep1,
    LoadingScreen,
    VideoVisibility,
    UploadVideoPublish
}

export type RequestType = {
  user_id : number,
  title : string,
  description : string,
  orientation : 'landscape' | 'portrait',
  tags : string[],
  has_own_trial : boolean
}
export type ResponseType = {
  user_id : number,
  title : string,
  description : string,
  orientation : 'landscape' | 'portrait',
  thumbnail_url : string,
  tags : string[],
  has_own_trial : boolean,
  full_uid : string,
  full_upload_url : string, 
}

export type GenericDataType = {
  id : number,
  name : string
}

export type StudioFormDataType = {

}

export type StudioContextType = {
    displayPage : DisplayPage,
    setDisplayPage : React.Dispatch<React.SetStateAction<DisplayPage>>,
    contentCreator : GenericDataType,
    setContentCreator : React.Dispatch<React.SetStateAction<GenericDataType>>
    tags : GenericDataType[],
    setTags : React.Dispatch<React.SetStateAction<GenericDataType[]>>,
    groupings : GenericDataType[],
    setGroupings : React.Dispatch<React.SetStateAction<GenericDataType[]>>,
}

//** DATA */

export const StudioContext = React.createContext<null | StudioContextType>(null)

const bgPath = '/images/studio/uploadBG.jpg'

const UploadContent = () => {
  
  // ** States
  const [displayPage, setDisplayPage] = React.useState<DisplayPage>(DisplayPage.MainPage)
  //** Form states */
  const [tags, setTags] = React.useState<GenericDataType[]>([])
  const [groupings, setGroupings] = React.useState<GenericDataType[]>([])
  const [contentCreator, setContentCreator] = React.useState<GenericDataType>({} as GenericDataType)

  const PageDisplay = () => {
    if (displayPage == DisplayPage.MainPage) return <UploadMenu />
    if (displayPage == DisplayPage.UploadVideoStep1) return <UploadVideoStep1 />
    if (displayPage == DisplayPage.UploadNewsfeedsStep1) return <UploadNewsfeedsStep1 />
    if (displayPage == DisplayPage.LoadingScreen) return <LoadingScreen />
    if (displayPage == DisplayPage.VideoVisibility) return <VideoVisibility />
    if (displayPage == DisplayPage.UploadVideoPublish) return <UploadVideoPublish />
}

  return (
    <StudioContext.Provider value={{ 
      displayPage, 
      setDisplayPage,
      contentCreator,
      setContentCreator,
      tags,
      setTags,
      groupings,
      setGroupings
      }}>
      <BoxBG>
        {PageDisplay()}
      </BoxBG>
    </StudioContext.Provider>
  )
}

UploadContent.contentHeightFixed = true
UploadContent.getLayout = (page: ReactNode) => <UserLayoutNoPadding contentHeightFixed={UploadContent.contentHeightFixed}>{page}</UserLayoutNoPadding>
export default UploadContent
