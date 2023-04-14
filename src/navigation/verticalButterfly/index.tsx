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
      path: '/dashboard',
      action: 'read',
      subject: 'shared-page'
    },
    {
      title: 'Users',
      icon: 'mdi:user-circle',
      path: '/user/list'
    },
    {
      title: 'Transactions',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'Donations',
          path: '/transactions/donations'
        },
        {
          title: 'Commissions',
          path: '/transactions/commissions'
        },
        {
          title: 'Withdrawal',
          path: '/transactions/withdrawal'
        },
        {
          title: 'Security Funds',
          path: '/transactions/security-funds'
        }
      ]
    },
    {
      title: 'Reports',
      icon: 'mdi:grid-large'
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
          title: 'Newsfeed List',
          path: '/studio/newsfeed',
          action: 'read',
          subject: 'cc-page'
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
    }
  ]
}

export default navigation
