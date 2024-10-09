import styles from './BasemapSelector.module.css'

// Types
import { Basemap } from '../MapContainer/types'
import { BasemapSelectorProps } from './types'

function BasemapSelector({ basemap, setState }: BasemapSelectorProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="basemap selector" className={styles.label}>Basemap</label>
      <div className={styles.container}>
        <select 
          value={basemap}
          onChange={(e) => setState({ basemap: e.currentTarget.value as Basemap })}
          className="select select-sm select-bordered text-neutral-content w-full">
            <option value="dark-gray-vector" className={styles.option}>Dark Gray</option>
            <option value="streets-vector" className={styles.option}>Streets</option>
            <option value="streets-night-vector" className={styles.option}>Streets Night</option>
            <option value="satellite" className={styles.option}>Satellite</option>
        </select>
      </div>
    </div>
  )
}

export default BasemapSelector