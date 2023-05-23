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
          title: 'Permission',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Menu',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Activity Log',
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
      subject: 'shared-page',
      children: [
        {
          title: 'List of Content Creators',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Newsfeed List',
          path: '/studio/newsfeed',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Video List',
          path: '/studio/video-list',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Create Content Creator',
          action: 'read',
          subject: 'fqdn-page'
        }
      ]
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
          title: 'Gold Bundles',
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
          title: 'Gold Bundles'
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
          title: 'Newsfeed List',
          path: '/studio/newsfeed',
          action: 'read',
          subject: 'cc-page'
        },
        {
          title: 'Newsfeed Approval',
          path: '/studio/newsfeed/approval'
        },
        {
          title: 'Newsfeed Status',
          path: '/studio/cc/post-status',
          action: 'read',
          subject: 'cc-post-status'
        },
        {
          title: 'Video List',
          path: '/studio/video-list',
          action: 'read',
          subject: 'cc-page'
        },
        {
          title: 'Video Approval',
          path: '/studio/content'
        },
        {
          title: 'Video Status',
          path: '/studio/cc/content-status',
          action: 'read',
          subject: 'cc-post-status'
        },
        {
          title: 'Album List',
          path: '/studio/album/album-list'
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
          title: 'VIP Bundle',
          path: '/bundles/pages/VIPBundlesPage'
        },
        {
          title: 'Gold Coin Bundle',
          path: '/bundles/pages/GoldCoinBundlesPage'
        },
        {
          title: 'Gold Coin Table',
          path: '/bundles/pages/GoldCoinTablesPage'
        }
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
          title: 'Privacy Policy',
          path: '/settings/pages/privacypolicy'
        },
        {
          title: 'Terms and Services',
          path: '/settings/pages/tos'
        },
        {
          title: 'Featured Feeds',
          path: '/settings/pages/featuredfeeds'
        },
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
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'mdi:cogs',
      children: [
        {
          title: 'Payment Channel',
          path: '/wallet',
          action: 'read'
        },
        {
          title: 'Language',
          action: 'read'
        },
        {
          title: 'Currency',
          action: 'read'
        }
      ]
    }
  ]
}

export default Navigation
