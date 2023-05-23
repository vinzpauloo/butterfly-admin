// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from '@/services/useAuth'

const Navigation = (): VerticalNavItemsType => {
  const { user } = useAuth()

  return [
    {
      sectionTitle: 'Main'
    },
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/dashboard',
      action: 'read',
      subject: 'shared-page'
    },
    {
      title: 'Admin',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'shared-page',
      children: [
        {
          title: 'Users',
          path: '/user/list',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Roles',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Permissions',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Activity Logs',
          action: 'read',
          subject: 'shared-page'
        }
      ]
    },
    {
      title: 'Super Agents',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'shared-page',
      children: [
        {
          title: 'Sites',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Agents',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Customers',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'FQDN',
          path: '/fqdn',
          action: 'read',
          subject: 'fqdn-page'
        },
        {
          title: 'Integration Key',
          action: 'read',
          subject: 'shared-page'
        }
      ]
    },
    {
      title: 'Content Creators',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'shared-page'
    },
    // {
    //   title: 'Users',
    //   icon: 'mdi:user-circle',
    //   path: '/user/list',
    //   action: 'read',
    //   subject: 'shared-page'
    // },
    // {
    //   title: 'FQDN',
    //   icon: 'mdi:web',
    //   path: '/fqdn',
    //   action: 'read',
    //   subject: 'fqdn-page'
    // },
    {
      title: 'Transactions',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'shared-page',
      path: '/transactions',

      // ONLY SOME DROPDOWNS ARE AVAILABLE TO CERTAIN USERS - WIP
      children: [
        {
          title: 'Donations',
          path: '/transactions/donations',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Security Funds',
          path: '/transactions/security-funds',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Withdrawals',
          path: '/transactions/withdrawal',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Work Purchases',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Commissions',
          path: '/transactions/commissions',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'VIP Bundles',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Gold Coin Bundles',
          action: 'read',
          subject: 'shared-page'
        }
      ]
    },
    {
      title: 'Reports',
      icon: 'mdi:grid-large',
      path: '/reports',
      children: [
        {
          title: 'Donations'
        },
        {
          title: 'Withdrawals'
        },
        {
          title: 'Work Purchases'
        },
        {
          title: 'Commissions',
          path: '/reports/commissions'
        },
        {
          title: 'VIP Bundles'
        },
        {
          title: 'Gold Coin Bundles'
        },
        {
          title: '(OLD) Security Funds',
          path: '/reports/securityFunds'
        }
      ]
    },
    {
      title: 'Studio',
      icon: 'mdi:building',
      children: [
        {
          title: 'Upload Content',
          path: '/studio/upload/',
          action: 'read',
          subject: 'cc-page'
        },
        {
          title: 'Albums List',
          path: '/studio/album/album-list'
        },
        {
          title: 'Feeds Approval',
          path: '/studio/newsfeed/approval'
        },
        {
          title: 'Feeds List',
          path: '/studio/newsfeed',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Feeds Status',
          path: '/studio/cc/post-status',
          action: 'read',
          subject: 'cc-post-status'
        },
        {
          title: 'Works Approval',
          path: '/studio/content'
        },
        {
          title: 'Works List',
          path: '/studio/video-list',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Works Status',
          path: '/studio/cc/content-status',
          action: 'read',
          subject: 'cc-post-status'
        },
        {
          title: 'Work Groupings',
          path: '/settings'
        }
      ]
    },
    {
      title: 'Bundles',
      icon: 'mdi:tag-multiple',
      children: [
        {
          title: 'VIP Bundles',
          path: '/bundles/pages/VIPBundlesPage'
        },
        {
          title: 'Gold Coin Bundles',
          path: '/bundles/pages/GoldCoinBundlesPage'
        }
        // {
        //   title: 'Gold Coin Table',
        //   path: '/bundles/pages/GoldCoinTablesPage'
        // }
      ]
    },
    {
      title: 'Mobile App',
      icon: 'mdi:source-branch',
      path: '/versions',
      action: 'read',
      subject: 'sa-page'
    },
    {
      title: 'Site Settings',
      icon: 'mdi:cogs',
      children: [
        {
          title: 'Advertisements',
          path: '/settings/pages/ads',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Announcements',
          path: '/settings/pages/announcements',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Featured Feeds',
          path: '/settings/pages/featuredfeeds'
        },
        {
          title: 'Privacy Policy',
          path: '/settings/pages/privacypolicy'
        },
        {
          title: 'Terms and Services',
          path: '/settings/pages/tos'
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'mdi:cogs',
      children: [
        {
          title: 'Payment Channels',
          path: '/wallet',
          action: 'read'
        },
        {
          title: 'Security Funds'
        },
        {
          title: 'Withdrawals'
        }
      ]
    }
  ]
}

export default Navigation
