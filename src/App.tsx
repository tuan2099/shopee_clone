import { useContext, useEffect } from 'react'
import './App.css'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './uitils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElement = useRouteElement()

  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      {routeElement}
      <ToastContainer />
    </>
  )
}

export default App
