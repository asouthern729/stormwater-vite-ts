import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"
import MapContext from "../../../context/Map/MapContext"
import { setViewType } from './utils'

// Types
import { RefObject } from "react"
import { Site } from "../../../context/App/types"
import { MapType } from "../MapContainer/types"
import { MapState, MapProperties } from "./types"

export const useSetMapView = (mapRef: RefObject<HTMLDivElement>, sites: Site[], type: MapType | undefined, zoom: number | undefined) => {
  const { hoveredSite } = useContext(AppContext)
  const { basemap, newSite, updateSite, mapDispatch } = useContext(MapContext)

  const [state, setState] = useState<MapState>({ view: null })

  const navigate = useNavigate()

  useEffect(() => {
    const mapProperties: MapProperties = { setState, sites, basemap, navigate, hoveredSite, zoom, mapDispatch, newSite, updateSite }

    setViewType(type || 'default', mapRef.current, mapProperties)

    return () => {
      if(state.view) {
        state.view.destroy()
      }
    }
  }, [sites, basemap, hoveredSite, newSite, updateSite, mapDispatch, mapRef, navigate, type, zoom])
}