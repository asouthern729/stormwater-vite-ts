import{  useSetSitesHeaderLabel } from '.'
import icon from '../../../assets/icons/pin/warning-pin.png'
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