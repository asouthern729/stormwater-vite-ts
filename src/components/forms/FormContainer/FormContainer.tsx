import styles from './FormContainer.module.css'

// Icons
import cofIcon from '../../../assets/icons/cof/cof.svg'

// Types
import { FormContainerProps } from './types'

// Components
import { MapProvider } from '../../../context/Map/MapContext'

function FormContainer({ children }: FormContainerProps) {
  return (
    <div data-testid="form-container" className={styles.container}>
      <img src={cofIcon} className={styles.icon} />
      <MapProvider>
        {children}
      </MapProvider>
    </div>
  )
}

export default FormContainer