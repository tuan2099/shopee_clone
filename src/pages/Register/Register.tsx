import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { getRules } from 'src/uitils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

function Register() {
  const {
    register,
    handleSubmit,
    watch, // làm cho form rerender --> lẫy value để so sánh confirm - cách 1
    getValues, // ko làm cho component rerender
    formState: { errors } // là 1 obj
  } = useForm<FormData>()
  console.log('errors', errors)

  const rules = getRules(getValues)

  // submit form
  const onSubmit = handleSubmit(
    (data) => {
      // console.log(data)
    },
    (data) => {
      const password = getValues('password') // lấy pass để so sánh
    }
  )
  return (
    <>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols-1 bg-pack-train bg-contain bg-center bg-no-repeat py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
                <div className='text-2xl'>Đăng kí</div>
                <Input
                  name='email'
                  placeholder='Email'
                  type='email'
                  className='mt-8'
                  register={register}
                  rules={rules.email}
                  errorsMesage={errors.email?.message}
                />
                <Input
                  name='password'
                  placeholder='Password'
                  type='password'
                  className='mt-2'
                  register={register}
                  rules={rules.password}
                  errorsMesage={errors.password?.message}
                />
                <Input
                  name='confirm_password'
                  placeholder='Confirm password'
                  type='password'
                  className='mt-2'
                  register={register}
                  rules={rules.confirm_password}
                  errorsMesage={errors.confirm_password?.message}
                />
                {/* <input
                  type='email'
                  className='mt-8 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)} // dữ liệu reac-hook-form
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600 '>{errors.email?.message}</div> */}
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
