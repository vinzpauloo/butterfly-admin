import Icon from 'src/@core/components/icon'

const TabListData = [
  {
    value: 'donations',
    icon: <Icon fontSize={20} icon='mdi:donation-outline' />,
    title: 'Donations'
  },
  {
    value: 'security-funds',
    icon: <Icon fontSize={20} icon='iconoir:card-security' />,
    title: 'Security Funds'
  },
  {
    value: 'withdrawal',
    icon: <Icon fontSize={20} icon='uil:money-withdrawal' />,
    title: 'Withdrawals'
  },
  {
    value: 'work-purchases',
    icon: <Icon fontSize={20} icon='ph:video' />,
    title: 'Work Purchases'
  },
  {
    value: 'commissions',
    icon: <Icon fontSize={20} icon='game-icons:pay-money' />,
    title: 'Commissions'
  },
  {
    value: 'vip-bundles',
    icon: <Icon fontSize={20} icon='ri:vip-line' />,
    title: 'VIP Bundles'
  },
  {
    value: 'gold-coin-bundles',
    icon: <Icon fontSize={20} icon='cryptocurrency:gold' />,
    title: 'Gold Coin Bundles'
  },
]

export default TabListData
