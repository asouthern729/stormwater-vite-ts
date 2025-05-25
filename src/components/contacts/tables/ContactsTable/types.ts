// Types
import { MouseEvent } from "react"
import { Contact } from "../../../../context/App/types"

export interface ContactsTableProps { // ContactsTable props
  contacts: Contact[]
  handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void
}

export interface ContactsTableState { // ContactsTable state object
  currentPage: number
}

export interface SetTableDataProps { // setContactTableData and setSitesTableData fn props
  contact: Contact
}