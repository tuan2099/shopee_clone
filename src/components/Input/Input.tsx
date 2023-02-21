import React, { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorsMesage?: string
  register?: UseFormRegister<any>
  classNameinput?: string
  classNameError?: string
  rules?: RegisterOptions
}

function Input({
  type,
  errorsMesage,
  placeholder,
  className,
  name,
  register,
  rules,
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  classNameinput = 'w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameinput}
        placeholder={placeholder}
        {...registerResult} // dữ liệu reac-hook-form
      />
      <div className={classNameError}>{errorsMesage}</div>
    </div>
  )
}

export default Input
