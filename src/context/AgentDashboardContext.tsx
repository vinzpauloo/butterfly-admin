import React, { createContext, useContext, useState } from 'react'

interface TopFollowedContentCreator {
  id: string
  name: string
}

interface AgentDashboardContextProps {
  mostActiveContentCreatorCount: string
  setMostActiveContentCreatorCount: (count: string) => void
  mostActiveUsers: string
  setMostActiveUsers: (count: string) => void
  topFollowedContentCreators: TopFollowedContentCreator[]
  setTopFollowedContentCreators: (contentCreators: TopFollowedContentCreator[]) => void
}

const AgentDashboardContext = createContext<AgentDashboardContextProps>({
  mostActiveContentCreatorCount: '',
  setMostActiveContentCreatorCount: () => '',
  mostActiveUsers: '',
  setMostActiveUsers: () => '',
  topFollowedContentCreators: [],
  setTopFollowedContentCreators: () => []
})

export const useAgentDashboardContext = (): AgentDashboardContextProps => useContext(AgentDashboardContext)

export const AgentDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mostActiveContentCreatorCount, setMostActiveContentCreatorCount] = useState('')

  const [mostActiveUsers, setMostActiveUsers] = useState('')

  const [topFollowedContentCreators, setTopFollowedContentCreators] = useState<TopFollowedContentCreator[]>([])

  return (
    <AgentDashboardContext.Provider
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
    </AgentDashboardContext.Provider>
  )
}
