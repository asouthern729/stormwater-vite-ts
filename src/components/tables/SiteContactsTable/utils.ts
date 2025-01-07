// Types
import { SiteContact } from "../../../context/App/types"
import { SetSiteContactsTableDataProps, SetAllSiteContactsProps, SiteContactObj } from "./types"

export const setSiteContactsTableData = (siteContacts: SetSiteContactsTableDataProps['siteContacts']): SiteContactObj[] => {
  const siteContactsArray: SiteContactObj[] = []

  siteContacts.forEach(contact => {
    const obj: SiteContactObj = {
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
    return contact.Contact?.email as string
  })

  return emailArray
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