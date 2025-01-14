import { API_VERSION } from '@/constants'
import client from './client'

export const uploadImage = async (file: File): Promise<string> => {
  // Tạo FormData và thêm file vào với key là 'image'
  const formData = new FormData()
  formData.append('image', file)
  // Gửi request POST với formData
  const config = { headers: { 'content-type': 'multipart/form-data' } }
  const response = await client.post(`${API_VERSION}commons/upload-images`, formData, config)
  return response.data.data.url // URL ảnh sau khi upload thành công
}
