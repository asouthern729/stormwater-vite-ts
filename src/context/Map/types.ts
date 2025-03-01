// Types
import { Dispatch } from "react"
import { Basemap } from "../../components/map/MapContainer/types"

export interface MapContextObj { // Map ctx
  basemap: Basemap
  mapDispatch: Dispatch<MapAction>
  newSite: {
    xCoordinate: number | undefined
    yCoordinate: number | undefined
  },
  updateSite: {
    xCoordinate: number | undefined
    yCoordinate: number | undefined
  }
}

export interface MapState {
  basemap: Basemap
  newSite: {
    xCoordinate: number | undefined
    yCoordinate: number | undefined
  },
  updateSite: {
    xCoordinate: number | undefined
    yCoordinate: number | undefined
  }
}

export interface MapReducerProps {
  state: MapState
  action: MapAction
}

export type MapAction =
  | { type: 'SET_NEW_SITE_MAP_COORDINATES', payload: { xCoordinate: number, yCoordinate: number } }
  | { type: 'SET_UPDATE_SITE_MAP_COORDINATES', payload: { xCoordinate: number, yCoordinate: number } }
  | { type: 'SET_BASEMAP', payload: Basemap } 
  | { type: 'RESET_CTX', payload: undefined }
