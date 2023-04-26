import React, { createContext, useContext, useState } from 'react'

interface TopFollowedContentCreator {
  id: string
  name: string
}

interface CreatorDashboardContextProps {
  mostActiveContentCreatorCount: string
  setMostActiveContentCreatorCount: (count: string) => void
  mostActiveUsers: string
  setMostActiveUsers: (count: string) => void
  topFollowedContentCreators: TopFollowedContentCreator[]
  setTopFollowedContentCreators: (contentCreators: TopFollowedContentCreator[]) => void
}

const CreatorDashboardContext = createContext<CreatorDashboardContextProps>({
  mostActiveContentCreatorCount: '',
  setMostActiveContentCreatorCount: () => '',
  mostActiveUsers: '',
  setMostActiveUsers: () => '',
  topFollowedContentCreators: [],
  setTopFollowedContentCreators: () => []
})

export const useCreatorDashboardContext = (): CreatorDashboardContextProps => useContext(CreatorDashboardContext)

export const CreatorDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mostActiveContentCreatorCount, setMostActiveContentCreatorCount] = useState('')

  const [mostActiveUsers, setMostActiveUsers] = useState('')

  const [topFollowedContentCreators, setTopFollowedContentCreators] = useState<TopFollowedContentCreator[]>([])

  return (
    <CreatorDashboardContext.Provider
      value={{
        mostActiveContentCreatorCount,
        setMostActiveContentCreatorCount,
        mostActiveUsers,
        setMostActiveUsers,
        topFollowedContentCreators,
        setTopFollowedContentCreators
      }}
    >
      {children}
    </CreatorDashboardContext.Provider>
  )
}
