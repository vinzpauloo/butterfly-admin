// ** Services/Hooks Imports
import { useAuth } from '@/services/useAuth'

// ** Project/Other Imports
import OperatorDashboard from './components/operator/Operator'
import SuperAgentDashboard from './components/superagent/SuperAgent'

// import AgentDashboard from './components/agent/Agent'
import CreatorDashboard from './components/creator/Creator'
import DashboardAgent from './agentDashboard'

const Dashboard = () => {
  const auth = useAuth()

  if (auth?.user?.role === 'AGENT') return <DashboardAgent />
  else if (auth?.user?.role === 'SA') return <SuperAgentDashboard />
  else if (auth?.user?.role === 'CC') return <CreatorDashboard />
  else return <OperatorDashboard />
}

Dashboard.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default Dashboard
