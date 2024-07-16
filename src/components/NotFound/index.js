import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <h1 className="not-found-title">Page Not Found!</h1>
    <Link to="/" className="nav-link">
      <p className="go-home-text">Go Home</p>
    </Link>
  </div>
)
export default NotFound
