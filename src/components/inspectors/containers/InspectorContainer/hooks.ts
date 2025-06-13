import { useContext, useEffect, useCallback, useState } from "react"
import { useNavigate } from "react-router"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Multipoint from '@arcgis/core/geometry/Multipoint'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Search from "@arcgis/core/widgets/Search"
import { TextSymbol } from "@arcgis/core/symbols"
import { mapHitTest } from "@/helpers/utils"
import InspectorTableCtx from "../../tables/InspectorTable/context"
import InspectorCtx from "../../context"
import { setSiteMarker } from "@/components/sites/containers/SitesContainer/utils"

// Types
import * as AppTypes from '@/context/App/types'
import { MapHitInterface } from "@/components/sites/containers/SitesContainer/types"

export const useScrollToFormRef = (formRef: React.RefObject<HTMLDivElement>) => {
  const { formOpen } = useContext(InspectorTableCtx)

  useEffect(() => { // Scroll to form if active
    if(formOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [formOpen, formRef])
}

export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(InspectorCtx)

  const cb = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }, [dispatch])

  return { onSearchChange: cb, searchValue }
}

export const useSetInspectorMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: AppTypes.SiteInterface[]) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, sites, setState)

  useSetMapGraphics(sites, state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])

  return state.isLoaded
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: AppTypes.SiteInterface[], setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { basemap } = useContext(InspectorCtx)
  
  const navigate = useNavigate()

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap })

    const multipoint = new Multipoint({
      points: sites.map(site => [site.xCoordinate, site.yCoordinate])
    })

    const viewExtent = multipoint.extent

    const mapView = new MapView({
      container: mapRef.current as HTMLDivElement,
      map,
      extent: viewExtent?.expand(1.1),
      ui: { components: [] }
    })

    mapView.when(() => {
      const searchWidget = new Search({ view: mapView })
      
      mapView.ui.add(searchWidget, {
        position: 'top-left'
      })

      setState(prevState => ({ ...prevState, view: mapView }))
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer', minScale: 20000 })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    const onMapClick = mapView.on("click", async (e) => {
      const results = (await mapView.hitTest(e)).results

      const siteHit = mapHitTest(results)

      if(siteHit) {
        const hit = siteHit as MapHitInterface
        navigate(`/site/${ hit.graphic.attributes.uuid }`)
      }
    })

    return () => {
      setTimeout(() => {
        onMapClick.remove()
        mapView.destroy()
      }, 50)
    }
  }, [mapRef, sites, basemap, navigate, setState])
}

const useSetMapGraphics = (sites: AppTypes.SiteInterface[], state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view || !sites.length) return

    const pointGraphicsLayer = state.view.map?.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer.removeAll()
    textGraphicsLayer.removeAll()

    sites.forEach(site => {
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
        symbol: pictureMarker,
        attributes: { uuid: site.uuid }
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
    })
  }, [state, sites])
}