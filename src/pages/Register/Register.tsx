import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/uitils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/uitils/uitils'
import { ErrorResponse } from 'src/type/utils.type'
import Button from 'src/components/Button'
import { AppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

function Register() {
  const { setIsAuthenticate, setProfile } = useContext(AppContext) // lấy ra từ context api
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError, // get lỗi
    formState: { errors } // là 1 obj
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema) // dùng yup
  })
  // react query call api register
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  // submit form
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']) // bỏ đi thuộc tính confirm password
    // thực hiện call data
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticate(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
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
                  <Button
                    type='submit'
                    isLoading={registerAccountMutation.isLoading}
                    disabled={registerAccountMutation.isLoading}
                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng ký
                  </Button>
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
