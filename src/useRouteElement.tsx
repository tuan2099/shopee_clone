import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layout/registerLayout'
import Login from './pages/Login'
import ProductList from './pages/Productlist/Productlist'
import Register from './pages/Register'
import MainLayout from './layout/Mainlayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layout/CartLayout'

// xử lý đăng nhập vào mới đưuọc làm ....
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
// login rồi thì ko cần vào trang login nữa
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    // chưa login
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login', // login sử dụng registerLayout
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register', // register sử dụng registerLayout
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: ':nameId',
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    // sau login
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: '/cart',
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}
