import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const ProtectedRoute = ({children}) => {
  const cookieVal = Cookies.get('jwtToken')
  if (cookieVal === undefined) {
    return <Navigate to="/login" replace/>
  }
  return children
}

export default ProtectedRoute
