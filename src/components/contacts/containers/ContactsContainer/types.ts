// Types
import { Dispatch, SetStateAction } from 'react'
import { Contact } from "../../../../context/App/types"

export interface ContactsContainerProps { // ContactsContainer props
  contacts: Contact[]
}

export interface ContactsContainerState { // ContactsContainer state
  formUUID?: string | undefined
}

export interface UseSetContactsDataProps { // useSetContactsData hook props
  contacts: Contact[]
}

export interface HandleContactsTableRowClickProps { // handleContactsTableRowClick fn props
  setState: Dispatch<SetStateAction<ContactsContainerState>>
}