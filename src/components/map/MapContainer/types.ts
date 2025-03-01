// Types
import { Site } from "../../../context/App/types"

export interface MapContainerProps { // MapContainer props
  sites: Site[]
  type?: MapType
  zoom?: number
}

export type Basemap =
  | "dark-gray-vector"
  | "satellite"
  | "streets-night-vector"
  | "streets-vector"

export type MapType =
  | "create"
  | "update"
  | "default"
