// Types
import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'
import MapView from '@arcgis/core/views/MapView'
import { Site } from '../../../context/App/types'
import { MapAction } from '../../../context/Map/types'
import { Basemap, MapType } from '../MapContainer/types'

export interface MapProps { // Map props
  sites: Site[]
  type?: MapType
  zoom?: number
}

export interface MapState { // Map state object
  view: MapView | null
}

export interface SetViewTypeProps { // setViewType fn props
  type: ViewType
  mapRef: HTMLDivElement | null
  mapProperties: MapProperties
}

export interface ViewProps { // createView and updateView fn props
  mapRef: HTMLDivElement | null
  mapProperties: MapProperties
}

export interface DetermineCenterProps { // determineCenter fn props
  data: Site[] | { xCoordinate: number | undefined, yCoordinate: number | undefined }[]
}

export interface SetMarkerProps { // setMarker fn props
  hovered: boolean
  hasOpenIssue: boolean
  inactive: boolean | null
}

export interface SetLabelProps { // setLabel fn props
  hovered: boolean
  label: string
}

export type ViewType =
  | "create"
  | "update"
  | "default"

export interface MapProperties {
  setState: Dispatch<SetStateAction<MapState>>
  sites: Site[]
  basemap: Basemap
  navigate: NavigateFunction
  hoveredSite: string | undefined
  zoom?: number
  mapDispatch?: Dispatch<MapAction>
  newSite?: { xCoordinate: number | undefined, yCoordinate: number | undefined }
  updateSite?: { xCoordinate: number | undefined, yCoordinate: number | undefined }
}

export interface MapHit {
  graphic: {
    attributes: {
      name: string
      hasOpenViolation: boolean
      uuid: string
    }
  }
}