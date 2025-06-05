import { memo } from 'react'
import styles from './SiteContactsTable.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function SiteContactsTable({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) {

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Site Contacts</h2>

      <Components.Table siteContacts={siteContacts} />
      <Components.EmailContacts siteContacts={siteContacts} />

    </div>
  )
}

export default memo(SiteContactsTable)