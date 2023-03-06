import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParam'
import AssideFilter from './AssideFilter'
import Product from './Product/Product'
import SourceProductList from './sourceProductList'

function ProductList() {
  const queryParam = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParam], // truyền query param để link động trên url khi thay đổi data
    queryFn: () => {
      return productApi.getProducts(queryParam)
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AssideFilter />
          </div>
          <div className='col-span-9'>
            <SourceProductList />
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
              {data &&
                data.data.data.products.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
