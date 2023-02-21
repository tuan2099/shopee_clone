import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

function AssideFilter() {
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
          <li className='py-2 pl-2'>
            <Link to='/' className='relative px-2 font-semibold text-orange'>
              <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              Thời trang mua
            </Link>
          </li>
          <li className='py-2 pl-2'>
            <Link to='/' className='relative px-2 font-semibold text-orange'>
              Thời trang mua
            </Link>
          </li>
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
          <form className='mt-2'>
            <div className='flex items-start'>
              <Input
                type='text'
                className='grow'
                name='from'
                placeholder='đ TỪ'
                classNameinput='px-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Input
                type='text'
                className='grow'
                name='from'
                classNameinput='px-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='đ ĐẾN'
              />
            </div>
            <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm text-white hover:bg-orange/80'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='my-4 h-[1px] bg-gray-300'>
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
