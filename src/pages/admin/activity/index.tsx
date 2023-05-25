import React from 'react'
import Header from './Header'
import Container from '@/pages/components/Container'
import ActivityLogsTable from './Table'

const ActivityLogs = () => {
  return (
    <Container>
      <Header />
      <ActivityLogsTable />
    </Container>
  )
}

ActivityLogs.acl = {
  action: 'read',
  subject: 'sa-page'
}

export default ActivityLogs
