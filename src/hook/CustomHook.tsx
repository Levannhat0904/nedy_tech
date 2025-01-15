import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IFetchPostsParams, IFetchPostsResponse } from "../interfaces";
import { fetchPosts, fetchPostsV2 } from "../api/post";

export const usePosts = (
  page?: number,
  pageSize?: number,
  authors?: string[],
  assets?: string[]
): UseQueryResult<IFetchPostsResponse> => {
  return useQuery({
    queryKey: ["postsWithAuthors", page, pageSize, authors, assets],
    queryFn: () => fetchPosts(page, pageSize, authors),
    // staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};
// Custom hook sử dụng React Query
export const usePostsV2 = (
  params: IFetchPostsParams
): UseQueryResult<IFetchPostsResponse> => {
  return useQuery({
    queryKey: ["postsWithAuthorsV2", { ...params }],
    queryFn: () => fetchPostsV2(params),
    // staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};
