// quản lý form
import type { RegisterOptions } from 'react-hook-form/dist/types'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const rules: Rules = {
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
    }
  }
}
