import { useState } from "react"
import { useLocation, Link } from "react-router"
import { useReturnUserRoles } from '@/helpers/hooks'
import { useGetInspectors } from './hooks'

// Icons
import icon from '@/assets/icons/menu/menu.svg'
import activeIcon from '@/assets/icons/menu/menu-light.svg'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import NavDropdown from "../nav/NavDropdown"

export const Buttons = () => {
  const [state, setState] = useState<{ expanded: boolean }>({ expanded: true })

  const pathname = useLocation().pathname

  if(pathname === '/') return null // Hide on login page

  return (
    <div className="flex gap-4">
      {state.expanded && (
        <>
          <HeaderLink href={'/sites'}>Sites</HeaderLink>
          <HeaderLink href={'/contacts'}>Contacts</HeaderLink>
          <InspectorsMenu />
          <EnforcementMenu />
          <CreateMenu />
        </>
      )}

      <MenuBtn 
        onClick={() => setState(prevState => ({ expanded: !prevState.expanded }))}
        expanded={state.expanded} />

    </div>
  )
}

type HeaderLinkProps = { href: string, children: React.ReactNode }

const HeaderLink = (props: HeaderLinkProps) => {
  const pathname = useLocation().pathname

  const active = pathname === props.href

  return (
    <Link to={props.href} className={`btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none ${ active ? 'text-warning' : null }`}>{props.children}</Link>
  )
}

const InspectorsMenu = () => {
  const { data } = useGetInspectors()

  return (
    <NavDropdown label={'Inspectors'}>
      <>
        {data?.data.map(inspector => {
          return (
            <InspectorMenuItem 
              key={`inspector-menu-${ inspector.slug }`}
              inspector={inspector} />
          )
        })}
      </>
    </NavDropdown>
  )
}

const InspectorMenuItem = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {

  return (
    <li key={`inspector-${ inspector.uuid }`} className="hover:cursor-pointer hover:bg-neutral"><Link to={`/inspectors/${ inspector.slug }`}>{inspector.name}</Link></li>
  )
}

const EnforcementMenu = () => {

  return (
    <NavDropdown label={'Enforcement'}>
      <>
        <EnforcementMenuItem href={'/violations'}>Construction Violations</EnforcementMenuItem>
        <EnforcementMenuItem href={'/complaints'}>Complaints</EnforcementMenuItem>
        <EnforcementMenuItem href={'/discharges'}>Illicit Discharges</EnforcementMenuItem>
      </>
    </NavDropdown>
  )
}

type EnforcementMenuItemProps = { href: string, children: React.ReactNode }

const EnforcementMenuItem = (props: EnforcementMenuItemProps) => {

  return (
    <li><Link to={props.href} className="hover:cursor-pointer hover:bg-neutral">{props.children}</Link></li>
  )
}

const CreateMenu = () => {
  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <NavDropdown label={'Create'}>
      <>
        <CreateMenuItem href={'/create?formType=createSite'}>Site</CreateMenuItem>
        <CreateMenuItem href={'/create?formType=createViolation'}>Construction Violation</CreateMenuItem>
        <CreateMenuItem href={'/create?formType=createComplaint'}>Complaint</CreateMenuItem>
        <CreateMenuItem href={'/create?formType=createDischarge'}>Illicit Discharge</CreateMenuItem>
        <CreateMenuItem href={'/create?formType=createContact'}>Contact</CreateMenuItem>
        <CreateMenuItem href={'/create?formType=createInspector'}>Inspector</CreateMenuItem>
      </>
    </NavDropdown>
  )
}

type CreateMenuItemProps = { href: string, children: React.ReactNode }

const CreateMenuItem = (props: CreateMenuItemProps) => {

  return (
    <li><Link to={props.href}>{props.children}</Link></li>
  )
}

const MenuBtn = ({ onClick, expanded }: { onClick: React.MouseEventHandler<HTMLButtonElement>, expanded: boolean }) => {

  return (
    <button 
      type="button"
      className="flex flex-col justify-center w-16"
      onClick={onClick}>
        <img src={!expanded ? icon : activeIcon} alt="menu icon" className="m-auto w-3/4" />
    </button>
  )
}