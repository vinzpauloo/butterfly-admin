import React from 'react'
import { useAuth } from '@/services/useAuth'
import AgentProfile from './profiles/AgentProfile'
import SuperAgentProfile from './profiles/SuperAgentProfile'
import ContentCreatorProfile from './profiles/ContentCreatorProfile'

const UserProfile = () => {
  const auth = useAuth()

  if (auth?.user?.role === "AGENT") return <AgentProfile />
  else if (auth?.user?.role === "SA") return <SuperAgentProfile />
  else if (auth?.user?.role === "CC") return <ContentCreatorProfile />
  else return <>PROFILE FOR {auth?.user?.role} IS STILL WIP</>
}

UserProfile.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default UserProfile
