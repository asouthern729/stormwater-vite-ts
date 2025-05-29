import { useRef, memo } from 'react'
import { useScrollToFormRef } from '@/helpers/hooks'
import { useSetContactsTableData } from './hooks'
import styles from './ContactsContainer.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import ContactsTable from '../../tables/ContactsTable'
import { CreateBtn } from '@/components/enforcement/containers/ViolationsContainer/components'
import GetContact from '../../forms/get/GetContact'
import * as Components from './components'

function ContactsContainer({ contacts }: { contacts: AppTypes.ContactInterface[] }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)

  const tableData = useSetContactsTableData(contacts)

  return (
    <div className="flex flex-col gap-10">
      <div className={styles.container}>
        <CreateBtn href={'/create?formType=createContact'}>
          Create New Contact
        </CreateBtn>
        <h2 className={styles.header}>Site Contacts</h2>

        <ContactsTable contacts={tableData} />
      </div>

      <Components.UpdateForm formRef={formRef}>
        <GetContact />
      </Components.UpdateForm>
    </div>
  )
}

export default memo(ContactsContainer)