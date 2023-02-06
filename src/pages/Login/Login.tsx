import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols-1 bg-pack-train bg-contain bg-center bg-no-repeat py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='rounded bg-white p-10 shadow-sm' noValidate>
                <div className='text-2xl'>Đăng nhập</div>
                <input
                  name='email'
                  type='email'
                  className='mt-8 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                <input
                  name='password'
                  type='password'
                  className='mt-2 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                />
                <div className='mt-3'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className='mt-8 flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link className='ml-1 text-red-400' to='/register'>
                    Đăng ký
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
