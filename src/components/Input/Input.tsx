import React from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props {
  type: React.HTMLInputTypeAttribute
  errorsMesage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}

function Input({ type, errorsMesage, placeholder, className, name, register, rules }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)} // dữ liệu reac-hook-form
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600 '>{errorsMesage}</div>
    </div>
  )
}

export default Input
