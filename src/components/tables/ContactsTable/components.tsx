import { setContactTableDataCell, setSitesTableData } from './utils'

// Types
import { Dispatch, SetStateAction } from "react"
import { Contact } from "../../../context/App/types"
import { ContactsTableState } from './types'

// Components
import PrevPageBtn from "../../buttons/nav/PrevPageBtn/PrevPageBtn"
import NextPageBtn from "../../buttons/nav/NextPageBtn/NextPageBtn"

export const PageBtns = ({ currentPage, totalPages, setState }: { currentPage: number, totalPages: number, setState: Dispatch<SetStateAction<ContactsTableState>> }) => { // Page buttons

  return (
    <div className="flex justify-between items-end w-full">
      <div className="flex gap-4 ml-auto">
        <PrevPageBtn 
          handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))}
          disabled={currentPage === 1} />
        <NextPageBtn 
          handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))}
          disabled={currentPage === totalPages} />
      </div>
    </div>
  )
}

export const TableBody = ({ contacts, handleRowClick }: { contacts: Contact[], handleRowClick: (event: React.MouseEvent<HTMLTableRowElement>) => void}) => { // Contacts table body

  return (
    <tbody>
      {contacts.map(contact => {
        return (
          <tr key={`contacts-table-${ contact.contactId }`} data-uuid={contact.uuid} onClick={handleRowClick}>
            {setContactTableDataCell(contact)}
            {setSitesTableData(contact)}
          </tr>
        )
      })}
    </tbody>
  )
  
}