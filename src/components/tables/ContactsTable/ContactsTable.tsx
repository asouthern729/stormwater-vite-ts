import { useState, memo } from 'react'
import { useHandlePageData } from '../../../helpers'
import { setContactTableDataCell, setSitesTableData } from '.'
import styles from './ContactsTable.module.css'

// Types
import { Contact } from '../../../context/App/types'
import { ContactsTableProps, ContactsTableState } from './types'

// Components
import PrevPageBtn from '../../buttons/nav/PrevPageBtn/PrevPageBtn'
import NextPageBtn from '../../buttons/nav/NextPageBtn/NextPageBtn'

function ContactsTable({ contacts, handleRowClick }: ContactsTableProps) {
  const [state, setState] = useState<ContactsTableState>({ currentPage: 1 })

  const totalPages = Math.ceil(contacts.length / 20) // 20 results per page

  const pageData = useHandlePageData(contacts, state.currentPage) as Contact[]

  return (
    <div data-testid="contacts-table" className={styles.container}>

      <div className="flex justify-between items-end w-full">
        <div className="flex gap-4 ml-auto">
          <PrevPageBtn 
            handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))}
            disabled={state.currentPage === 1} />
          <NextPageBtn 
            handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))}
            disabled={state.currentPage === totalPages} />
        </div>
      </div>

      <table className="table table-sm text-neutral-content">
        <thead>
          <tr>
            <th className="text-lg">Contact</th>
            <th className="text-lg text-center">Sites</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(contact => {
            return (
              <tr key={`contacts-table-${ contact.contactId }`} data-uuid={contact.uuid} onClick={handleRowClick}>
                {setContactTableDataCell(contact)}
                {setSitesTableData(contact)}
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}

export default memo(ContactsTable)