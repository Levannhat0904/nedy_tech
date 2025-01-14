import { API_VERSION } from '@/constants'
import { IAuthor } from '../interfaces/author/author.interface'
import { getAccessToken } from '../utils'
import client from './client'
import { requestUserLogin } from './login'
const accessToken = getAccessToken()
export interface IApiAuthorResponseV2 {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: IAuthor[]
}
export const getUserInfo = async (): Promise<IApiAuthorResponseV2> => {
  return await requestUserLogin<IApiAuthorResponseV2>({
    url: `${API_VERSION}posts/filter/authors`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
export const fetchAuthors = async () => {
  const authorsResponse = await client.get(`${API_VERSION}posts/filter/authors`)
  return {
    authors: authorsResponse.data
  }
}
