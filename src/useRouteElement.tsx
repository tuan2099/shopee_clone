import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layout/registerLayout'
import MainLayout from './layout/Mainlayout'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './contexts/app.context'
import CartLayout from './layout/CartLayout'

// import lazy load page
const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/Productlist'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const NotFound = lazy(() => import('./pages/NotFound'))
const UserLayout = lazy(() => import('./pages/User/Layouts/UserLayout'))
const HistoryPurchase = lazy(() => import('./pages/User/Pages/HIstoryPurchase'))
const ChangePassword = lazy(() => import('./pages/User/Pages/ChangePassword'))
const Profile = lazy(() => import('./pages/User/Pages/Profile'))

// xử lý đăng nhập vào mới được làm ....
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: '/register', // register sử dụng registerLayout
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
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
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    },
    {
      path: ':nameId',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
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
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: '/user',
          element: (
            <MainLayout>
              <Suspense>
                <UserLayout />
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: '/user/profile',
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: '/user/purchase',
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            },
            {
              path: '/user/password',
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routeElement
}
