import { API_VERSION } from '@/constants'
import { IFetchTagsParams, IFetchTagsResponse, ITag } from '../interfaces'
import client from './client'

export const fetchTags = async (params: IFetchTagsParams) => {
  const postsResponse = await client.get<IFetchTagsResponse>('api/v1/cms/tags', {
    params
  })
  return {
    tags: postsResponse
  }
}

export const addTag = async (value: ITag) => {
  return await client.post(`${API_VERSION}tags`, value)
}

export const editTag = async (id: string, newData?: ITag) => {
  return await client.put(`${API_VERSION}tags/${id}`, newData)
}

export const fetchTagById = async (id: string) => {
  return await client.get(`${API_VERSION}tags/${id}`)
}
export const deleteTag = async (id: string) => {
  return await client.delete(`${API_VERSION}tags/${id}`)
}
