import {MdHome, MdExitToApp} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const Logout = () => {
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  return (
    <div className="top-section">
      <div className="website-icon">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-website-logo"
          />
        </Link>
      </div>

      <ul className="icons-container">
        <li classname="hi">
          <MdHome className="icon" />
        </li>
        <li classname="hi">
          <BsFillBriefcaseFill className="icon" />
        </li>
        <li classname="hi">
          <MdExitToApp className="icon" onClick={Logout} />
        </li>
      </ul>

      <div className="nav-items-section">
        <Link to="/" className="nav-item">
          <p>Home</p>
        </Link>
        <Link to="/jobs" className="nav-item">
          <p>Jobs</p>
        </Link>
      </div>
      <div className="nav-items-section">
        <button type="button" className="logout-button" onClick={Logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
