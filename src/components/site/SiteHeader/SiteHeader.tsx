import icon from '../../../assets/icons/inspector/inspector.svg'
import styles from './SiteHeader.module.css'

// Types
import { SiteHeaderProps } from "./types"

function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <div className={styles.container}>
      <div className="flex flex-col">
        <h1 className={styles.siteHeader}>{site.name}</h1>
        <div className={!site.inactive ? styles.activeSite : styles.inactiveSite}>{!site.inactive ? 'Active Site' : 'Inactive Site'}</div>
      </div>
      {site.Inspector && (
        <div className={styles.inspector}>
          <img src={icon} alt="inspector icon" className="w-12" />
          <div>{site.Inspector.name}</div>
        </div>
      )}
    </div>
  )
}

export default SiteHeader