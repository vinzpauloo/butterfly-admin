// ** Services/Hooks Imports
import { useAuth } from '@/services/useAuth'

// ** Project/Other Imports
import OperatorDashboard from './components/operator/Operator'
import DashboardAgent from './agentDashboard'
import DashboardSuperAgent from './superAgentDashboard'
import CreatorDashboard from './components/creator/Creator'

const Dashboard = () => {
  const auth = useAuth()

  if (auth?.user?.role === 'AGENT') return <DashboardAgent />
  else if (auth?.user?.role === 'SA') return <DashboardSuperAgent />
  else if (auth?.user?.role === 'CC') return <CreatorDashboard />
  else return <OperatorDashboard />
}

Dashboard.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default Dashboard
