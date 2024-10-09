import { setSiteContactsTableData, setAllSiteContacts , setContactTableDataCell} from '.'
import styles from './SiteContactsTable.module.css'

// Types
import { SiteContactsTableProps } from "./types"

function SiteContactsTable({ siteContacts }: SiteContactsTableProps) {
  const tableData = setSiteContactsTableData(siteContacts)

  const allContacts = setAllSiteContacts(siteContacts)

  return (
    <div className={styles.container}>

      <div className={styles.header}>Site Contacts</div>

      <table className="table table-xs text-neutral-content mr-auto">
        <thead>
          <tr>
            <th>Contact</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((obj, index) => {
            return (
              <tr key={`site-contacts-table-row-${ index }`} className="hover:cursor-default">
                <td>{setContactTableDataCell(obj)}</td>
                <td>{obj.role}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <a href={`mailto:${ allContacts.join(';') }`} className={styles.emailAll}>Email All Site Contacts</a>

    </div>
  )
}

export default SiteContactsTable