import { useContext, useState, memo } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './MapContainer.module.css'

// Types
import { MapContainerProps, MapContainerState } from './types'

// Components
import Map from '../Map/Map'
import BasemapSelector from '../BasemapSelector/BasemapSelector'
import Search from '../../search/Search/Search'

const MapContainer = memo(({ sites, type, zoom }: MapContainerProps) => {
  const { activePage } = useContext(AppContext)

  const [state, setState] = useState<MapContainerState>({ basemap: 'dark-gray-vector' })

  return (
    <div data-testid="map-container" className={styles.container}>

      {['Sites', 'Inspectors'].includes(activePage) && ( // Show search component on Sites and Inspectors pages
        <div className="absolute bottom-8 top-10 left-10 z-10 h-fit">
          <Search placeholder={'by site name, COF #, or permit..'} />
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