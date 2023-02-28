// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
        sectionTitle: 'Main'
    },
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/dashboards/crm'
    },
    {
      title: 'Users',
      icon: 'mdi:user-circle',
      children: [
        {
          title: 'Operators',
          path: '/apps/user/list/'
        },
        {
          title: 'Super Agent',
          path: '/dashboards/analytics'
        },
        {
          title: 'Content Creators',
          path: '/dashboards/ecommerce'
        }
      ]
    },
    {
        title: 'Transactions',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Donations',
            path: '/apps/user/list/'
          },
          {
            title: 'Commissions',
            path: '/dashboards/analytics'
          },
          {
            title: 'Withdrawal',
            path: '/dashboards/ecommerce'
          },
          {
            title: 'Security Funds',
            path: '/dashboards/ecommerce'
          }
        ]
      },
      {
        title: 'Reports',
        icon: 'mdi:grid-large',
        children: [
          {
            title: 'All',
            path: '/apps/user/list/'
          },
          {
            title: 'Commissions',
            path: '/dashboards/analytics'
          },
          {
            title: 'Balance History',
            path: '/dashboards/ecommerce'
          },
          {
            title: 'Security Funds',
            path: '/dashboards/ecommerce'
          }
        ]
      },
      {
        title: 'Studio',
        icon: 'mdi:building',
        children: [
          {
            title: 'Upload Content',
            path: '/apps/user/list/'
          },
          {
            title: 'Content Approval',
            path: '/dashboards/analytics'
          },
          {
            title: 'Feed List',
            path: '/dashboards/ecommerce'
          },
          {
            title: 'Video List',
            path: '/dashboards/ecommerce'
          }
        ]
      },
      {
        title: 'Settings',
        icon: 'mdi:cogs',
        children: [
          {
            title: 'Works Groupings',
            path: '/apps/user/list/'
          },
          {
            title: 'Feed Features',
            path: '/dashboards/analytics'
          },
          {
            title: 'Advertisements',
            path: '/dashboards/ecommerce'
          },
          {
            title: 'Announcements',
            path: '/dashboards/ecommerce'
          },
          {
            title: 'Privacy Policy',
            path: '/dashboards/ecommerce'
          },
          {
            title: 'Terms of Services',
            path: '/dashboards/ecommerce'
          }
        ]
      },
      {
        title: 'Bundles',
        icon: 'mdi:tag-multiple',
        children: [
            {
                title: 'Coin Bundles',
                path: '/dashboards/ecommerce'
            },
            {
                title: 'VIP Subscription',
                path: '/dashboards/ecommerce'
            }
        ]
      }
  ]
}

export default navigation
