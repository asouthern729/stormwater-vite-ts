import icon from '../../../assets/icons/pin/warning-pin.svg'
import { useSetSitesHeaderLabel } from './hooks'
import styles from './SitesHeader.module.css'

function SitesHeader() {
  const label = useSetSitesHeaderLabel()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {label}
        <img src={icon} alt="pin icon" className={styles.icon} />
      </div>
    </div>
  )
}

export default SitesHeader