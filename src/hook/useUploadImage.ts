import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '../api/img'

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
  })
}
