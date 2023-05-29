import request from '@/lib/request'
import authConfig from 'src/configs/auth'
import { getHeaders } from '@/lib/cryptoJs'


const processData = (response: any) => {
  if (response && response.data) {
    return response.data
  }

  return {}
}

export const CSVExportService = () => {

  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getDonationDataForCSV = () => {
     const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${accessToken}`
      },
      url: `/admin/donations?export=true`,
      method: 'GET',
    },
      processData
    )
  }

  return { getDonationDataForCSV }
  
}
