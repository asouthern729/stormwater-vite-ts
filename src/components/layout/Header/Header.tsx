import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import UserContext from '../../../context/User/UserContext'
import { APP_TITLE } from '../../../config'
import styles from './Header.module.css'

// Components
import HeaderBtn from '../../buttons/nav/HeaderBtn/HeaderBtn'
import NavDropdown from '../nav/NavDropdown/NavDropdown'

function Header() {
  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>City of Franklin</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>
      <div className="flex gap-4">
        <HeaderBtn
          label={'Sites'}
          handleClick={() => navigate('/')} />
        <NavDropdown label={'Enforcement'}>
          <li><Link to={'/violations'}>Construction Violations</Link></li>
          <li><Link to={'/complaints'}>Complaints</Link></li>
          <li><Link to={'/discharges'}>Illicit Discharges</Link></li>
          <li><Link to={'/green'}>Green Infrastructure Violations</Link></li>
        </NavDropdown>
        <NavDropdown label={'Create'}>
          <li><Link to={'/create?formType=createSite'}>Site</Link></li>
          <li><Link to={'/create?formType=createViolation'}>Construction Violation</Link></li>
          <li><Link to={'/create?formType=createComplaint'}>Complaint</Link></li>
          <li><Link to={'/create?formType=createDischarge'}>Illicit Discharge</Link></li>
        </NavDropdown>
        <HeaderBtn
          label={'Logout'}
          handleClick={() => null} />
      </div> 
    </header>
  )
}

export default Header
