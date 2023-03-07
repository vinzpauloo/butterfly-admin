// ** React Imports
import React, { ReactNode } from 'react'

// ** Layout Imports
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'

//** Views Imports */
import UploadMenu from './views/UploadMenu'
import UploadVideoStep1 from './views/UploadVideoStep1'
import UploadNewsfeedsStep1 from './views/UploadNewsfeedsStep1'


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
        {PageDisplay()}
    </StudioContext.Provider>
  )
}

UploadContent.contentHeightFixed = true
UploadContent.getLayout = (page: ReactNode) => <UserLayoutNoPadding contentHeightFixed={UploadContent.contentHeightFixed}>{page}</UserLayoutNoPadding>
export default UploadContent
