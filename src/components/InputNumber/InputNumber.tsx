import React, { forwardRef, InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorsMesage?: string
  classNameinput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    errorsMesage,
    className,
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    classNameinput = 'w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: any) => {
    // xư lý chỉ nhận số
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameinput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorsMesage}</div>
    </div>
  )
})

export default InputNumber
