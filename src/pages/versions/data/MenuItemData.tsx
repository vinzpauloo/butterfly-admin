// ** Utils Imports
import formatDate from '@/utils/formatDate'

// ** Other Imports
import EditButton from '../components/EditButton'

export const MenuItemData = () => {
  const siteData = [
    {
      value: 'site1',
      text: 'The Butterfly Project',
      image: '/images/logos/aws.png'
    },
    {
      value: 'site2',
      text: 'Asana',
      image: '/images/logos/asana.png'
    },
    {
      value: 'site3',
      text: 'Twitter',
      image: '/images/logos/twitter.png'
    },
    {
      value: 'site4',
      text: 'LinkedIn',
      image: '/images/logos/linkedin.png'
    }
  ]

  const row1 = [
    {
      id: 1,
      platform: 'OS',
      version: '1.0',
      site_name: 'The Butterfly Project',
      created_at: '2'
    },
    {
      id: 2,
      platform: 'Android',
      version: '1.0',
      site_name: 'The Butterfly Project',
      created_at: '2'
    },
    {
      id: 3,
      platform: 'OS',
      version: '2.0',
      site_name: 'The Butterfly Project',
      created_at: '2'
    },
    {
      id: 4,
      platform: 'Android',
      version: '2.0',
      site_name: 'The Butterfly Project',
      created_at: '2'
    }
  ]

  const row2 = [
    {
      id: 1,
      platform: 'OS',
      version: '1.0',
      site_name: 'ASANA',
      created_at: '2'
    },
    {
      id: 2,
      platform: 'Android',
      version: '1.0',
      site_name: 'ASANA',
      created_at: '2'
    },
    {
      id: 3,
      platform: 'OS',
      version: '2.0',
      site_name: 'ASANA',
      created_at: '2'
    },
    {
      id: 4,
      platform: 'Android',
      version: '2.0',
      site_name: 'ASANA',
      created_at: '2'
    }
  ]

  const row3 = [
    {
      id: 1,
      platform: 'OS',
      version: '1.0',
      site_name: 'Twitter',
      created_at: '2'
    },
    {
      id: 2,
      platform: 'Android',
      version: '1.0',
      site_name: 'Twitter',
      created_at: '2'
    },
    {
      id: 3,
      platform: 'OS',
      version: '2.0',
      site_name: 'Twitter',
      created_at: '2'
    },
    {
      id: 4,
      platform: 'Android',
      version: '2.0',
      site_name: 'Twitter',
      created_at: '2'
    }
  ]

  const row4 = [
    {
      id: 1,
      platform: 'OS',
      version: '1.0',
      site_name: 'LinkedIn',
      created_at: '2'
    },
    {
      id: 2,
      platform: 'Android',
      version: '1.0',
      site_name: 'LinkedIn',
      created_at: '2'
    },
    {
      id: 3,
      platform: 'OS',
      version: '2.0',
      site_name: 'LinkedIn',
      created_at: '2'
    },
    {
      id: 4,
      platform: 'Android',
      version: '2.0',
      site_name: 'LinkedIn',
      created_at: '2'
    }
  ]

  const columns = [
    { sortable: false, field: 'platform', headerName: 'OS Platform', width: 300 },
    { sortable: false, field: 'version', headerName: 'Version', width: 300 },
    { sortable: false, field: 'site_name', headerName: 'Site Name', width: 300 },
    {
      sortable: false,
      field: 'created_at',
      headerName: 'Date Created',
      width: 300,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      sortable: false,
      field: 'status',
      headerName: 'Action',
      width: 135,
      renderCell: () => {
        return <EditButton />
      }
    }
  ]

  return { siteData, row1, row2, row3, row4, columns }
}
