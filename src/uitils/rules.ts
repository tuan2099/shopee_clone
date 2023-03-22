// quản lý form
import { type } from 'os'
// import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form/dist/types'
import { AnyObject } from 'yup/lib/types'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
function testPriceMinMax(this: yup.TestContext<AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    }, // bắt buộc phải nhập dữu liệu
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không hợp lệ'
    }, // check xem có phải email ko
    maxLength: {
      value: 160,
      message: 'Tối đa 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Tối thiểu 5 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    }, // bắt buộc phải nhập dữu liệu
    maxLength: {
      value: 160,
      message: 'Tối đa 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Tối thiểu 5 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng nhập lại password là bắt buộc'
    }, // bắt buộc phải nhập dữu liệu
    maxLength: {
      value: 160,
      message: 'Tối đa 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Tối thiểu 5 kí tự'
    },
    // so sánh value
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại pass không khớp '
        : undefined
  }
})

// Yup
export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không hợp lệ')
    .min(5, 'Tối thiểu 5 kí tự')
    .max(160, 'Tối đa 160 kí tự'),
  password: yup.string().required('Password là bắt buộc').min(5, 'Tối thiểu 5 kí tự').max(160, 'Tối đa 160 kí tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại password là bắt buộc')
    .min(5, 'Tối thiểu 5 kí tự')
    .max(160, 'Tối đa 160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá ko phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá ko phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Vui lòng nhập teen sản phẩm')
})

export type Schema = yup.InferType<typeof schema> // kế thừa schema -> ko cần khái báo interface
