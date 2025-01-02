import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"

// Types
import { Site } from '../../../context/App/types'
import { SetViewTypeProps, ViewProps, DetermineCenterProps, SetLabelProps, SetMarkerProps, MapHit } from "./types"

// Icons
import warningPin from '../../../assets/icons/pin/warning-pin.png'
import errorPin from '../../../assets/icons/pin/error-pin.png'
import infoPin from '../../../assets/icons/pin/info-pin.png'
import neutralContentPin from '../../../assets/icons/pin/neutral-content-pin.png'

export const setViewType = (type: SetViewTypeProps['type'], mapRef: SetViewTypeProps['mapRef'], mapProperties: SetViewTypeProps['mapProperties']): void => {
  switch(type) {
    case 'create':
      return createView(mapRef, mapProperties)
    case 'update':
      return updateView(mapRef, mapProperties)
    default:
      return defaultView(mapRef, mapProperties)
  }
}

export const defaultView = (mapRef: ViewProps['mapRef'], mapProperties: ViewProps['mapProperties']): void => { // Default view for Home page
  const { setState, basemap, sites, navigate, hoveredSite, zoom } = mapProperties
  
  const map = new Map({
    basemap
  })

  const view = new MapView({
    container: mapRef as HTMLDivElement,
    map,
    center: determineCenter(sites.filter(site => hoveredSite ? site.uuid === hoveredSite : site)),
    zoom: zoom || 12,
    ui: {
      components: []
    }
  })

  setState({ view })

  const projectsArray: Graphic[] = []
  const textGraphicsArray: Graphic[] = []

  const pointGraphicsLayer = new GraphicsLayer()
  const textGraphicsLayer = new GraphicsLayer({
    minScale: 20000 
  })
  const hoveredSiteLabel = new GraphicsLayer()

  map.addMany([pointGraphicsLayer, textGraphicsLayer, hoveredSiteLabel])

  sites.forEach((site: Site) => { // Existing sites
    const hovered = site.uuid === hoveredSite

    const point = new Point({
      longitude: site.xCoordinate,
      latitude: site.yCoordinate,
      spatialReference: view.spatialReference
    })

    const graphic = new Graphic({ 
      geometry: point,
      attributes: { name: site.name, uuid: site.uuid },
      symbol: setMarker(determineSiteIssueStatus(site), hovered, site.inactive)
    })

    projectsArray.push(graphic)

    const label = new Graphic({
      geometry: point,
      symbol: setLabel(site.name, hovered)
    }) 

    if(hovered) {
      hoveredSiteLabel.add(label)
    } else textGraphicsArray.push(label)
  })

  pointGraphicsLayer.addMany(projectsArray)
  textGraphicsLayer.addMany(textGraphicsArray)

  view.on("click", async (e) => {
    const test = await view.hitTest(e)

    test.results.forEach(obj => {
      const hit = obj as MapHit

      if(hit.graphic.attributes?.uuid) {
        navigate(`/site/${ hit.graphic.attributes.uuid }`)
      }
    })
  })
}

export const updateView = (mapRef: ViewProps['mapRef'], mapProperties: ViewProps['mapProperties']): void => { // Update site location map view
  const { setState, basemap, sites, zoom, mapDispatch, updateSite } = mapProperties

  const map = new Map({
    basemap
  })

  const view = new MapView({
    container: mapRef as HTMLDivElement,
    map,
    center: determineCenter(sites),
    zoom: zoom || 12,
    ui: {
      components: []
    }
  })

  setState({ view })

  const pointGraphicsLayer = new GraphicsLayer()
  const textGraphicsLayer = new GraphicsLayer({
    minScale: 20000 
  })

  map.addMany([pointGraphicsLayer, textGraphicsLayer])

  if(updateSite?.xCoordinate) { // If update site is in ctx - plot on map
    const point = new Point({
      longitude: updateSite.xCoordinate,
      latitude: updateSite.yCoordinate,
      spatialReference: view.spatialReference
    })

    const graphic = new Graphic({
      geometry: point,
      symbol: setMarker(),
      attributes: {
        new: true
      }
    })

    const label = new Graphic({
      geometry: point,
      symbol: setLabel('Updated Location'),
      attributes: {
        new: true
      }
    })

    pointGraphicsLayer.add(graphic)
    textGraphicsLayer.add(label)
  } else { // Plot existing site location if no value is in ctx
    const site = sites[0]

    const point = new Point({
      longitude: site.xCoordinate,
      latitude: site.yCoordinate,
      spatialReference: view.spatialReference
    })
  
    const graphic = new Graphic({ 
      geometry: point,
      symbol: setMarker(determineSiteIssueStatus(site)),
      attributes: { 
        name: site.name,
        uuid: site.uuid, 
      }
    })

    pointGraphicsLayer.add(graphic)

    const label = new Graphic({
      geometry: point,
      symbol: setLabel(site.name),
      attributes: {
        new: true
      }
    })

    textGraphicsLayer.add(label)
  }

  view.on("click", async (e) => { // Update ctx on map click
    if(mapDispatch) {
      mapDispatch({ type: 'SET_UPDATE_SITE_MAP_COORDINATES', payload: { xCoordinate: e.mapPoint.longitude, yCoordinate: e.mapPoint.latitude } })
    }
  })
}

export const createView = (mapRef: ViewProps['mapRef'], mapProperties: ViewProps['mapProperties']): void => { // New location map view
  const { setState, basemap, zoom, mapDispatch, newSite } = mapProperties

  const map = new Map({
    basemap
  })

  const view = new MapView({
    container: mapRef as HTMLDivElement,
    map,
    center: determineCenter(newSite ? [ { xCoordinate: newSite.xCoordinate, yCoordinate: newSite.yCoordinate } ] : []),
    zoom: zoom || 16,
    ui: {
      components: []
    }
  })

  setState({ view })

  const pointGraphicsLayer = new GraphicsLayer()
  const textGraphicsLayer = new GraphicsLayer()

  map.addMany([pointGraphicsLayer, textGraphicsLayer])

  if(newSite) { // If newSite is in ctx - plot on map
    const point = new Point({
      longitude: newSite.xCoordinate,
      latitude: newSite.yCoordinate,
      spatialReference: view.spatialReference
    })

    const graphic = new Graphic({
      geometry: point,
      symbol: setMarker(),
      attributes: {
        new: true
      }
    })

    const label = new Graphic({
      geometry: point,
      symbol: setLabel('New Location'),
      attributes: {
        new: true
      }
    })

    pointGraphicsLayer.add(graphic)
    textGraphicsLayer.add(label)
  }

  view.on("click", async (e) => { // Update new site coordinates in ctx on click
    if(mapDispatch) {
      mapDispatch({ type: 'SET_NEW_SITE_MAP_COORDINATES', payload: { xCoordinate: e.mapPoint.longitude, yCoordinate: e.mapPoint.latitude } })
    }
  })
}

const setLabel = (label: SetLabelProps['label'], hovered?: SetLabelProps['hovered']): TextSymbol => { // Set label
  return new TextSymbol({
    text: label,
    color: "#FFFFFF",
    yoffset: -14,
    haloColor: hovered ? "#0091D5" : undefined,
    haloSize: hovered ? "1px" : undefined,
    font: {
      size: 10
    }
  })
}

const determineCenter = (data: DetermineCenterProps['data']): [number, number] => { // Determine center for map on load
  const xCoordinates: number[] = []
  const yCoordinates: number[] = []

  data.forEach(obj => {
    xCoordinates.push(obj.xCoordinate as number)
    yCoordinates.push(obj.yCoordinate as number)
  })

  const averageX = xCoordinates.reduce((acc, current) => acc + current, 0) / xCoordinates.length
  const averageY = yCoordinates.reduce((acc, current) => acc + current, 0) / yCoordinates.length

  if(averageX) {
    return [averageX, averageY]
  } else return [-86.86897349, 35.92531721]
}

const setMarker = (hasOpenIssue?: SetMarkerProps['hasOpenIssue'], hovered?: SetMarkerProps['hovered'], inactive?: SetMarkerProps['inactive']): PictureMarkerSymbol => { // Set map marker
  let url = warningPin

  if(hovered) { // Hovered
    url = infoPin
  }

  if(hasOpenIssue) { // Open site issue
    url = errorPin
  }

  if(inactive) { // Inactive
    url = neutralContentPin
  }

  return (
    new PictureMarkerSymbol({
      url,
      width: "32px",
      height: "32px",
      yoffset: "14px"
    })
  )
}

const determineSiteIssueStatus = (site: Site): boolean => { // Determine if site has an open issue
  if(site.hasOpenViolation || site.hasOpenComplaint || site.hasOpenIllicitDischarge) {
    return true
  } else return false
}