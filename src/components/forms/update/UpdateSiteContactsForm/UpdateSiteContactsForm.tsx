import styles from '../../Forms.module.css'

// Types
import { SiteContactsInputs } from './components'

function UpdateSiteContactsForm() {

  return (
    <div className={styles.body}>
      <h2 className={styles.subtitle}>Site Contacts</h2>

      <SiteContactsInputs />

    </div>
  )
}

export default UpdateSiteContactsForm