import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class ProfileContainer extends Component {
  state = {updatedData: {}, isdatafetched: false, isLoading: true}

  componentDidMount() {
    this.getProfiledetails()
  }

  getProfiledetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      const updatedData = {
        name: jsonData.profile_details.name,
        profileImageUrl: jsonData.profile_details.profile_image_url,
        shortBio: jsonData.profile_details.short_bio,
      }
      this.setState({updatedData, isdatafetched: true, isLoading: false})
    } else {
      this.setState({isdatafetched: false, isLoading: false})
    }
  }

  renderProfileContainer = () => {
    const {updatedData} = this.state
    return (
      <div className="profile-container">
        <img
          src={updatedData.profileImageUrl}
          alt="profile-img"
          className="profile-img"
        />
        <h1 className="name">{updatedData.name}</h1>
        <p className="role">{updatedData.shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container failed-to-load" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFetching = () => {
    this.setState(
      {isdatafetched: false, isLoading: true},
      this.getProfiledetails,
    )
  }

  renderretryButton = () => (
    <div className="failed-to-load">
      <button type="button" className="logout" onClick={this.retryFetching}>
        Retry
      </button>
    </div>
  )

  render() {
    const {isdatafetched, isLoading} = this.state
    return (
      <>
        {isLoading
          ? this.renderLoader()
          : isdatafetched
          ? this.renderProfileContainer()
          : this.renderretryButton()}
      </>
    )
  }
}

export default ProfileContainer
