import React, { createContext, useContext, useState } from 'react'

interface TopFollowedContentCreator {
  id: string
  name: string
}

interface TopDonators {
  _id: string
  username: string
}

interface MostLiked {
  _id: string
  title: string
}

interface CreatorDashboardContextProps {
  topFollowedContentCreators: TopFollowedContentCreator[]
  setTopFollowedContentCreators: (contentCreators: TopFollowedContentCreator[]) => void
  earnedDonations: string
  setEarnedDonations: (count: string) => void
  topDonators: TopDonators[]
  setTopDonators: (topDonators: TopDonators[]) => void
  mostLiked: MostLiked[]
  setMostLiked: (mostLiked: MostLiked[]) => void
}

const CreatorDashboardContext = createContext<CreatorDashboardContextProps>({
  topFollowedContentCreators: [],
  setTopFollowedContentCreators: () => [],
  earnedDonations: '',
  setEarnedDonations: () => '',
  topDonators: [],
  setTopDonators: () => [],
  mostLiked: [],
  setMostLiked: () => []
})

export const useCreatorDashboardContext = (): CreatorDashboardContextProps => useContext(CreatorDashboardContext)

export const CreatorDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topFollowedContentCreators, setTopFollowedContentCreators] = useState<TopFollowedContentCreator[]>([])
  const [earnedDonations, setEarnedDonations] = useState('')

  const [topDonators, setTopDonators] = useState<TopDonators[]>([])
  const [mostLiked, setMostLiked] = useState<MostLiked[]>([])

  return (
    <CreatorDashboardContext.Provider
      value={{
        topFollowedContentCreators,
        setTopFollowedContentCreators,
        earnedDonations,
        setEarnedDonations,
        topDonators,
        setTopDonators,
        mostLiked,
        setMostLiked
      }}
    >
      {children}
    </CreatorDashboardContext.Provider>
  )
}
