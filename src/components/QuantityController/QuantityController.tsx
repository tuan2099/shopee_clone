import React, { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrese?: (value: number) => void
  onType?: (value: number) => void
  classnameWrapper?: string
}

function QuantityController({ max, onType, value, onDecrese, onIncrease, classnameWrapper = 'ml-10', ...rest }: Props) {
  const [localvalue, setLocavalue] = useState<number>(Number(value) || 0) // local state dùng cho inputnumber

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value) // biến valkue thành number
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocavalue(_value)
  }

  const Increase = () => {
    let _value = Number(value || localvalue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocavalue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localvalue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrese && onDecrese(_value)
    setLocavalue(_value)
  }

  return (
    <>
      <div className={'flex items-center' + classnameWrapper}>
        <button
          onClick={decrease}
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-4 w-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
          </svg>
        </button>
        <InputNumber
          onChange={handleChange}
          value={value || localvalue}
          className=''
          classNameError='hidden'
          classNameinput='h-8 w-14 border-t border-b border-gray-300 text-center outline-none'
          {...rest}
        />
        <button
          onClick={Increase}
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-4 w-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    </>
  )
}

export default QuantityController
