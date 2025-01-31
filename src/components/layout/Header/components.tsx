import { useContext } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"
import UserContext from "../../../context/User/UserContext"
import { handleLogoutClick } from "./utils"

// Components
import HeaderBtn from "../../buttons/nav/HeaderBtn/HeaderBtn"
import MenuBtn from "../../buttons/nav/MenuBtn/MenuBtn"
import NavDropdown from "../nav/NavDropdown/NavDropdown"

export const Buttons = () => {
  const { showMenu, dispatch } = useContext(AppContext)
  const { dispatch: userDispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const pathname = useLocation().pathname

  if(pathname === '/login') return null

  return (
    <div className="flex gap-4">
      {showMenu && (
        <>
          <HeaderBtn
            label={'Sites'}
            handleClick={() => navigate('/')} />

          <HeaderBtn
            label={'Contacts'}
            handleClick={() => navigate('/contacts')} />

          <InspectorsMenu />
          <EnforcementMenu />
          <CreateMenu />

          <HeaderBtn
            label={'Logout'}
            handleClick={() => handleLogoutClick(navigate, userDispatch)} />
        </>
      )}

      <MenuBtn
        handleClick={() => dispatch({ type: 'TOGGLE_SHOW_MENU', payload: undefined })}
        active={showMenu} />

    </div>
  )
}

const InspectorsMenu = () => {
  const { inspectorOptions } = useContext(AppContext)

  return (
    <NavDropdown label={'Inspectors'}>
      <>
        {inspectorOptions.map(inspector => {
          return (
            <li key={`inspector-${ inspector.value }`}><Link to={`/inspectors/${ inspector.value }`}>{inspector.text}</Link></li>
          )
        })}
      </>
    </NavDropdown>
  )
}

const EnforcementMenu = () => {

  return (
    <NavDropdown label={'Enforcement'}>
      <>
        <li><Link to={'/violations'}>Construction Violations</Link></li>
        <li><Link to={'/complaints'}>Complaints</Link></li>
        <li><Link to={'/discharges'}>Illicit Discharges</Link></li>
        <li><Link to={'/green'}>Green Infrastructure Violations</Link></li>
      </>
    </NavDropdown>
  )
}

const CreateMenu = () => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
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
  )
}