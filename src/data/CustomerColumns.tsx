// ** MUI Imports

import { FILE_SERVER_URL } from '@/lib/baseUrls'
import Image from 'next/image'

// ** Utils Imports

export const CustomerColumns = () => {
  const columns = [
    {
      flex: 0.02,
      minWidth: 150,
      field: 'username',
      headerName: `Username`,
      renderCell: (params: any) => {
        console.log(`COLUMNS`, params?.row)
      }
    },
    {
      flex: 0.01,
      minWidth: 120,

      field: 'is_Vip',
      headerName: `VIP`
    },
    {
      flex: 0.01,
      minWidth: 120,

      field: 'gender',
      headerName: `Gender`
    },
    {
      flex: 0.02,
      minWidth: 140,
      field: 'mobile',
      headerName: `Mobile`
    },
    {
      flex: 0.01,
      minWidth: 120,
      sortable: false,
      field: 'photo',
      headerName: `Photo`,
      renderCell: (params: any) => {
        return <img src={FILE_SERVER_URL + params?.value} alt='photo' width={20} height={20} />
      }
    },
    {
      flex: 0.02,
      minWidth: 150,
      sortable: false,
      field: 'devices',
      headerName: `Devices`,
      renderCell: (params: any) => {
        const deviceType = params?.row.devices.map((item: any) => item?.type)

        const deviceID = params?.row.devices.map((item: any) => item?.device_id)

        const isActive = params?.row.devices.map((item: any) => item?.active)

        console.log(deviceType)

        return (
          <div>
            {/* {deviceType} */}

            {String(isActive)}
          </div>
        )
      }
    }
  ]

  return { columns }
}
