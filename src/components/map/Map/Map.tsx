import { useRef, useEffect, useState, useContext, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../../context/App/AppContext'
import MapContext from '../../../context/Map/MapContext'
import { setViewType } from '.'
import styles from './Map.module.css'

// Types
import { MapProps, MapState, MapProperties } from './types'

const Map = ({ sites, basemap, type, zoom }: MapProps) => {
  const { hoveredSite } = useContext(AppContext)
  const { newSite, updateSite, mapDispatch } = useContext(MapContext)

  const [state, setState] = useState<MapState>({ view: null })

  const navigate = useNavigate()

  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mapProperties: MapProperties = { setState, sites, basemap, navigate, hoveredSite, zoom, mapDispatch, newSite, updateSite }

    setViewType(type || 'default', mapRef.current, mapProperties)

    return () => {
      if(state.view) {
        state.view.destroy()
      }
    }
  }, [sites, basemap, hoveredSite, newSite, updateSite])

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.mapView}></div>
    </div>
  )
}

export default memo(Map)