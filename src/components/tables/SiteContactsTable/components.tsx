import { formatPhone } from "../../../helpers"

// Types
import { SiteContactObj } from "./types"

export const TableBody = ({ siteContacts }: { siteContacts: SiteContactObj[] }) => { // Site contacts table body

  return (
    <>
      {siteContacts.map((contact, index) => {
        return (
          <tr key={`site-contacts-table-row-${ index }`} className="hover:cursor-default">
            <ContactTableData contact={contact} />
            <td>{contact.role}</td>
          </tr>
        )
      })}
    </>
  )
}

const ContactTableData = ({ contact }: { contact: SiteContactObj }) => { // Contact table data
  const phone = contact.phone ? formatPhone(contact.phone) : undefined

  return (
    <td className="flex flex-col">
      <div className="font-extrabold">{contact.name}</div>
      <div>{contact.company}</div>
      <a href={`tel:${ phone }`} className="hover:text-info">{phone}</a>
      <a href={`mail:${ contact.email }`} className="hover:text-info">{contact.email}</a>
    </td>
  )
}