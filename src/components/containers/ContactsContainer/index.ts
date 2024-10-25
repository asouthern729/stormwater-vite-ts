import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { MouseEvent } from "react"
import { Contact } from "../../../context/App/types"
import { UseSetContactsDataProps, HandleContactsTableRowClickProps } from "./types"

export const useSetContactsData = (contacts: UseSetContactsDataProps['contacts']): Contact[] => { // Set data for contacts table
  const { searchValue } = useContext(AppContext)

  let contactsArray: Contact[] = []

  if(searchValue) {
    const regex = new RegExp(searchValue, 'i')

    contactsArray = contacts.filter(contact => 
      Object.keys(contact).some(prop => 
        ['name', 'company'].includes(prop) && regex.test(contact[prop] as string)
      )
    )
  } else contactsArray = contacts

  return contactsArray
}

export const handleContactsTableRowClick = (setState: HandleContactsTableRowClickProps['setState']) => (event: MouseEvent<HTMLTableRowElement>): void => { // Handle row click - open form
  const { uuid } = event.currentTarget.dataset

  setState(prevState => ({ ...prevState, formUUID: uuid }))
}