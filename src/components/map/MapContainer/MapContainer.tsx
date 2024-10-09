import { useState, memo } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './MapContainer.module.css'

// Types
import { MapContainerProps, MapContainerState } from './types'

// Components
import Map from '../Map/Map'
import BasemapSelector from '../BasemapSelector/BasemapSelector'
import Search from '../../search/Search/Search'

const MapContainer = memo(({ sites, type, zoom }: MapContainerProps) => {
  const [state, setState] = useState<MapContainerState>({ basemap: 'dark-gray-vector' })

  const location = useLocation()

  return (
    <div className={styles.container}>
      {location.pathname === '/' && ( // Show search component on Sites page
        <div className="absolute bottom-8 top-10 left-10 z-10 h-fit">
          <Search />
        </div>
      )}
      <div className="absolute top-4 right-4 z-10">
        <BasemapSelector 
          basemap={state.basemap} 
          setState={setState} />
      </div>
      <Map
        sites={sites}
        basemap={state.basemap}
        type={type}
        zoom={zoom} />
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.sites === nextProps.sites &&
    prevProps.type === nextProps.type &&
    prevProps.zoom === nextProps.zoom
  )
})

export default MapContainer