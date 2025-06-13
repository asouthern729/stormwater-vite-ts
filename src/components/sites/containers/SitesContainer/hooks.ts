import { useContext, useState, useEffect, useCallback, useRef } from "react"
import { useNavigate } from "react-router"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Search from "@arcgis/core/widgets/Search"
import { TextSymbol } from "@arcgis/core/symbols"
import { mapHitTest } from "@/helpers/utils"
import SitesCtx from "../../context"
import { setSiteMarker } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import Multipoint from '@arcgis/core/geometry/Multipoint'
import { MapHitInterface } from './types'

export const useSetTableData = (sites: AppTypes.SiteInterface[]) => {
  const { searchValue, showActiveSitesOnly, showOpenIssuesOnly } = useContext(SitesCtx)

  let array = sites || []

  if(searchValue) {
    const regex = new RegExp(searchValue, 'i')

    array = array.filter(site => {
      const searchableProps: (keyof AppTypes.SiteInterface)[] = ['name', 'cof', 'permit']
      
      return searchableProps.some(prop => {
        const value = site[prop]
        return value && regex.test(value as string)
      })
    })
  }

  if(showActiveSitesOnly) { // Show active sites only filter
    array = array.filter(site => !site.inactive)
  }

  if(showOpenIssuesOnly) { // Show open issues only filter
    array = array.filter(site => {
      if(site.hasOpenComplaint || site.hasOpenIllicitDischarge || site.hasOpenViolation) {
        return site
      }
    })
  }

  return array
}

export const useSetSitesMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: AppTypes.SiteInterface[]) => {
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

export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(SitesCtx)

  const [state, setState] = useState<{ localSearchValue: string }>({ localSearchValue: searchValue })
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cb = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.currentTarget.value

    setState({ localSearchValue: newSearchValue })

    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
    }, 300)
  }, [searchValue, dispatch])

  return { onSearchChange: cb, searchValue: state.localSearchValue } // searchValue returned for UI update only
}

export const useSetMapViewProperties = (sites: AppTypes.SiteInterface[], mapRef: React.RefObject<HTMLDivElement>) => {

  return useCallback((map: __esri.Map) => {
    if(sites.length) {
      const multipoint = new Multipoint({
        points: sites.map(site => [site.xCoordinate, site.yCoordinate])
      })

      const viewExtent = multipoint.extent

      const properties: __esri.MapViewProperties = {
        container: mapRef.current as HTMLDivElement,
        map,
        extent: viewExtent?.expand(1.1),
        ui: { components: [] }
      }

      return properties
    }

    const properties: __esri.MapViewProperties = {
      container: mapRef.current as HTMLDivElement,
      map,
      center: [-86.86897349, 35.92531721],
      zoom: 12,
      ui: { components: [] }
    }

    return properties
  }, [sites, mapRef])
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: AppTypes.SiteInterface[], setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { basemap } = useContext(SitesCtx)
  
  const navigate = useNavigate()

  const mapViewPropertes = useSetMapViewProperties(sites, mapRef)

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap })

    const properties = mapViewPropertes(map)

    const mapView = new MapView({ ...properties })

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
        navigate(`/sites/site/${ hit.graphic.attributes.uuid }`)
      }
    })

    return () => {
      setTimeout(() => {
        onMapClick.remove()
        mapView.destroy()
      }, 50)
    }
  }, [mapRef, sites, basemap, navigate, mapViewPropertes, setState])
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