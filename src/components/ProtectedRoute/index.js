import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const ProtectedRoute = props => {
  const cookieVal = Cookies.get('jwtToken')
  if (cookieVal === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
