import { useState, useRef, memo } from 'react'
import { useScrollToFormRef } from '../../../helpers'
import { useSetContactsData, handleContactsTableRowClick } from '.'
import styles from './ContactsContainer.module.css'

// Types
import { ContactsContainerProps, ContactsContainerState } from './types'

// Components
import CreateLink from '../../buttons/nav/CreateLink/CreateLink'
import Search from '../../search/Search/Search'
import ContactsTable from '../../tables/ContactsTable/ContactsTable'
import FormContainer from '../../forms/FormContainer/FormContainer'
import GetContact from '../../forms/get/GetContact/GetContact'

function ContactsContainer({ contacts }: ContactsContainerProps) {
  const [state, setState] = useState<ContactsContainerState>({ formUUID: undefined })

  const contactsArray = useSetContactsData(contacts)

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="contacts-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <div className="absolute top-5 right-6">
          <CreateLink
            label={'Create New Contact'}
            location={'/create?formType=createContact'} />
        </div>

        <div className={styles.header}>Site Contacts</div>

        <div className="ml-10">
          <Search placeholder={'by contact name or company..'} />
        </div>

        <ContactsTable
          contacts={contactsArray}
          handleRowClick={handleContactsTableRowClick(setState)} />
      </div>

      {state.formUUID && (
        <div ref={formRef}>
          <FormContainer key={`contact-${ state.formUUID }`}>
            <GetContact
              uuid={state.formUUID}
              resetState={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
          </FormContainer>
        </div>
      )}
    </div>
  )
}

export default memo(ContactsContainer)