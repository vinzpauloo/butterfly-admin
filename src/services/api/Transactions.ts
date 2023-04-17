import request from '@/lib/request'

// ** Configs
import authConfig from 'src/configs/auth'

interface IDonationsParams {
  data: {
    with: string
    page: number
  }
}

const TransactionsService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const getDonations = (params: IDonationsParams) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'ngrok-skip-browser-warning': '69420', // only for dev
        Authorization: `Bearer ${accessToken}`
      },
      url: '/admin/donations',
      method: 'GET',
      params: params.data
    })
  }

  return { getDonations }
}

export default TransactionsService
