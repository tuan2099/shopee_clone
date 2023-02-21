import React from 'react'
import { Link } from 'react-router-dom'
import AssideFilter from './AssideFilter'
import Product from './Product/Product'
import SourceProductList from './sourceProductList'

function ProductList() {
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
              {Array(30)
                .fill(0)
                .map((_, index) => {
                  return (
                    <>
                      <div className='col-span-1' key={index}>
                        <Product />
                      </div>
                    </>
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
