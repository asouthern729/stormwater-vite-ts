import { useContext } from 'react'
import MapContext from '../../../context/Map/MapContext'
import styles from './BasemapSelector.module.css'

// Types
import { Basemap } from '../MapContainer/types'

function BasemapSelector() {
  const { basemap, mapDispatch } = useContext(MapContext)

  return (
    <div data-testid="basemap-selector" className="flex flex-col">
      <label htmlFor="basemap selector" className={styles.label}>Basemap</label>
      <div className={styles.container}>
        <select 
          value={basemap}
          onChange={(e) => mapDispatch({ type: 'SET_BASEMAP', payload: e.currentTarget.value as Basemap })}
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