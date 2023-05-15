import React, { createContext, useContext, useState } from 'react'

interface TopFollowedContentCreator {
  id: string
  name: string
}

interface TopDownloadedVideos {
  _id: string
  title: string
}

interface TopDonators {
  id: string
  username: string
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
  topDonators: TopDonators[]
  setTopDonators: (topDonators: TopDonators[]) => void
}

const DashboardContext = createContext<DashboardContextProps>({
  mostActiveContentCreatorCount: '',
  setMostActiveContentCreatorCount: () => '',
  mostActiveUsers: '',
  setMostActiveUsers: () => '',
  topFollowedContentCreators: [],
  setTopFollowedContentCreators: () => [],
  topDownloadedVideos: [],
  setTopDownloadedVideos: () => [],
  topDonators: [],
  setTopDonators: () => []
})

export const useDashboardContext = (): DashboardContextProps => useContext(DashboardContext)

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mostActiveContentCreatorCount, setMostActiveContentCreatorCount] = useState('')

  const [mostActiveUsers, setMostActiveUsers] = useState('')

  const [topFollowedContentCreators, setTopFollowedContentCreators] = useState<TopFollowedContentCreator[]>([])
  const [topDownloadedVideos, setTopDownloadedVideos] = useState<TopDownloadedVideos[]>([])
  const [topDonators, setTopDonators] = useState<TopDonators[]>([])

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
        setTopDownloadedVideos,
        topDonators,
        setTopDonators
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
