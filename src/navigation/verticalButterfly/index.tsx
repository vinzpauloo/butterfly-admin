// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const Navigation = (): VerticalNavItemsType => {
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
      title: 'Customers',
      icon: 'mdi:home-outline',
      action: 'read',
      subject: 'agent-only-page'
    },
    {
      title: 'Admin',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'sa-page',
      children: [
        {
          title: 'Users',
          path: '/user/list',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Roles & Permissions',
          path: '/admin/roles',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Activity Logs',
          action: 'read',
          subject: 'sa-page'
        }
      ]
    },
    {
      title: 'Super Agents',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'sa-page',
      children: [
        {
          title: 'Sites',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Agents',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Customers',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'FQDN',
          path: '/fqdn',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Integration Key',
          action: 'read',
          subject: 'sa-page'
        }
      ]
    },
    {
      title: 'Content Creators',
      icon: 'mdi:file-document-outline',
      action: 'read'
    },
    {
      title: 'Transactions',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'shared-page',
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
          subject: 'sa-page'
        },
        {
          title: 'Withdrawals',
          path: '/transactions/withdrawal',
          action: 'read',
          subject: 'cc-page'
        },
        {
          title: 'Work Purchases',
          path: '/transactions/work-purchases',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Commissions',
          path: '/transactions/commissions',
          action: 'read',
          subject: 'agent-page'
        },
        {
          title: 'VIP Bundles',
          path: '/transactions/vip-bundles',
          action: 'read',
          subject: 'agent-page'
        },
        {
          title: 'Gold Coin Bundles',
          path: '/transactions/gold-coin-bundles',
          action: 'read',
          subject: 'agent-page'
        }
      ]
    },
    {
      title: 'Reports',
      icon: 'mdi:grid-large',
      action: 'read',
      subject: 'shared-page',
      children: [
        {
          title: 'Donations',
          action: 'read',
          path: '/reports/donations',
          subject: 'shared-page'
        },
        {
          title: 'Withdrawals',
          action: 'read',
          subject: 'cc-page'
        },
        {
          title: 'Work Purchases',
          action: 'read',
          subject: 'shared-page'
        },
        {
          title: 'Commissions',
          path: '/reports/commissions',
          action: 'read',
          subject: 'agent-page'
        },
        {
          title: 'VIP Bundles',
          action: 'read',
          subject: 'agent-page'
        },
        {
          title: 'Gold Coin Bundles',
          action: 'read',
          subject: 'agent-page'
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
      action: 'read',
      subject: 'cc-page',
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
          subject: 'cc-page'
        },
        {
          title: 'Feeds Status',
          path: '/studio/cc/post-status',
          action: 'read',
          subject: 'cc-only-page'
        },
        {
          title: 'Works Approval',
          path: '/studio/content'
        },
        {
          title: 'Works List',
          path: '/studio/video-list',
          action: 'read',
          subject: 'cc-page'
        },
        {
          title: 'Works Status',
          path: '/studio/cc/content-status',
          action: 'read',
          subject: 'cc-only-page'
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
          path: '/settings/pages/featuredfeeds',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Privacy Policy',
          path: '/settings/pages/privacypolicy',
          action: 'read',
          subject: 'sa-page'
        },
        {
          title: 'Terms & Services',
          path: '/settings/pages/tos',
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
          title: 'Payment Channels',
          path: '/wallet'
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
