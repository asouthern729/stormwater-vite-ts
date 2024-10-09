import styles from './MapLegend.module.css'

// Icons
import warningPinIcon from '../../../assets/icons/pin/warning-pin.svg'
import errorPinIcon from '../../../assets/icons/pin/error-pin.svg'
import neutralContentPinIcon from '../../../assets/icons/pin/neutral-content-pin.svg'

function MapLegend() {
  return (
    <div className={styles.container}>
      <div className="flex flex-col gap-1 items-center">
        <img src={warningPinIcon} alt="warning pin icon" className="w-6" />
        <small>Active Site</small>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <img src={errorPinIcon} alt="error pin icon" className="w-6" />
        <small>Open Issue</small>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <img src={neutralContentPinIcon} alt="neutral content pin icon" className="w-6" />
        <small>Inactive Site</small>
      </div>
    </div>
  )
}

export default MapLegend