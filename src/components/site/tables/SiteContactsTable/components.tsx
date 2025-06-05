import { formatPhone } from "@/helpers/utils"
import { setSiteContactsTableData, setAllSiteContacts } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

type SiteContactRoleType = 
  | "Primary"
  | "Contractor"
  | "Inspector"
  | "Other"

export type SiteContactType = { name: string, company: string | null, role: SiteContactRoleType | undefined, phone: string | null, email: string | null, order: number }

export const Table = ({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) => {
  const tableData = setSiteContactsTableData(siteContacts)

  return (
    <table className="table table-xs text-neutral-content mr-auto">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

export const EmailContacts = ({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) => {
  const allContacts = setAllSiteContacts(siteContacts)

  return (
    <a href={`mailto:${ allContacts.join(';') }`} className="text-warning font-[play] uppercase hover:text-neutral-content">Email All Site Contacts</a>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr>
        <th className="text-warning font-[play]">Contact</th>
        <th className="text-warning font-[play]">Role</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: SiteContactType[] }) => { // Site contacts table body

  return (
    <tbody>
      {tableData.map(siteContact=> {
        return (
          <TableRow 
            key={`site-contact-${ siteContact.name }`}
            siteContact={siteContact} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ siteContact }: { siteContact: SiteContactType }) => {
  
  return (
    <tr>
      <ContactTableData siteContact={siteContact} />
      <td>{siteContact.role}</td>
    </tr>
  )
}

const ContactTableData = ({ siteContact }: { siteContact: SiteContactType }) => { // Contact table data
  const phone = siteContact.phone ? formatPhone(siteContact.phone) : undefined

  return (
    <td className="flex flex-col whitespace-nowrap">
      <div className="font-extrabold">{siteContact.name}</div>
      <div>{siteContact.company}</div>
      <a href={`tel:${ phone }`} className="hover:text-info">{phone}</a>
      <a href={`mail:${ siteContact.email }`} className="hover:text-info">{siteContact.email}</a>
    </td>
  )
}