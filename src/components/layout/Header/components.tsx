import { useContext } from "react"
import { useLocation, Link } from "react-router"
import { APP_TITLE } from '../../../config'
import HeaderCtx from "./context"
import { useReturnUserRoles } from '@/helpers/hooks'
import { useGetInspectors, useIsEnforcmentPageActive } from './hooks'

// Icons
import icon from '@/assets/icons/menu/menu.svg'
import activeIcon from '@/assets/icons/menu/menu-light.svg'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import NavDropdown from "../nav/NavDropdown"

export const Title = () => {
  const pathname = useLocation().pathname

  if(pathname === '/') { // Login page
    return (
      <div className="flex flex-col text-primary-content items-start">
        <h1 className="text-2xl font-bold text-center">City of Franklin</h1>
        <h2 className="text-xl ml-6 w-fit">{APP_TITLE}</h2>
      </div>
    )
  }

  return (
    <Link to={'/sites'} className="flex flex-col text-primary-content items-start">
      <h1 className="text-2xl font-bold text-center">City of Franklin</h1>
      <h2 className="text-xl ml-6 w-fit">{APP_TITLE}</h2>
    </Link>
  )
}

export const Buttons = () => {
  const pathname = useLocation().pathname

  if(pathname === '/') return null // Hide on login page

  return (
    <div className="flex gap-4">
      <ExpandedMenu />
      <MenuBtn />
    </div>
  )
}

const ExpandedMenu = () => {
  const { expanded } = useContext(HeaderCtx)

  if(!expanded) return null

  return (
    <>
      <HeaderLink href={'/sites'}>Sites</HeaderLink>
      <HeaderLink href={'/contacts'}>Contacts</HeaderLink>
      <InspectorsMenu />
      <EnforcementMenu />
      <CreateMenu />
    </>
  )
}

type HeaderLinkProps = { href: string, children: React.ReactNode }

const HeaderLink = (props: HeaderLinkProps) => {
  const pathname = useLocation().pathname

  const active = pathname === props.href

  return (
    <Link to={props.href} className={`btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none ${ active ? 'text-warning' : 'text-neutral-content' }`}>{props.children}</Link>
  )
}

const InspectorsMenu = () => {
  const pathname = useLocation().pathname

  const active = pathname.includes('/inspectors')

  const { data } = useGetInspectors()

  return (
    <NavDropdown 
      label={'Inspectors'}
      active={active}>
        {data?.data.map(inspector => {
          return (
            <InspectorMenuItem 
              key={`inspector-menu-${ inspector.slug }`}
              inspector={inspector} />
          )
        })}
    </NavDropdown>
  )
}

const InspectorMenuItem = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {

  return (
    <li key={`inspector-${ inspector.uuid }`}><Link to={`/inspectors/${ inspector.slug }`} className="hover:cursor-pointer hover:bg-neutral">{inspector.name}</Link></li>
  )
}

const EnforcementMenu = () => {
  const active = useIsEnforcmentPageActive()

  return (
    <NavDropdown 
      label={'Enforcement'}
      active={active}>
        <EnforcementMenuItem href={'/enforcement/violations'}>Construction Violations</EnforcementMenuItem>
        <EnforcementMenuItem href={'/enforcement/complaints'}>Complaints</EnforcementMenuItem>
        <EnforcementMenuItem href={'/enforcement/discharges'}>Illicit Discharges</EnforcementMenuItem>
    </NavDropdown>
  )
}

type EnforcementMenuItemProps = { href: string, children: React.ReactNode }

const EnforcementMenuItem = (props: EnforcementMenuItemProps) => {
  const pathname = useLocation().pathname

  const active = pathname.includes(props.href)

  return (
    <li><Link to={props.href} className={`hover:cursor-pointer hover:bg-neutral ${ active ? 'text-warning' : null }`}>{props.children}</Link></li>
  )
}

const CreateMenu = () => {
  const pathname = useLocation().pathname

  const active = pathname.includes('create')

  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <NavDropdown
      label={'Create'}
      active={active}>
        <CreateMenuItem href={'/create/site'}>Site</CreateMenuItem>
        <CreateMenuItem href={'/create/enforcement/violation'}>Construction Violation</CreateMenuItem>
        <CreateMenuItem href={'/create/enforcement/complaint'}>Complaint</CreateMenuItem>
        <CreateMenuItem href={'/create/enforcement/discharge'}>Illicit Discharge</CreateMenuItem>
        <CreateMenuItem href={'/create/contact'}>Contact</CreateMenuItem>
        <CreateMenuItem href={'/create/inspector'}>Inspector</CreateMenuItem>
    </NavDropdown>
  )
}

type CreateMenuItemProps = { href: string, children: React.ReactNode }

const CreateMenuItem = (props: CreateMenuItemProps) => {
  const pathname = useLocation().pathname

  const active = pathname.includes(props.href)

  return (
    <li><Link to={props.href} className={`hover:cursor-pointer hover:bg-neutral ${ active ? 'text-warning' : null }`}>{props.children}</Link></li>
  )
}

const MenuBtn = () => {
  const { expanded, dispatch } = useContext(HeaderCtx)

  return (
    <button 
      type="button"
      className="flex flex-col justify-center w-16 hover:cursor-pointer"
      onClick={() => dispatch({ type: 'TOGGLE_EXPANDED' })}>
        <img src={!expanded ? icon : activeIcon} alt="menu icon" className="m-auto w-3/4" />
    </button>
  )
}