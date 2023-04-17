//set up api
import { AuthResponse } from './../type/auth.type'
import http from 'src/uitils/http'

export const URl_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URl_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
