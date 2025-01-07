import styles from './SiteHeader.module.css'

// Types
import { SiteHeaderProps } from "./types"

// Components
import { InspectorName } from './components'

function SiteHeader({ site }: SiteHeaderProps) {
  
  return (
    <div data-testid="site-header" className={styles.container}>
      <div className="flex flex-col">
        <h2 className={styles.siteHeader}>{site.name}</h2>
        <div className={!site.inactive ? styles.activeSite : styles.inactiveSite}>{!site.inactive ? 'Active Site' : 'Inactive Site'}</div>
      </div>
      <InspectorName name={site.Inspector?.name} />
    </div>
  )
}

export default SiteHeader