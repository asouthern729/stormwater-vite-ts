import { useContext } from "react"
import ContactsCtx from "../../context"

// Types
import { ContactInterface } from "@/context/App/types"

export const useSetContactsTableData = (contacts: ContactInterface[]) => { // Set data for contacts table
  const { searchValue } = useContext(ContactsCtx)
  
  useSetTotalPages(contacts.length)

  let contactsArray: ContactInterface[] = []

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

const useSetTotalPages = (count: number) => { // Set total pages to ctx
  const { dispatch } = useContext(ContactsCtx)

  dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(count / 20) })
}