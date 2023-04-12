// Flow 1:
// Nhấn upload: upload lên server luôn => server trả về url ảnh
// Nhấn submit thì gửi url ảnh cộng với data lên server

// Flow 2: recoment
// Nhấn upload: không upload lên server
// Nhấn submit thì tiến hành upload lên server, nếu upload thành công thì tiến hành gọi api updateProfile

import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { useForm, Controller, useFormContext, FormProvider } from 'react-hook-form'
import { UserSchema, userSchema } from 'src/uitils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import DateSelect from '../../Component/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/uitils/auth'
import { getAvatarURL, isAxiosUnprocessableEntityError } from 'src/uitils/uitils'
import { ErrorResponse } from 'src/type/utils.type'
import InputFile from 'src/components/InputFile'

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameinput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='name'
            placeholder='Tên'
            errorsMesage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameinput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Số điện thoại'
                errorsMesage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </>
  )
}

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

function Profile() {
  const [file, setFile] = useState<File>()
  // xử lý file ảnh đc up load lên
  // tạo ra 1 đoạn url từ file
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { setProfile } = useContext(AppContext)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const avatar = watch('avatar')

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadFileMutation = useMutation(userApi.uploadAvatar)
  // quản lý form INFO
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  // đẩy thông tin user ra ngoài form
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (file) {
        let avatarName = avatar
        const form = new FormData() // tạo form data của js có sẵn
        form.append('image', file)
        const upLoadRes = await uploadFileMutation.mutateAsync(form)
        avatarName = upLoadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        roles: [],
        createdAt: '',
        updatedAt: ''
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data) // do lấy data từ local stỏage -> phải cập nhật
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }
  return (
    <>
      <div className='rounded-sm bg-white px-7 pb-20 shadow'>
        <div className='border-b-gray border-b py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
          <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <FormProvider {...methods}>
          <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
            <div className='md:mt:0 mt-6 flex-grow pr-12'>
              <div className='flex flex-wrap'>
                <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
                <div className='w-[80%] pl-5'>
                  <div className='pt-3 text-gray-700'>{profile?.email}</div>
                </div>
              </div>
              <Info />
              <div className='mt-6 flex flex-wrap'>
                <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
                <div className='w-[80%] pl-5'>
                  <Input
                    register={register}
                    name='name'
                    placeholder='tên'
                    errorsMesage={errors.name?.message}
                    className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                </div>
              </div>
              <div className='mt-6 flex flex-wrap'>
                <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
                <div className='w-[80%] pl-5'>
                  <Controller
                    control={control}
                    name='phone'
                    render={({ field }) => (
                      <InputNumber
                        placeholder='số điện thoại'
                        errorsMesage={errors.phone?.message}
                        {...field}
                        onChange={field.onChange}
                        className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      />
                    )}
                  />
                </div>
              </div>
              <div className='mt-6 flex flex-wrap'>
                <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
                <div className='w-[80%] pl-5'>
                  <Input
                    register={register}
                    name='address'
                    placeholder='Địa chỉ'
                    errorsMesage={errors.name?.message}
                    className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                </div>
              </div>

              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DateSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
                <div className='sm:w-[80%] sm:pl-5'>
                  <Button
                    type='submit'
                    className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
              <div className='flex flex-col items-center'>
                <div className='my-5 h-24 w-24'>
                  <img
                    src={previewImage || getAvatarURL(profile?.avatar)}
                    alt='ảnh'
                    className=' h-full w-full rounded-full object-cover'
                  />
                </div>
                <InputFile onChange={handleChangeFile} />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default Profile
