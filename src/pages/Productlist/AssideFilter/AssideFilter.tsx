import classNames from 'classnames'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { Categorry } from 'src/type/categorry.type'
import { queryConfig } from '../Productlist'
import { schema } from 'src/uitils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
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
          <ul className='my-3'>
            <li className='py-1 pl-2'>
              <Link to='/' className='flex items-center text-sm '>
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <>
                        <svg
                          key={index}
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='mr-1 h-6 w-6 '
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                          />
                        </svg>
                      </>
                    )
                  })}
                <span>Trở lên</span>
              </Link>
            </li>
          </ul>
        </div>
        <Button className='w-full bg-orange px-2 py-2 text-sm uppercase text-white'>Xóa tất cả</Button>
      </div>
    </>
  )
}

export default AssideFilter
