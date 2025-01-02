import { useContext, useState, memo } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './MapContainer.module.css'

// Types
import { MapContainerProps, MapContainerState } from './types'

// Components
import Map from '../Map/Map'
import BasemapSelector from '../BasemapSelector/BasemapSelector'
import { MapSearch } from './components'

const MapContainer = memo(({ sites, type, zoom }: MapContainerProps) => {
  const { activePage } = useContext(AppContext)

  const [state, setState] = useState<MapContainerState>({ basemap: 'dark-gray-vector' })

  return (
    <div data-testid="map-container" className={styles.container}>

      <MapSearch visible={['Sites', 'Inspectors'].includes(activePage) ? true : false} />

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