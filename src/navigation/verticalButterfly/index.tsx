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
      path: '/dashboard'
    },
    {
      title: 'Users',
      icon: 'mdi:user-circle',
      path: '/user/list'
    },
    {
        title: 'Transactions',
        icon: 'mdi:file-document-outline',
      },
      {
        title: 'Reports',
        icon: 'mdi:grid-large',
      },
      {
        title: 'Studio',
        icon: 'mdi:building',
        children: [
          {
            title: 'Upload Content',
            path: '/studio/upload/'
          },
          {
            title: 'Content Approval',
            path: '/studio/content'
          },
          {
            title: 'Newsfeed List',
            path: '/studio/newsfeed'
          },
          {
            title: 'Video List',
            path: '/studio/video-list'
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
            title: 'Advertisements',
            path: '/settings/pages/advertisements'
          },
          {
            title: 'Announcements',
            path: '/settings/pages/announcements'
          },
          {
            title: 'Privacy Policy',
            path: '/settings/pages/privacypolicy'
          },
          {
            title: 'Terms of Services',
            path: '/settings/pages/tos'
          }
        ]
      },
      {
        title: 'Bundles',
        icon: 'mdi:tag-multiple',
        path: '/bundles'
      }
  ]
}

export default navigation
