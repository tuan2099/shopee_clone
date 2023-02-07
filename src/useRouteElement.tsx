import { useRoutes } from 'react-router-dom'
import RegisterLayout from './layout/registerLayout'
import Login from './pages/Login'
import ProductList from './pages/Productlist/Productlist'
import Register from './pages/Register'
import MainLayout from './layout/Mainlayout'
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
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
