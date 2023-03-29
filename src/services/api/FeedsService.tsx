import request from '@/lib/request'
// ** Configs
import authConfig from 'src/configs/auth'

interface IFeedsPostParams {
  formData: FormData
}

const FeedsService = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const uploadFeed = (params: IFeedsPostParams) => {
    return request({
      headers: {
        'X-Authorization': 'postman|1',
        'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${accessToken}`
      },
      url: '/feeds/upload',
      method: 'POST',
      data: params.formData
    })
  }

  return { uploadFeed }
}

export default FeedsService
