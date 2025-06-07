// Types
import { PagesType } from '../../Header/context'

function NavDropdown({ children, active, label }: { label: PagesType, active: boolean, children: React.ReactNode }) {

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className={`btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none ${ active ? 'text-warning' : 'text-neutral-content' }`}>{label}</div>
      <ul tabIndex={0} className="dropdown-content menu bg-primary text-neutral-content z-[1] w-52">
        {children}
      </ul>
    </div>
  )
}

export default NavDropdown