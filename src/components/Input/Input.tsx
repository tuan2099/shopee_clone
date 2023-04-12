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
  errorsMesage,
  className,
  name,
  register,
  rules,
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  classNameinput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  ...rest // những props có sẵn trong thằng input
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        className={classNameinput}
        {...registerResult} // dữ liệu reac-hook-form
        {...rest}
      />
      <div className={classNameError}>{errorsMesage}</div>
    </div>
  )
}

export default Input
