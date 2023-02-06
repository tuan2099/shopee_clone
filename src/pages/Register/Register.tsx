import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { rules } from 'src/uitils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors } // là 1 obj
  } = useForm<FormData>()
  console.log('errors', errors)

  // submit form
  const onSubmit = handleSubmit((data) => {
    // console.log(data)
  })
  return (
    <>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols-1 bg-pack-train bg-contain bg-center bg-no-repeat py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
                <div className='text-2xl'>Đăng kí</div>
                <input
                  type='email'
                  className='mt-8 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)} // dữ liệu reac-hook-form
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600 '>{errors.email?.message}</div>
                <input
                  type='password'
                  className='mt-2 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password)} // dữ liệu reac-hook-form
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600 '>{errors.password?.message}</div>
                <input
                  type='confirm_password'
                  className='mt-2 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Confirm Password'
                  autoComplete='on'
                  {...register('confirm_password', rules.confirm_password)} // dữ liệu reac-hook-form
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600 '>{errors.confirm_password?.message}</div>
                <div className='mt-3'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Register
