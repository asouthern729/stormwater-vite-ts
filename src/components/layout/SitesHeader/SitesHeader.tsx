import icon from '../../../assets/icons/pin/warning-pin.svg'
import styles from './SitesHeader.module.css'

function SitesHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Sites
        <img src={icon} alt="pin icon" className={styles.icon} />
      </div>
    </div>
  )
}

export default SitesHeader