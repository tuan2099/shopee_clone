import { isUndefined, omitBy } from 'lodash'
import { ProductListConfig } from 'src/type/product.type'
import useQueryParams from './useQueryParam'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConffig() {
  const queryParam = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      // pagination
      page: queryParam.page || '1',
      limit: queryParam.limit || '20',
      sort_by: queryParam.sort_by,
      exclude: queryParam.exclude,
      name: queryParam.name,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      rating_filter: queryParam.rating_filter,
      category: queryParam.category
    },
    isUndefined
  )
  return queryConfig
}
