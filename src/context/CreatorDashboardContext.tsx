import React, { createContext, useContext, useState } from 'react'

interface TopFollowedContentCreator {
  id: string
  name: string
}

interface TopDonators {
  _id: string
  username: string
}

interface CreatorDashboardContextProps {
  topFollowedContentCreators: TopFollowedContentCreator[]
  setTopFollowedContentCreators: (contentCreators: TopFollowedContentCreator[]) => void
  earnedDonations: string
  setEarnedDonations: (count: string) => void
  topDonators: TopDonators[]
  setTopDonators: (topDonators: TopDonators[]) => void
}

const CreatorDashboardContext = createContext<CreatorDashboardContextProps>({
  topFollowedContentCreators: [],
  setTopFollowedContentCreators: () => [],
  earnedDonations: '',
  setEarnedDonations: () => '',
  topDonators: [],
  setTopDonators: () => []
})

export const useCreatorDashboardContext = (): CreatorDashboardContextProps => useContext(CreatorDashboardContext)

export const CreatorDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topFollowedContentCreators, setTopFollowedContentCreators] = useState<TopFollowedContentCreator[]>([])
  const [earnedDonations, setEarnedDonations] = useState('')

  const [topDonators, setTopDonators] = useState<TopDonators[]>([])

  return (
    <CreatorDashboardContext.Provider
      value={{
        topFollowedContentCreators,
        setTopFollowedContentCreators,
        earnedDonations,
        setEarnedDonations,
        topDonators,
        setTopDonators
      }}
    >
      {children}
    </CreatorDashboardContext.Provider>
  )
}
