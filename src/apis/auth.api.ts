import { AuthResponse } from './../type/auth.type'
import http from 'src/uitils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
