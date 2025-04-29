import {Routes, Route} from 'react-router-dom'
import './App.css'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'
import Jobs from './components/Jobs'
import Login from './components/Login'
import Home from './components/Home'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here

const App = () => (
  <>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route
      path="/jobs"
      element={
        <ProtectedRoute>
          <Jobs
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
          />
        </ProtectedRoute>
      }
    />
    <Route
      path="/jobs/:id"
      element={
        <ProtectedRoute>
          <JobItemDetails />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
</>
)

export default App
