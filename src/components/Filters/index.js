import {Component} from 'react'
import './index.css'

const totalLabel = [
  {
    isLabelPresent: false,
    employmentTypeId: 'FULLTIME',
  },
  {
    isLabelPresent: false,
    employmentTypeId: 'PARTTIME',
  },
  {
    isLabelPresent: false,
    employmentTypeId: 'FREELANCE',
  },
  {
    isLabelPresent: false,
    employmentTypeId: 'INTERNSHIP',
  },
]

class Filters extends Component {
  state = {initial: totalLabel}

  filterlabel = label => {
    const {initial} = this.state
    const {sendList} = this.props
    const updatedList = initial.map(eachItem => ({
      ...eachItem,
      isLabelPresent:
        eachItem.employmentTypeId === label
          ? !eachItem.isLabelPresent
          : eachItem.isLabelPresent,
    }))
    const selectedIds = updatedList
      .filter(item => item.isLabelPresent)
      .map(item => item.employmentTypeId)
    sendList(selectedIds.join(','))
    this.setState({initial: updatedList})
  }

  changedsalaryRange = salary => {
    const {salaryChange} = this.props
    salaryChange(salary)
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <div className="filter-container">
        <hr className="line" />
        <h1 className="f-heading">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachItem => (
            <li className="check-box-container" key={eachItem.employmentTypeId}>
              <button
                className="new-button"
                type="button"
                onClick={() => this.filterlabel(eachItem.employmentTypeId)}
              >
                <input type="checkbox" className="checkbox" />
              </button>
              <p className="job-type">{eachItem.label}</p>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <h1 className="f-heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachItem => (
            <li className="check-box-container" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                className="checkbox"
                name="salaryRangeButton"
                onChange={() => this.changedsalaryRange(eachItem.salaryRangeId)}
              />
              <p className="job-type">{eachItem.label}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Filters
