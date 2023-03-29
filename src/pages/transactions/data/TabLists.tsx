import Icon from 'src/@core/components/icon'

const TabListData = [
  {
    value: 'DONATIONS',
    icon: <Icon fontSize={20} icon='mdi:donation-outline' />,
    title: 'Donations'
  },
  {
    value: 'COMMISSIONS',
    icon: <Icon fontSize={20} icon='game-icons:pay-money' />,
    title: 'Commissions'
  },
  {
    value: 'WITHDRAWAL',
    icon: <Icon fontSize={20} icon='uil:money-withdrawal' />,
    title: 'Withdrawal'
  },
  {
    value: 'SECURITY_FUNDS',
    icon: <Icon fontSize={20} icon='iconoir:card-security' />,
    title: 'Security Funds'
  }
]

export default TabListData
