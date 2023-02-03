import { useRoutes } from 'react-router-dom'
import RegisterLayout from './layout/registerLayout'
import Login from './pages/Login'
import ProductList from './pages/Productlist/Productlist'
import Register from './pages/Register'

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
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
  ])
  return routeElement
}
