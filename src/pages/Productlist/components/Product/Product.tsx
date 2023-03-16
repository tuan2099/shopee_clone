import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/productRating'
import { Product as ProductType } from 'src/type/product.type'
import { formartCurrency, formatNumberToSocialStyle } from 'src/uitils/uitils'
interface Props {
  product: ProductType
}
function Product({ product }: Props) {
  return (
    <>
      <Link to={`/${product._id}`}>
        <div className='transtion-transform overflow-hidden rounded-sm bg-white shadow duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md'>
          <div className='relative w-full pt-[100%]'>
            <img
              src={product.image}
              alt={product.name}
              className='absolute top-0 left-0 h-full w-full bg-white object-cover '
            />
          </div>
          <div className='overflow-hidden p-2 '>
            <div className='min-h-[1.75rem] text-sm line-clamp-2'>{product.name}</div>
            <div className='mt-3  flex items-center'>
              <div className='max-w-[50%] truncate text-gray-500 line-through'>
                <span className='text-xs'>đ</span>
                <span>{formartCurrency(product.price_before_discount)}</span>
              </div>
              <div className='ml-1 truncate text-orange'>
                <span className='text-xs'>đ</span>
                <span>{formartCurrency(product.price)}</span>
              </div>
            </div>
            <div className='mt-3 flex items-center justify-end'>
              <ProductRating rating={product.rating} />
              <div className='ml-2 text-sm'>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1'>Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Product
