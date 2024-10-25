import styles from './MapLegend.module.css'

// Types
import { MapLegendProps } from './types'

// Icons
import warningPinIcon from '../../../assets/icons/pin/warning-pin.svg'
import errorPinIcon from '../../../assets/icons/pin/error-pin.svg'
import neutralContentPinIcon from '../../../assets/icons/pin/neutral-content-pin.svg'

function MapLegend({ sites }: MapLegendProps) {
  return (
    <div className={styles.container}>

      <div className="flex flex-col gap-1 items-center">
        <img src={warningPinIcon} alt="warning pin icon" className="w-6" />
        <div className="flex flex-col items-center">
          <small>Active Site</small>
          <small>({sites.filter(site => !site.inactive).length})</small>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <img src={errorPinIcon} alt="error pin icon" className="w-6" />
        <div className="flex flex-col items-center">
          <small>Open Issue</small>
          <small>({sites.filter(site => site.hasOpenViolation || site.hasOpenComplaint || site.hasOpenIllicitDischarge).length})</small>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <img src={neutralContentPinIcon} alt="neutral content pin icon" className="w-6" />
        <div className="flex flex-col items-center">
          <small>Inactive Site</small>
          <small>({sites.filter(site => site.inactive).length})</small>
        </div>
      </div>
      
    </div>
  )
}

export default MapLegend