// ** React Imports
import React from 'react'

// ** Other Imports
import { useAuth } from '@/services/useAuth'
import AgentUsersTable from '../components/AgentUsersTable'
import SuperAgentTable from '../components/SuperAgentTable'
import OperatorTable from '../components/OperatorTable'

const UserList = () => {
  const auth = useAuth()

  if (auth?.user?.role === 'AGENT') return <AgentUsersTable />
  else if (auth?.user?.role === 'SA') return <SuperAgentTable />
  else if (auth?.user?.role === 'CC') return <>CC UserTable</>
  else return <OperatorTable />
}

UserList.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default UserList
