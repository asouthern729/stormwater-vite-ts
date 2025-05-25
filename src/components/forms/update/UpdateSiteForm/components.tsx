import { useUpdateSiteFormContext } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { Site } from "../../../../context/App/types"

// Components
import MapContainer from "../../../map/MapContainer"

export const Map = ({ site }: { site: Site }) => { // Map input

  return (
    <div className={styles.mapDiv}>
      <MapContainer
        sites={[site]}
        type={'update'}
        zoom={16} />
    </div>
  )
}

export const InactiveCheckbox = () => { // Inactive site checkbox
  const methods = useUpdateSiteFormContext()

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <label htmlFor="inactiveSite" className={styles.checkboxLabel}>Inactive Site</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        { ...methods.register('inactive') } />
    </div>
  )
}