// ** React Imports
import React, { ReactNode } from 'react'

// ** MUI Imports
import Box, {BoxProps} from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const bgPath = '/images/studio/uploadBG.jpg'

// ** Layout Imports
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'

//** Views Imports */
import UploadMenu from './views/UploadMenu'
import UploadVideoStep1 from './views/UploadVideoStep1'
import UploadNewsfeedsStep1 from './views/UploadNewsfeedsStep1'

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
}

type StudioContextType = {
    displayPage : DisplayPage,
    setDisplayPage : React.Dispatch<React.SetStateAction<DisplayPage>>
}

export const StudioContext = React.createContext<null | StudioContextType>(null)

const UploadContent = () => {
  
  const [displayPage, setDisplayPage] = React.useState<DisplayPage>(DisplayPage.MainPage)

  const PageDisplay = () => {
    if (displayPage == DisplayPage.MainPage) return <UploadMenu />
    if (displayPage == DisplayPage.UploadVideoStep1) return <UploadVideoStep1 />
    if (displayPage == DisplayPage.UploadNewsfeedsStep1) return <UploadNewsfeedsStep1 />
}

  return (
    <StudioContext.Provider value={{  displayPage, setDisplayPage }}>
      <BoxBG>
        {PageDisplay()}
      </BoxBG>
    </StudioContext.Provider>
  )
}

UploadContent.contentHeightFixed = true
UploadContent.getLayout = (page: ReactNode) => <UserLayoutNoPadding contentHeightFixed={UploadContent.contentHeightFixed}>{page}</UserLayoutNoPadding>
export default UploadContent
