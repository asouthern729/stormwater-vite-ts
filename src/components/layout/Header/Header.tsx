import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AppContext from '../../../context/App/AppContext'
import UserContext from '../../../context/User/UserContext'
import { APP_TITLE } from '../../../config'
import { handleLogoutClick } from '.'
import styles from './Header.module.css'

// Components
import HeaderBtn from '../../buttons/nav/HeaderBtn/HeaderBtn'
import NavDropdown from '../nav/NavDropdown/NavDropdown'
import MenuBtn from '../../buttons/nav/MenuBtn/MenuBtn'

function Header() {
  const { inspectorOptions, showMenu, dispatch } = useContext(AppContext)
  const { dispatch: userDispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const pathname = useLocation().pathname

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>City of Franklin</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>

      {pathname !== '/login' && (
        <div className="flex gap-4">
        {showMenu && (
          <>
            <HeaderBtn
              label={'Sites'}
              handleClick={() => navigate('/')} />

            <HeaderBtn
              label={'Contacts'}
              handleClick={() => navigate('/contacts')} />

            <NavDropdown label={'Inspectors'}>
              <>
                {inspectorOptions.map(inspector => {
                  return (
                    <li key={`inspector-${ inspector.value }`}><Link to={`/inspectors/${ inspector.value }`}>{inspector.text}</Link></li>
                  )
                })}
              </>
            </NavDropdown>

            <NavDropdown label={'Enforcement'}>
              <>
                <li><Link to={'/violations'}>Construction Violations</Link></li>
                <li><Link to={'/complaints'}>Complaints</Link></li>
                <li><Link to={'/discharges'}>Illicit Discharges</Link></li>
                <li><Link to={'/green'}>Green Infrastructure Violations</Link></li>
              </>
            </NavDropdown>

            <NavDropdown label={'Create'}>
              <>
                <li><Link to={'/create?formType=createSite'}>Site</Link></li>
                <li><Link to={'/create?formType=createViolation'}>Construction Violation</Link></li>
                <li><Link to={'/create?formType=createComplaint'}>Complaint</Link></li>
                <li><Link to={'/create?formType=createDischarge'}>Illicit Discharge</Link></li>
                <li><Link to={'/create?formType=createGreen'}>Green Infrastructure Violation</Link></li>
                <li><Link to={'/create?formType=createContact'}>Contact</Link></li>
                <li><Link to={'/create?formType=createInspector'}>Inspector</Link></li>
              </>
            </NavDropdown>

            <HeaderBtn
              label={'Logout'}
              handleClick={() => handleLogoutClick(navigate, userDispatch)} />
          </>
        )}

        <MenuBtn
          handleClick={() => dispatch({ type: 'TOGGLE_SHOW_MENU', payload: undefined })}
          active={showMenu} />

      </div> 
      )}
    </header>
  )
}

export default Header
