import { useSearchParams } from "next/navigation";
const useParams = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const s = searchParams.get('s') || ''
  const authors = searchParams.getAll('authors') || []
  const assets = searchParams.getAll('assets') || []
  return { page, pageSize, s, authors, assets }
}

export default useParams
