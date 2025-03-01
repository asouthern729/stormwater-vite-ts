import { useRef,  memo } from 'react'
import { useSetMapView } from './hooks'
import styles from './Map.module.css'

// Types
import { MapProps } from './types'

const Map = ({ sites, type, zoom }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useSetMapView(mapRef, sites, type, zoom)

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.mapView}></div>
    </div>
  )
}

export default memo(Map)