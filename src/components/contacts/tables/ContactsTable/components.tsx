import { useContext } from 'react'
import { Link } from 'react-router'
import ContactsCtx from '../../context'
import { useOnTableRowClick, useHandleNavBtns } from './hooks'

// Types
import { ContactInterface, SiteInterface } from "@/context/App/types"

// Components
import PrevPageBtn from '@/components/layout/nav/buttons/PrevPageBtn/PrevPageBtn'
import NextPageBtn from '@/components/layout/nav/buttons/NextPageBtn/NextPageBtn'

export const ContactsTable = ({ tableData }: { tableData: ContactInterface[] }) => {

  return (
    <div className="flex flex-col gap-6 items-center w-full">
    
      <div className="flex justify-between items-end w-full">
        {/* <ShowClosedCheckbox /> */}
        <PageNavBtns />
      </div>    

      <table className="table table-sm text-neutral-content">
        <TableHeaders />
        <TableBody tableData={tableData} />
      </table>
      
    </div>
  )
}

export const PageNavBtns = () => { // Page nav buttons
  const { currentPage, totalPages } = useContext(ContactsCtx)
  
  const { handlePrevBtn, handleNextBtn } = useHandleNavBtns()

  return (
    <div className="flex gap-4 ml-auto">
      <PrevPageBtn 
        onClick={handlePrevBtn}
        disabled={currentPage === 1} />
      <NextPageBtn 
        onClick={handleNextBtn}
        disabled={!totalPages || currentPage === totalPages} />
    </div>
  )
}

const TableBody = ({ tableData }: { tableData: ContactInterface[] }) => { // Contacts table body

  return (
    <tbody>
      {tableData.map(contact => <TableRow contact={contact} />)}
    </tbody>
  )
  
}

const TableHeaders = () => {

  return (
    <thead>
      <tr>
        <th className="text-lg">Contact</th>
        <th className="text-lg text-center">Sites</th>
      </tr>
    </thead>
  )
}

const TableRow = ({ contact }: { contact: ContactInterface }) => {
  const onTableRowClick = useOnTableRowClick(contact.uuid)

  return (
    <tr onClick={onTableRowClick}>
      <ContactTableData contact={contact} />
      <ContactSitesTableData sites={contact.SiteContacts?.map(site => site.Site) || []} />
    </tr>
  )
}

const ContactTableData = ({ contact }: { contact: ContactInterface }) => {

  return (
    <td>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{contact.name}</span>
        <span>{contact.company}</span>
        <ContactPhone phone={contact.phone} />
        <ContactEmail email={contact.email} />
      </div>
    </td>
  )
}

const ContactPhone = ({ phone }: { phone: string | null }) => {
  if(!phone) return null

  return (
    <a href={`tel:${ phone }`}>{phone}</a>
  )
}

const ContactEmail = ({ email }: { email: string | null }) => {
  if(!email) return null

  return (
    <a href={`mailto:${ email }`}>{email}</a>
  )
}

const ContactSitesTableData = ({ sites }: { sites: (SiteInterface|undefined)[] }) => {

  return (
    <td>
      <div className="flex flex-col items-center">
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

const ContactSite = ({ site }: { site: SiteInterface }) => {

  return (
    <Link to={`/sites/site/${ site.uuid }`}>{site.name}</Link>
  )
}