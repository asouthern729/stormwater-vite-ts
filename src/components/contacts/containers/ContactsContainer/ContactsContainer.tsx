import { useState, useRef, memo } from 'react'
import { useScrollToFormRef } from '../../../../helpers/hooks'
import { useSetContactsData } from './hooks'
import { handleContactsTableRowClick } from './utils'
import styles from './ContactsContainer.module.css'

// Types
import { ContactsContainerProps, ContactsContainerState } from './types'

// Components
import Search from '../../../search/Search/Search'
import ContactsTable from '../../tables/ContactsTable/ContactsTable'
import { Form, CreateBtn } from './components'

function ContactsContainer({ contacts }: ContactsContainerProps) {
  const [state, setState] = useState<ContactsContainerState>({ formUUID: undefined })

  const contactsArray = useSetContactsData(contacts)

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="contacts-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <CreateBtn />

        <div className={styles.header}>Site Contacts</div>

        <div className={styles.search}>
          <Search placeholder={'by contact name or company..'} />
        </div>

        <ContactsTable
          contacts={contactsArray}
          handleRowClick={handleContactsTableRowClick(setState)} />
      </div>

      <Form
        formUUID={state.formUUID}
        formRef={formRef}
        setState={setState} />
    </div>
  )
}

export default memo(ContactsContainer)