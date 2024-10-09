import { SiteContact } from "../../../context/App/types"

export interface SiteContactsTableProps { // SiteContactsTable props
  siteContacts: SiteContact[]
}

export interface SetSiteContactsTableDataProps { // setSiteContactsTable fn props
  siteContacts: SiteContact[]
}

export interface SetAllSiteContactsProps { // setAllSiteContacts fn props
  siteContacts: SiteContact[]
}

export interface SiteContactObj {
  name: string
  company: string
  role: SiteContactRole | undefined
  phone: string
  email: string
  order: number
}

export type SiteContactRole =
  | "Primary"
  | "Contractor"
  | "Inspector"
  | "Other"