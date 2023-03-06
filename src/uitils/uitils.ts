import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constant/httpStatusCode.enum' // lấy từ constant

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

// check lỗi 422
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// format số cho card product
export function formartCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
