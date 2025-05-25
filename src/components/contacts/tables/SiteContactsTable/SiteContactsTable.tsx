import { memo } from 'react'
import { setSiteContactsTableData, setAllSiteContacts } from './utils'
import styles from './SiteContactsTable.module.css'

// Types
import { SiteContactsTableProps } from "./types"

// Components
import { TableBody } from './components'

function SiteContactsTable({ siteContacts }: SiteContactsTableProps) {
  const tableData = setSiteContactsTableData(siteContacts)

  const allContacts = setAllSiteContacts(siteContacts)

  return (
    <div data-testid="site-contacts-table" className={styles.container}>

      <div className={styles.header}>Site Contacts</div>

      <table className="table table-xs text-neutral-content mr-auto">
        <thead>
          <tr>
            <th>Contact</th>
            <th>Role</th>
          </tr>
        </thead>
        <TableBody siteContacts={tableData} />
      </table>

      <a href={`mailto:${ allContacts.join(';') }`} className={styles.emailAll}>Email All Site Contacts</a>

    </div>
  )
}

export default memo(SiteContactsTable)