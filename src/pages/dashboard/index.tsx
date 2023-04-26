// ** Services/Hooks Imports
import { useAuth } from '@/services/useAuth'

// ** Project/Other Imports
import OperatorDashboard from './components/operator/Operator'

const Dashboard = () => {
  const auth = useAuth()

  if (auth?.user?.role === 'AGENT') return <>AGENT DASHBOARD</>
  else if (auth?.user?.role === 'SA') return <>SA DASHBOARD</>
  else if (auth?.user?.role === 'CC') return <>CC DASHBOARD</>
  else return <OperatorDashboard />
}

Dashboard.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default Dashboard
