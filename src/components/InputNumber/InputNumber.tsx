import React, { forwardRef, InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorsMesage?: string
  classNameinput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorsMesage,
    className,
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    classNameinput = 'w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  // state cục bộ phòng trường hợp người dùng ko nhập gì vào
  // còn nếu người dùng truyền value vào thì lấy value đó làm giá trị khởi tạo
  // chỉ có hiệu nghiệm khi render lần đầu
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // xư lý chỉ nhận số
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // thực hiện onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)

      //  cập nhật local value state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameinput} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorsMesage}</div>
    </div>
  )
})

export default InputNumber
