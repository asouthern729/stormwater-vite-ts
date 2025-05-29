import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Multipoint from '@arcgis/core/geometry/Multipoint'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import { mapHitTest } from "@/helpers/utils"
import SitesCtx from "../../context"

// Icons
import pinWarningIcon from '@/assets/icons/pin/warning-pin.svg'
import pinInfoIcon from '@/assets/icons/pin/info-pin.svg'

// Types
import { SiteInterface } from "@/context/App/types"
import { MapHitInterface } from './types'

export const useSetTableData = (sites: SiteInterface[]) => {
  const { searchValue, showActiveSitesOnly, showOpenIssuesOnly } = useContext(SitesCtx)

  let array = sites || []

  if(searchValue) {
    const regex = new RegExp(searchValue, 'i')

    array = array.filter(site => { // Search by name, cof #, or permit #
      for(const prop in site) {
        if(['name', 'cof', 'permit'].includes(prop) && regex.test(site[prop])) {
          return true
        }
      }
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

export const useSetSitesMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: SiteInterface[]) => {
  const [state, setState] = useState<{ view: __esri.MapView | null }>({ view: null })

  useCreateMapView(mapRef, sites, setState)

  useSetMapGraphics(sites, state)

  return state.view
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: SiteInterface[], setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null }>>) => {
  const { dispatch } = useContext(SitesCtx)

  const navigate = useNavigate()

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap: 'dark-grey-vector' })

    const multipoint = new Multipoint({
      points: sites.map(site => [site.xCoordinate, site.yCoordinate])
    })

    const mapView = new MapView({
      container: mapRef.current,
      map,
      extent: multipoint.extent.expand(1.5),
      ui: { components: [] }
    })

    setState({ view: mapView })

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer' })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    const onMapHover = mapView.on("pointer-move", async (e) => {
      const results = (await mapView.hitTest(e)).results

      const siteHit = mapHitTest(results)

      if(siteHit) {
        const hit = siteHit as MapHitInterface
        dispatch({ type: 'SET_HOVERED_SITE', payload: hit.graphic.attributes.uuid })
      } else dispatch({ type: 'SET_HOVERED_SITE', payload: '' })
    })

    const onMapClick = mapView.on("click", async (e) => {
      const results = (await mapView.hitTest(e)).results

      const siteHit = mapHitTest(results)

      if(siteHit) {
        const hit = siteHit as MapHitInterface
        navigate(`/sites/site/${ hit.graphic.attributes.uuid }`)
      }
    })

    return () => {
      onMapHover.remove()
      onMapClick.remove()
      mapView.destroy()
    }
  }, [mapRef, sites, navigate])
}

const useSetMapGraphics = (sites: SiteInterface[], state: { view: __esri.MapView | null }) => {
  const { hoveredSite } = useContext(SitesCtx)

  useEffect(() => {
    if(!state.view || !sites.length) return

    const pointGraphicsLayer = state.view.map.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer.removeAll()

    sites.forEach(site => {
      const point = new Point({
        longitude: site.xCoordinate,
        latitude: site.yCoordinate
      })

      const hovered = site.uuid === hoveredSite

      const pictureMarker = new PictureMarkerSymbol({
        url: !hovered ? pinWarningIcon : pinInfoIcon, 
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
        haloColor: hovered ? "#0091D5" : undefined,
        haloSize: hovered ? "1px" : undefined,
        font: { size: 10 }
      })

      const label = new Graphic({
        geometry: point,
        symbol: labelText
      })

      pointGraphicsLayer.add(graphic)
      textGraphicsLayer.add(label)
    })
  }, [sites, hoveredSite])
}