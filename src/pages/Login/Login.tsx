import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/uitils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosError, isAxiosUnprocessableEntityError } from 'src/uitils/uitils'
import { ErrorResponse } from 'src/type/utils.type'
import { useForm } from 'react-hook-form'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { User } from 'src/type/user.type'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password']) // set up schema trừ confirm_pass

function Login() {
  const { setIsAuthenticate, setProfile } = useContext(AppContext) // lấy ra từ context api
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  // react query call api register
  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  // submit form
  const onSubmit = handleSubmit((data) => {
    // thực hiện call data
    loginAccountMutation.mutate(data, {
      onSuccess: (data: { data: { data: { user: React.SetStateAction<User | null> } } }) => {
        setIsAuthenticate(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
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
              <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl'>Đăng nhập</div>
                <Input
                  name='email'
                  type='email'
                  className='mt-8 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                  register={register}
                  errorsMesage={errors.email?.message}
                />
                <Input
                  name='password'
                  type='password'
                  className='mt-2 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  register={register}
                  errorsMesage={errors.email?.message}
                />
                <div className='mt-3'>
                  <Button
                    type='submit'
                    isLoading={loginAccountMutation.isLoading}
                    disabled={loginAccountMutation.isLoading}
                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng nhập
                  </Button>
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
