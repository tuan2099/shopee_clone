import React from 'react'
import Button from 'src/components/Button'
import { queryConfig } from '../Productlist'
import { sortBy, order as orderConstant } from 'src/constant/products'
import classNames from 'classnames'
import { ProductListConfig } from 'src/type/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
interface Props {
  queryConfig: queryConfig
  pageSize: number
}

function SourceProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig // check xem thằng nào đang hover
  const navigate = useNavigate()
  const isActiveSortby = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortByValue
      }).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortBy.price,
            order: orderValue
          },
          ['order']
        )
      ).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3 '>
      <div className='item-center flex flex-wrap justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8  px-4 text-sm capitalize text-white', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortby(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortby(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            phổ biến
          </button>
          <button
            className={classNames('h-8  px-4 text-sm capitalize text-white', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortby(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortby(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8  px-4 text-sm capitalize text-white', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortby(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortby(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              'h-8 bg-white  px-4 text-left text-sm capitalize text-black outline-none hover:bg-slate-100',
              {
                'bg-orange text-white hover:bg-orange/80': isActiveSortby(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span> /{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='item-center flex h-8 w-9 cursor-not-allowed justify-center rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='item-center flex h-8 w-9  justify-center rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='item-center flex h-8 w-9 cursor-not-allowed justify-center rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='item-center flex h-8 w-9 justify-center rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SourceProductList
