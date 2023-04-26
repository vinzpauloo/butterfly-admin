// ** React Imports
import React from 'react'

// ** Other Imports
import UserTable from '@/pages/user/components/UserTable'
import { useAuth } from '@/services/useAuth'


const UserList = () => {
  const auth = useAuth()
  
  return (
    <>
      {auth?.user?.role === "AGENT" ?
        <>AGENT USERS</>
        :
        <UserTable />
      }
    </>
  )
}

UserList.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default UserList
