import client from './client'
import { IFetchPostsParams, IFetchPostsResponse } from '../interfaces'
import { API_VERSION } from '@/constants'

export const fetchPosts = async (page?: number, pageSize?: number, authors?: string[]) => {
  const postsResponse = await client.get(`${API_VERSION}posts`, {
    params: { page, pageSize, authors }
  })
  // Trả về dữ liệu gộp
  return {
    posts: postsResponse.data
  }
}
export const fetchPostsV2 = async (params: IFetchPostsParams) => {
  const postsResponse = await client.get<IFetchPostsResponse>(`${API_VERSION}posts`, {
    params
  })
  return {
    posts: postsResponse.data
  }
}
