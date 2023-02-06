import React from 'react'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/uitils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosError, isAxiosUnprocessableEntityError } from 'src/uitils/uitils'
import { SuccessResponse } from 'src/type/utils.type'
type FormData = Schema

function Register() {
  const {
    register,
    handleSubmit,
    watch, // làm cho form rerender --> lẫy value để so sánh confirm - cách 1
    setError, // get lỗi
    formState: { errors } // là 1 obj
  } = useForm<FormData>({
    resolver: yupResolver(schema) // dùng yup
  })
  // react query call api register
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  // submit form
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']) // bỏ đi thuộc tính confirm password
    // thực hiện call data
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<SuccessResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
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
                  errorsMesage={errors.email?.message}
                />
                <Input
                  name='password'
                  placeholder='Password'
                  type='password'
                  className='mt-2'
                  register={register}
                  errorsMesage={errors.password?.message}
                />
                <Input
                  name='confirm_password'
                  placeholder='Confirm password'
                  type='password'
                  className='mt-2'
                  register={register}
                  errorsMesage={errors.confirm_password?.message}
                />
                {/* <input
                  type='email'
                  className='mt-8 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)} // dữ liệu react-hook-form
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
