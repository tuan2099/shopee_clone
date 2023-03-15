import classNames from 'classnames'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import { Categorry } from 'src/type/categorry.type'
import { queryConfig } from '../Productlist'
import { schema } from 'src/uitils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStar from '../Ratingstar/RatingStar'
import { omit } from 'lodash'

interface Props {
  categories: Categorry[]
  queryConfig: queryConfig
}

type FormData = {
  price_min: string
  price_max: string
}

// logic validate
// nếu có min và max thì max >= min
// còn ko thì có min thì ko có max va ngược lại

const priceSchema = schema.pick(['price_min', 'price_max'])

function AssideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig
  // quản lý from trong component
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const navigate = useNavigate()
  const onsubmit = handleSubmit((data) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const clearAllFilter = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <>
      <div className='py-4'>
        <Link to='/' className='flex items-center font-bold'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
            />
          </svg>
          Tất cả danh mục
        </Link>
        <div className='my-4 h-[1px] bg-gray-300' />
        <ul>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: '/',
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2 ', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <Link to='/' className='font-blod mt-4 flex items-center uppercase'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className='mr-3 h-4 w-3 fill-current stroke-current'
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          Bộ lọc tìm kiếm
        </Link>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='my-5'>
          <div>Khoảng giá</div>
          <form className='mt-2' onSubmit={onsubmit}>
            <div className='flex items-start'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='đ TỪ'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_max') // validate cả 2
                      }}
                      classNameError='hidden'
                      classNameinput='px-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    />
                  )
                }}
              />

              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_min') // validate cả 2
                      }}
                      classNameError='hidden'
                      classNameinput='px-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      placeholder='đ ĐẾN'
                    />
                  )
                }}
              />
            </div>
            <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.price_min?.message}</div>
            <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm text-white hover:bg-orange/80'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='my-4 '>
          <div>Đánh giá</div>
          <RatingStar queryConfig={queryConfig} />
        </div>
        <Button className='w-full bg-orange px-2 py-2 text-sm uppercase text-white' onClick={clearAllFilter}>
          Xóa tất cả
        </Button>
      </div>
    </>
  )
}

export default AssideFilter
