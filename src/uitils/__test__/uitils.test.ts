import { describe, it, expect } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntityError } from '../uitils'
import { AxiosError, HttpStatusCode } from 'axios'
// mô tả cách ngữ cảnh, những cái cần test ví dụ như func , component

describe('isAxiosError', () => {
  // it ghi chú trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    // expect -> mong đợi 1 giá trị trả về
    expect(isAxiosError(new Error())).toBe(false) // khi chạy -> trả về false
    expect(isAxiosError(new AxiosError())).toBe(true) // lỗi liên quan đến axios
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('return boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    // lỗi 500
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    // lỗi 422
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})
