import React, { createContext, useContext, useState } from 'react'

interface TopFollowedContentCreator {
  id: string
  name: string
}

interface SuperAgentDashboardContextProps {
  mostActiveContentCreatorCount: string
  setMostActiveContentCreatorCount: (count: string) => void
  mostActiveUsers: string
  setMostActiveUsers: (count: string) => void
  topFollowedContentCreators: TopFollowedContentCreator[]
  setTopFollowedContentCreators: (contentCreators: TopFollowedContentCreator[]) => void
}

const SuperAgentDashboardContext = createContext<SuperAgentDashboardContextProps>({
  mostActiveContentCreatorCount: '',
  setMostActiveContentCreatorCount: () => '',
  mostActiveUsers: '',
  setMostActiveUsers: () => '',
  topFollowedContentCreators: [],
  setTopFollowedContentCreators: () => []
})

export const useSuperAgentDashboardContext = (): SuperAgentDashboardContextProps =>
  useContext(SuperAgentDashboardContext)

export const SuperAgentDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mostActiveContentCreatorCount, setMostActiveContentCreatorCount] = useState('')

  const [mostActiveUsers, setMostActiveUsers] = useState('')

  const [topFollowedContentCreators, setTopFollowedContentCreators] = useState<TopFollowedContentCreator[]>([])

  return (
    <SuperAgentDashboardContext.Provider
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
    </SuperAgentDashboardContext.Provider>
  )
}
