import Icon from 'src/@core/components/icon'

const TabListData = [
  {
    value: 'donations',
    icon: <Icon fontSize={20} icon='mdi:donation-outline' />,
    title: 'Donations'
  },
  {
    value: 'commissions',
    icon: <Icon fontSize={20} icon='game-icons:pay-money' />,
    title: 'Commissions'
  },
  {
    value: 'withdrawal',
    icon: <Icon fontSize={20} icon='uil:money-withdrawal' />,
    title: 'Withdrawal'
  },
  {
    value: 'security-funds',
    icon: <Icon fontSize={20} icon='iconoir:card-security' />,
    title: 'Security Funds'
  }
]

export default TabListData
