// ** Services/Hooks Imports
import { useAuth } from '@/services/useAuth'

// ** Project/Other Imports
import DashboardAgent from './agentDashboard'
import DashboardSuperAgent from './superAgentDashboard'
import AdminDashboard from './admin-dashboard'
import NewCreatorDashboard from './creator-dashboard'

const Dashboard = () => {
  const auth = useAuth()

  if (auth?.user?.role === 'AGENT') return <DashboardAgent />
  else if (auth?.user?.role === 'SA') return <DashboardSuperAgent />
  else if (auth?.user?.role === 'CC') return <NewCreatorDashboard />
  else return <AdminDashboard />
}

Dashboard.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default Dashboard
