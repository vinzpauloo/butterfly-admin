import React, { createContext, useContext, useState } from 'react'

interface TopFollowedContentCreator {
  id: string
  name: string
}

interface TopDownloadedVideos {
  _id: string
  title: string
}

interface DashboardContextProps {
  mostActiveContentCreatorCount: string
  setMostActiveContentCreatorCount: (count: string) => void
  mostActiveUsers: string
  setMostActiveUsers: (count: string) => void
  topFollowedContentCreators: TopFollowedContentCreator[]
  setTopFollowedContentCreators: (contentCreators: TopFollowedContentCreator[]) => void
  topDownloadedVideos: TopDownloadedVideos[]
  setTopDownloadedVideos: (topDownloadedVideos: TopDownloadedVideos[]) => void
}

const DashboardContext = createContext<DashboardContextProps>({
  mostActiveContentCreatorCount: '',
  setMostActiveContentCreatorCount: () => '',
  mostActiveUsers: '',
  setMostActiveUsers: () => '',
  topFollowedContentCreators: [],
  setTopFollowedContentCreators: () => [],
  topDownloadedVideos: [],
  setTopDownloadedVideos: () => []
})

export const useDashboardContext = (): DashboardContextProps => useContext(DashboardContext)

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mostActiveContentCreatorCount, setMostActiveContentCreatorCount] = useState('')

  const [mostActiveUsers, setMostActiveUsers] = useState('')

  const [topFollowedContentCreators, setTopFollowedContentCreators] = useState<TopFollowedContentCreator[]>([])
  const [topDownloadedVideos, setTopDownloadedVideos] = useState<TopDownloadedVideos[]>([])

  return (
    <DashboardContext.Provider
      value={{
        mostActiveContentCreatorCount,
        setMostActiveContentCreatorCount,
        mostActiveUsers,
        setMostActiveUsers,
        topFollowedContentCreators,
        setTopFollowedContentCreators,
        topDownloadedVideos,
        setTopDownloadedVideos
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
