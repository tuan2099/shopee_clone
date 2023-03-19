import { useQuery } from '@tanstack/react-query'
import categoryApi from 'src/apis/categorry.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConffig from 'src/hooks/useQueryConffig'
import { ProductListConfig } from 'src/type/product.type'
import AssideFilter from './components/AssideFilter'
import Product from './components/Product/Product'
import SourceProductList from './components/sourceProductList'

export type queryConfig = {
  // pagination
  [key in keyof ProductListConfig]: string
}

function ProductList() {
  const queryConfig = useQueryConffig()

  const { data: ProductData } = useQuery({
    // đổi tên thành productdataa
    queryKey: ['products', queryConfig], // truyền query param để link động trên url khi thay đổi data
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig) // ép kiểu
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000 // lấy data cũ để ko phải gọi lại nữa
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
