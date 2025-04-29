import {Component} from 'react'
import Cookies from 'js-cookie'
import withRouter from './withRouter'
import {Navigate} from 'react-router-dom'
import './index.css'


class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  changedUsername = event => {
    this.setState({username: event.target.value})
  }

  changedPassword = event => {
    this.setState({password: event.target.value})
  }

  changeToHome = data => {
    const {navigate} = this.props
    Cookies.set('jwtToken', data, {expires: 30})
    navigate('/', {replace: true})
    
  }

  displayError = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  detailsSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const obj = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(obj),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok === true) {
      this.changeToHome(jsonData.jwt_token)
    } else {
      this.displayError(jsonData.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const cookieVal = Cookies.get('jwtToken')
    if (cookieVal !== undefined) {
      return <Navigate to="/" replace />
    }
    return (
      <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-icon"
          />
          <form className="form-container" onSubmit={this.detailsSubmitted}>
            <label htmlFor="userName" className="username-heading">
              USERNAME
            </label>
            <input
              type="text"
              className="username"
              id="userName"
              placeholder="Username"
              onChange={this.changedUsername}
              value={username}
            />
            <label htmlFor="Password" className="username-heading">
              PASSWORD
            </label>
            <input
              type="password"
              className="username"
              id="Password"
              placeholder="Password"
              onChange={this.changedPassword}
              value={password}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error-display">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)