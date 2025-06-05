import { useContext } from 'react'
import { Link } from 'react-router'
import ContactsCtx from '../../context'
import { useHandleNavBtns, useOnTableRowClick } from './hooks'
import { formatPhone } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { FormProps } from '@/components/enforcement/containers/ViolationsContainer/components'

// Components
import Search from '../../search/Search'
import FormContainer from "@/components/form-elements/FormContainer"
import PrevPageBtn from '@/components/layout/nav/buttons/PrevPageBtn'
import NextPageBtn from '@/components/layout/nav/buttons/NextPageBtn'

export const ContactsTable = ({ contacts }: { contacts: AppTypes.ContactInterface[] }) => {

  return (
      <div className="flex flex-col gap-6 items-center">
  
        <div className="flex justify-between items-end mt-10 mb-4 w-full">
          <Search />
          <div className="flex items-end gap-4">
            <ShowActiveCheckbox>Show Inactive:</ShowActiveCheckbox>
            <div className="translate-y-7"><PageNavBtns /></div>
          </div>
        </div>    
  
        <table className="table text-neutral-content">
          <TableHeaders />
          <TableBody tableData={contacts} />
        </table>
        
        <div className="ml-auto">
          <PageNavBtns />
        </div>
      </div>
    )
}

export const UpdateForm = (props: FormProps) => { // Update form
  const { formUUID } = useContext(ContactsCtx)
  
  if(!formUUID) return null

  return (
    <div ref={props.formRef}>
      <FormContainer>
        {props.children}
      </FormContainer>
    </div>
  )
}

export const PageNavBtns = () => { // Page nav buttons
  const { currentPage, totalPages } = useContext(ContactsCtx)
  
  const { handlePrevBtn, handleNextBtn, label } = useHandleNavBtns()

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex gap-4 ml-auto">
        <PrevPageBtn 
          onClick={handlePrevBtn}
          disabled={currentPage === 1} />
        <NextPageBtn 
          onClick={handleNextBtn}
          disabled={!totalPages || currentPage === totalPages} />
      </div>
      <small className="text-neutral-content font-[play] uppercase">{label}</small>
    </div>
  )
}

const TableBody = ({ tableData }: { tableData: AppTypes.ContactInterface[] }) => { // Contacts table body

  return (
    <tbody>
      {tableData.map(contact => <TableRow contact={contact} />)}
    </tbody>
  )
  
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-xl text-warning font-[play] uppercase border-b-2 border-warning">
        <th>Contact</th>
        <th>Sites</th>
      </tr>
    </thead>
  )
}

const TableRow = ({ contact }: { contact: AppTypes.ContactInterface }) => {
  const onTableRowClick = useOnTableRowClick(contact.uuid)

  return (
    <tr 
      onClick={onTableRowClick}
      className="border-b-1 border-neutral-content/50">
        <ContactTableData contact={contact} />
        <ContactSitesTableData sites={contact.SiteContacts?.map(site => site.Site) || []} />
    </tr>
  )
}

const ContactTableData = ({ contact }: { contact: AppTypes.ContactInterface }) => {

  return (
    <td>
      <div className="flex flex-col font-[play] py-4">
        <span className="text-2xl font-bold">{contact.name}</span>
        <span className="italic">{contact.company}</span>
        <ContactPhone phone={contact.phone} />
        <ContactEmail email={contact.email} />
      </div>
    </td>
  )
}

const ContactPhone = ({ phone }: { phone: string | null }) => {
  if(!phone) return null

  return (
    <a href={`tel:${ phone }`} className="hover:text-warning" title={`Call ${ formatPhone(phone) }`}>tel: {formatPhone(phone)}</a>
  )
}

const ContactEmail = ({ email }: { email: string | null }) => {
  if(!email) return null

  return (
    <a href={`mailto:${ email }`} className="hover:text-warning" title={`Email ${ email }`}>mail: {email}</a>
  )
}

const ContactSitesTableData = ({ sites }: { sites: (AppTypes.SiteInterface|undefined)[] }) => {

  return (
    <td>
      <div className="flex flex-col py-4">
        {sites.map(site => {
          if(site) {
            return (
              <ContactSite
                key={`contact-site-${ site.uuid }`}
                site={site} />
            )
          }
        })}
      </div>
    </td>
  )
}

const ContactSite = ({ site }: { site: AppTypes.SiteInterface }) => {

  return (
    <Link to={`/sites/site/${ site.uuid }`} className="hover:text-warning">{site.name}</Link>
  )
}

export const ShowActiveCheckbox = ({ children }: { children: React.ReactNode }) => { // Show active contacts only checkbox
  const { showActiveContactsOnly, dispatch } = useContext(ContactsCtx)

  return (
    <div className="flex gap-2 text-neutral-content w-fit">
      <label className="font-[play] uppercase">{children}</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={showActiveContactsOnly}
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_ACTIVE_CONTACTS_ONLY' })} />
    </div>
  )
}