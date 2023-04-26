// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from '@/services/useAuth'

const Navigation = (): VerticalNavItemsType => {
  const auth = useAuth()
  
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
      title: 'Users',
      icon: 'mdi:user-circle',
      path: '/user/list',
      action: 'read',
      subject: 'shared-page'
    },
    {
      title: 'FQDN',
      icon: 'mdi:web',
      path: '/fqdn',
      action: 'read',
      subject: 'sa-page'
    },
    {
      title: 'Transactions',
      icon: 'mdi:file-document-outline',
      action: 'read',
      subject: 'shared-page',
      path: '/transactions',
      children: auth?.user?.role === "GOD"  ? [
        {
          title: 'Donations',
          path: '/transactions/donations',
        },
        {
          title: 'Commissions',
          path: '/transactions/commissions',
        },
        {
          title: 'Withdrawal',
          path: '/transactions/withdrawal',
        },
        {
          title: 'Security Funds',
          path: '/transactions/security-funds',
        }
      ] : undefined
    },
    {
      title: 'Reports',
      icon: 'mdi:grid-large',
      path: '/reports',
      children: [
        {
          title: 'All',
          path: '/reports/all'
        },
        {
          title: 'Commissions',
          path: '/reports/commissions'
        },
        {
          title: 'Balance History',
          path: '/reports/balanceHistory'
        },
        {
          title: 'Security Funds',
          path: '/reports/securityFunds'
        },
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
          title: 'Content Approval',
          path: '/studio/content'
        },
        {
          title: 'Newsfeed Approval',
          path: '/studio/newsfeed/approval'
        },
        {
          title: 'Newsfeed List',
          path: '/studio/newsfeed',
          action: 'read',
          subject: 'cc-page'
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
          title: 'Album List',
          path: '/studio/album/album-list'
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'mdi:cogs',
      children: [
        {
          title: 'Works Groupings',
          path: '/settings'
        },
        {
          title: 'Feed Features',
          path: '/settings/pages/feedfeatures'
        },
        {
          title: 'Advertisement',
          path: '/settings/pages/ads'
        },
        {
          title: 'Announcement',
          path: '/settings/pages/announcements'
        },
        {
          title: 'Privacy Policy',
          path: '/settings/pages/privacypolicy'
        },
        {
          title: 'Terms of Service',
          path: '/settings/pages/tos'
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
      title: 'Versions',
      icon: 'mdi:source-branch',
      path: '/versions'
    }
  ]
}

export default Navigation
