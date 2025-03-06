import { useContext, memo } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './MapContainer.module.css'

// Types
import { MapContainerProps } from './types'

// Components
import Map from '../Map/Map'
import BasemapSelector from '../BasemapSelector/BasemapSelector'
import { MapSearch } from './components'

const MapContainer = memo(({ sites, type, zoom }: MapContainerProps) => {
  const { activePage } = useContext(AppContext)

  return (
    <div data-testid="map-container" className={styles.container}>

      <MapSearch visible={['Sites', 'Inspectors'].includes(activePage)} />

        <div className="absolute top-4 right-4 z-10">
          <BasemapSelector />
        </div>

        <Map
          sites={sites}
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