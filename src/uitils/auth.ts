import { User } from 'src/type/user.type'

export const saveAccesTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccesTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile') // xóa cả profile
}

export const getAccesToken = () => localStorage.getItem('access_token') || ''

export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
