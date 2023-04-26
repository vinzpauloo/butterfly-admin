// ** React Imports
import React from 'react'

// ** Other Imports
import UserTable from '@/pages/user/components/UserTable'
import { useAuth } from '@/services/useAuth'
import AgentUsersTable from '../components/AgentUsersTable'


const UserList = () => {
  const auth = useAuth()

  if (auth?.user?.role === "AGENT") return <AgentUsersTable/>
  else return <UserTable />
}

UserList.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default UserList
