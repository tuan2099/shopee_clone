import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [searachParams] = useSearchParams()
  return Object.fromEntries([...searachParams])
}

// hook lấy param trên url
