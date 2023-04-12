import { useSearchParams } from 'react-router-dom'
// useSearchParams được sử dụng để đọc và sửa đổi query string trên URL
export default function useQueryParams() {
  const [searachParams] = useSearchParams()
  return Object.fromEntries([...searachParams])
}

// hook lấy param trên url
