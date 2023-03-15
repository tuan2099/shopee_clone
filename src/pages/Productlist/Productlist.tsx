import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import categoryApi from 'src/apis/categorry.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryParams from 'src/hooks/useQueryParam'
import { ProductListConfig } from 'src/type/product.type'
import AssideFilter from './components/AssideFilter'
import Product from './components/Product/Product'
import SourceProductList from './components/sourceProductList'

export type queryConfig = {
  // pagination
  [key in keyof ProductListConfig]: string
}

function ProductList() {
  const queryParam = useQueryParams()
  const queryConfig: queryConfig = omitBy(
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
  const { data: ProductData } = useQuery({
    // đổi tên thành productdataa
    queryKey: ['products', queryConfig], // truyền query param để link động trên url khi thay đổi data
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig) // ép kiểu
    },
    keepPreviousData: true
  })

  const { data: categoryData } = useQuery({
    // đổi tên thành productdataa
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {ProductData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AssideFilter queryConfig={queryConfig} categories={categoryData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SourceProductList queryConfig={queryConfig} pageSize={ProductData?.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {/* {Array(30)
                .fill(0)
                .map((_, index) => {
                  return (
                    <>
                      <div className='col-span-1' key={index}>
                        <Product />
                      </div>
                    </>
                  )
                })} */}
                {ProductData.data.data.products.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={ProductData?.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
