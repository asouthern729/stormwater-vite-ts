import { formatPhone } from "../../../helpers"

// Types
import { SiteContact } from "../../../context/App/types"
import { SetSiteContactsTableDataProps, SetAllSiteContactsProps, SiteContactObj } from "./types"
import { ReactElement } from "react"

export const setSiteContactsTableData = (siteContacts: SetSiteContactsTableDataProps['siteContacts']): SiteContactObj[] => {
  const siteContactsArray: SiteContactObj[] = []

  siteContacts.forEach(contact => {
    let obj: SiteContactObj = {
      name: contact.Contact.name,
      company: contact.Contact.company,
      role: undefined,
      phone: contact.Contact.phone,
      email: contact.Contact.email,
      order: 0
    }

    setRole(contact, obj)

    siteContactsArray.push(obj)
  })

  return siteContactsArray.sort(contact => contact.order)
}

export const setAllSiteContacts = (siteContacts: SetAllSiteContactsProps['siteContacts']): string[] => { // Return array with all site contact emails
  const emailArray: string[] = siteContacts.map(contact => {
    return contact.Contact.email
  })

  return emailArray
}

export const setContactTableDataCell = (contact: SiteContactObj): ReactElement => { // Set contact table data cell
  const phone = formatPhone(contact.phone)
  
  return (
    <td className="flex flex-col">
      <div className="font-extrabold">{contact.name}</div>
      <div>{contact.company}</div>
      <a href={`tel:${ phone }`} className="hover:text-info">{phone}</a>
      <a href={`mail:${ contact.email }`} className="hover:text-info">{contact.email}</a>
    </td>
  )
}

const setRole = (siteContact: SiteContact, obj: SiteContactObj): SiteContactObj => {
  if(siteContact.isPrimary) { // Primary
    obj.role = 'Primary'
    obj.order = 0

    return obj
  }

  if(siteContact.isContractor) { // Contactor
    obj.role = 'Contractor'
    obj.order = 1

    return obj
  }

  if(siteContact.isInspector) { // Inspector
    obj.role = 'Inspector'
    obj.order = 2

    return obj
  }

  obj.role = 'Other' // Other
  obj.order = 3

  return obj
}