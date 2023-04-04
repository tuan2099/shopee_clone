import { createContext, useState } from 'react'
import { ExtendedPurchases } from 'src/type/purchase.type'
import { User } from 'src/type/user.type'
import { getAccesToken, getProfile } from 'src/uitils/auth'

// khai báp type
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendPurchases: ExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  // giá trị khởi tạo
  isAuthenticated: Boolean(getAccesToken()),
  setIsAuthenticate: () => null,
  profile: getProfile(),
  setProfile: () => null,
  extendPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
}

// set up context
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticate] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>(initialAppContext.extendPurchases) // tạo state quản lý checked

  const reset = () => {
    setIsAuthenticate(false)
    setExtendedPurchases([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticate, profile, setProfile, extendPurchases, setExtendedPurchases, reset }}
    >
      {children}
    </AppContext.Provider>
  )
}
