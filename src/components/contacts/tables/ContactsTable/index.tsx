import { memo } from 'react'
import { useHandleTableData } from './hooks'
import styles from './ContactsTable.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { CreateBtn } from '@/components/enforcement/containers/ViolationsContainer/components'
import * as Components from './components'

function ContactsTable({ contacts }: { contacts: AppTypes.ContactInterface[] }) {
  const tableData = useHandleTableData(contacts)

  return (
    <div className="flex flex-col gap-10">
      <div className={styles.container}>
        <CreateBtn href={'/create?formType=createContact'}>
          Create New Contact
        </CreateBtn>
        <h2 className={styles.header}>Site Contacts</h2>

        <Components.ContactsTable tableData={tableData} />

      </div>
    </div>
  )
}

export default memo(ContactsTable)