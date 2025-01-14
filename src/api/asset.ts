import { API_VERSION } from '@/constants'
import { IApiAssetsResponse } from '../interfaces/asset/asset.interface'
import { getAccessToken } from '../utils'
import client from './client'
import { requestUserLogin } from './login'
const accessToken = getAccessToken()
// export const getAssets = async (): Promise<IApiAssetsResponse> => {
//   return await requestUserLogin<IApiAssetsResponse>({
//     url: `api/v1/cms/posts/filter/assets`,
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   })
// }
export const getAssets = async () => {
  const response = await client.get(`${API_VERSION}posts/filter/assets`)
  return response.data
}