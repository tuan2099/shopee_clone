import React, { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorsMesage?: string
  classNameinput?: string
  classNameError?: string
}

function InputNumber({
  errorsMesage,
  className,
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  classNameinput = 'w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm',
  onChange,
  ...rest
}: Props) {
  const handleChange = (event: any) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameinput} onChange={handleChange} {...rest} />
      <div className={classNameError}>{errorsMesage}</div>
    </div>
  )
}

export default InputNumber
