import { useContext } from 'react'
import AppContext from '../../../../context/App/AppContext'
import styles from './NavDropdown.module.css'

// Types
import { NavDropdownProps } from './types'

function NavDropdown({ children, label }: NavDropdownProps) {
  const { activePage } = useContext(AppContext)

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className={activePage === label ? styles.activeBtn : styles.btn}>{label}</div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-52">
        {children}
      </ul>
    </div>
  )
}

export default NavDropdown