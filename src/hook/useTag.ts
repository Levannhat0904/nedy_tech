import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { IFetchTagsParams, IFetchTagsResponse, ITag } from '../interfaces'
import { addTag, deleteTag, editTag, fetchTagById, fetchTags } from '../api/tag'

interface TagIdParams {
  id: string
  newData?: ITag
}
export const useTags = (params: IFetchTagsParams): UseQueryResult<IFetchTagsResponse> => {
  return useQuery({
    queryKey: ['fetchTags', { ...params }],
    queryFn: () => fetchTags(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  })
}
export const useAddTag = () => {
  return useMutation({
    mutationFn: addTag
  })
}
export const useUpdateTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, newData }: TagIdParams) => editTag(id, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchTags'] })
    }
  })
}

export const useFetchTagById = () => {
  return useMutation({
    mutationFn: ({ id }: TagIdParams) => fetchTagById(id)
  })
}
export const useDeleteTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: TagIdParams) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchTags'] })
    },
    onError: (error: Error) => {
      console.error('Lỗi khi cập nhật tag:', error.message)
    },
    onSettled: () => { }
  })
}
