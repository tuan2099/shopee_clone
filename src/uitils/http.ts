import axios, { AxiosError, HttpStatusCode, type AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenReponse } from 'src/type/auth.type'
import {
  clearAccesTokenFromLocalStorage,
  getAccesToken,
  getRefreshToken,
  saveAccesTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  setProfileToLS
} from './auth'
import config from 'src/constant/config'
import { URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER, URl_LOGIN } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './uitils'
import { ErrorResponse } from 'src/type/utils.type'

class Http {
  // bản chất lưu trên ram
  instance: AxiosInstance
  private accessToken: string // private -> chỉ những method trong class mới có thể truy cập được
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null // xử lý việc thằng refesh có bị call liên tục hay không
  // tạo method refresh Token
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data // lấy acces token mới
        saveAccesTokenToLocalStorage(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearAccesTokenFromLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
  constructor() {
    this.accessToken = getAccesToken() // lấy trong localstorage sẽ bị chậm,
    this.refreshToken = getRefreshToken()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10, // gửi lên thười gian hết hạn token
        'expire-refresh-token': 60 * 60 // refresh luôn lớn hơn access
      }
    })
    // xử lý interceptors
    //interceptors request
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    //interceptors response
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config // accesstoken
        if (url === URl_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token // bằng giá trị access token lấy ra từ response
          this.refreshToken = data.data.refresh_token
          // lưu vào local
          saveAccesTokenToLocalStorage(this.accessToken)
          saveRefreshTokenToLocalStorage(this.refreshToken)
          setProfileToLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearAccesTokenFromLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn
        // check token hết hạn thì xóa khoi local storage và tải lại trang
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; massage: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          // token hết hạn và request đó ko phải là của request refresh token -> mới tiến hành gọi
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          clearAccesTokenFromLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error('lỗi rồi')
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
