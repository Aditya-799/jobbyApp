import {Component} from 'react'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase, FaStar, FaExternalLinkAlt,FaArrowLeft} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import SimilarJobsContainer from '../SimilarJobsContainer'
import SkillItem from '../SkillItem'
import Header from '../Header'
import withRouter from './withRouter'
import './index.css'

class JobItemDetails extends Component {
  state = {
    totalDetails: {},
    isLoading: true,
    isFailure: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  componentDidUpdate(prevProps) {
    const {params} = this.props
    const {id} = params
    if (prevProps.params.id !== id) {
      this.setState({isLoading: true, isFailure: false}, this.getJobDetails)
    }
  }

  convertsimilarJobs = data => {
    const newData = data.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    return newData
  }

  convertSkills = skills => {
    const updatedSkills = skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))
    return updatedSkills
  }

  getJobDetails = async () => {
    const {params} = this.props
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      const updatedData = {
        companyLogoUrl: jsonData.job_details.company_logo_url,
        companyWebsiteUrl: jsonData.job_details.company_website_url,
        employmentType: jsonData.job_details.employment_type,
        lifeAtCompany: {
          description: jsonData.job_details.life_at_company.description,
          imageUrl: jsonData.job_details.life_at_company.image_url,
        },
        location: jsonData.job_details.location,
        packagePerAnnum: jsonData.job_details.package_per_annum,
        jobDescription: jsonData.job_details.job_description,
        rating: jsonData.job_details.rating,
        skills: this.convertSkills(jsonData.job_details.skills),
        title: jsonData.job_details.title,
        similarJobs: this.convertsimilarJobs(jsonData.similar_jobs),
      }

      this.setState({totalDetails: updatedData, isLoading: false})
    } else {
      this.setState({isFailure: true, isLoading: false})
    }
  }

  retryFetching = () => {
    this.setState({isFailure: false, isLoading: true}, this.getJobDetails)
  }

  goBack = () => {
    const {navigate}=this.props
    navigate('/jobs')
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="logout" onClick={this.retryFetching}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots color="#ffffff" height="50" width="50" />
    </div>
  )

  renderContext = () => {
    const {totalDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      packagePerAnnum,
      jobDescription,
      rating,
      skills = [],
      title,
      similarJobs = [],
    } = totalDetails
    const {lifeAtCompany} = totalDetails
    const {description, imageUrl} = {...lifeAtCompany}
    return (
      <>
      <div className="arrow-container">
        <button type="button" className="arrow-button" onClick={this.goBack}>
          <FaArrowLeft className="arrow-icon-jid" />
          </button>
      </div>
        <div className="jid-inner-container">
          <div className="card-top-section">
            <div className="card-top-inner-section">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-icon"
              />
              <div>
                <h1 className="jid-job-name1">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star-icon" />
                  <p className="rating-value">{rating}</p>
                </div>
              </div>
            </div>
            <div className="card-top-bottom-section">
              <div className="card-icons-container">
                <div className="card-icon-container">
                  <MdLocationOn className="job-card-icon" />
                  <p>{location}</p>
                </div>
                <div className="card-icon-container">
                  <FaSuitcase className="job-card-icon" />

                  <p>{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
          <div className="card-bottom-section">
            <div className="description-container">
              <h1 className="jid-job-name">Description</h1>
              <a href={companyWebsiteUrl} className="link-item">
                Visit
                <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>
            <p className="job-desc desc-container">{jobDescription}</p>
            <h1 className="jid-job-name">Skills</h1>
            <ul className="skills-container">
              {skills.map(eachItem => (
                <SkillItem key={eachItem.name} eachItem={eachItem} />
              ))}
            </ul>
            <h1 className="lac-heading">Life At Company</h1>
            <div className="life-at-company-container">
              <div className="lac-desc-container">
                <p>{description}</p>
              </div>
              <div className="image-container">
                <img src={imageUrl} alt="company" className="company-image" />
              </div>
            </div>
          </div>
        </div>
        <div className="simliar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-items">
            {similarJobs.map(eachItem => (
              <SimilarJobsContainer key={eachItem.id} eachItem={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, isFailure} = this.state
    return (
      <>
        <Header />
        <div className="jid-bg-container">
          {isFailure
            ? this.renderFailureView()
            : isLoading
            ? this.renderLoader()
            : this.renderContext()}
        </div>
      </>
    )
  }
}

export default withRouter(JobItemDetails)
