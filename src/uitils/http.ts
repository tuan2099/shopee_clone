import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/type/auth.type'
import { clearAccesTokenFromLocalStorage, getAccesToken, saveAccesTokenToLocalStorage, setProfileToLS } from './auth'
import config from 'src/constant/config'

class Http {
  // bản chất lưu trên ram
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccesToken() // lấy trong localstorage sẽ bị chậm,
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
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
        if (url === 'login' || url === 'register') {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token // bằng giá trị access token lấy ra từ response
          saveAccesTokenToLocalStorage(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === 'logout') {
          this.accessToken = ''
          clearAccesTokenFromLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // check token hết hạn thì xóa khoi local storage và tải lại trang
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearAccesTokenFromLocalStorage()
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
