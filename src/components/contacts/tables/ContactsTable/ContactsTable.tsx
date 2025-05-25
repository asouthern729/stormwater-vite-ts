import { useState, memo } from 'react'
import { useHandlePageData } from '../../../../helpers/hooks'
import styles from './ContactsTable.module.css'

// Types
import { Contact } from '../../../../context/App/types'
import { ContactsTableProps, ContactsTableState } from './types'

// Components
import { PageBtns, TableBody } from './components'

function ContactsTable({ contacts, handleRowClick }: ContactsTableProps) {
  const [state, setState] = useState<ContactsTableState>({ currentPage: 1 })

  const totalPages = Math.ceil(contacts.length / 20) // 20 results per page

  const pageData = useHandlePageData(contacts, state.currentPage) as Contact[]

  return (
    <div data-testid="contacts-table" className={styles.container}>

      <PageBtns 
        currentPage={state.currentPage}
        totalPages={totalPages}
        setState={setState} />

      <table className="table table-sm text-neutral-content">
        <thead>
          <tr>
            <th className="text-lg">Contact</th>
            <th className="text-lg text-center">Sites</th>
          </tr>
        </thead>
        <TableBody
          contacts={pageData}
          handleRowClick={handleRowClick} />
      </table>

      <PageBtns 
        currentPage={state.currentPage}
        totalPages={totalPages}
        setState={setState} />

    </div>
  )
}

export default memo(ContactsTable)