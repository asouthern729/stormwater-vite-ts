import { useContext, useEffect, useState } from "react"
import SiteCtx from "../../context"
import EnforcementCtx from "@/components/enforcement/context"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import { setSiteMarker } from "@/components/sites/containers/SitesContainer/utils"

// Types
import * as AppTypes from '@/context/App/types'

export const useSetSiteMapView = (mapRef: React.RefObject<HTMLDivElement>, site: AppTypes.SiteInterface) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, site, setState)

  useSetMapGraphics(site, state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])

  return state.isLoaded
}

export const useScrollToFormRef = (formRef: React.RefObject<HTMLDivElement>) => {
  const { activeForm } = useContext(EnforcementCtx)
  const { siteUUID } = useContext(SiteCtx)

  const isActive = activeForm || siteUUID

  useEffect(() => { // Scroll to form if active
    if(isActive && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [isActive, formRef])
}

export const useOnUpdateBtnClick = (uuid: string) => {
  const { siteUUID, dispatch } = useContext(SiteCtx)

  const payload = !siteUUID ? uuid : ''

  return () => dispatch({ type: 'SET_SITE_UUID', payload })
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, site: AppTypes.SiteInterface, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { basemap } = useContext(SiteCtx)
  
  useEffect(() => {
    if(!mapRef?.current || !basemap) return

    const map = new Map({ basemap })

    const mapView = new MapView({
      container: mapRef.current as HTMLDivElement,
      map,
      center: [site.xCoordinate, site.yCoordinate],
      zoom: 16,
      ui: { components: [] }
    })

    mapView.when(() => setState(prevState => ({ ...prevState, view: mapView })))

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer', minScale: 20000 })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    return () => {
      setTimeout(() => {
        mapView.destroy()
      }, 50)
    }
  }, [mapRef, site, basemap, setState])
}

const useSetMapGraphics = (site: AppTypes.SiteInterface, state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view || !site) return

    const pointGraphicsLayer = state.view.map?.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer.removeAll()
    textGraphicsLayer.removeAll()

    const point = new Point({
      longitude: site.xCoordinate,
      latitude: site.yCoordinate
    })

    const pictureMarker = new PictureMarkerSymbol({
      url: setSiteMarker(site), 
      width: "32px",
      height: "32px",
      yoffset: "14px"
    })

    const graphic = new Graphic({
      geometry: point,
      symbol: pictureMarker
    })

    const labelText = new TextSymbol({
      text: site.name,
      color: "#FFFFFF",
      yoffset: -14,
      font: { size: 10 }
    })

    const label = new Graphic({
      geometry: point,
      symbol: labelText
    })

    pointGraphicsLayer.add(graphic)
    textGraphicsLayer.add(label)
  }, [state, site])
}