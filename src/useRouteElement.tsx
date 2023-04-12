import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layout/registerLayout'
import Login from './pages/Login'
import ProductList from './pages/Productlist/Productlist'
import Register from './pages/Register'
import MainLayout from './layout/Mainlayout'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layout/CartLayout'
import UserLayout from './pages/User/Layouts/UserLayout'
import HistoryPurchase from './pages/User/Pages/HIstoryPurchase'
import ChangePassword from './pages/User/Pages/ChangePassword'
import Profile from './pages/User/Pages/Profile'
import NotFound from './pages/NotFound'

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
      path: '*',
      element: <NotFound />
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
          path: '/cart',
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: '/user',
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: '/user/profile',
              element: <Profile />
            },
            {
              path: '/user/purchase',
              element: <HistoryPurchase />
            },
            {
              path: '/user/password',
              element: <ChangePassword />
            }
          ]
        }
      ]
    }
  ])
  return routeElement
}
