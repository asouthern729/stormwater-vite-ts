// Types
import { Dispatch } from "react"

export interface MapContextObj { // Map ctx
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
  action: ReducerAction
}

export type MapAction =
  | { type: 'SET_NEW_SITE_MAP_COORDINATES', payload: { xCoordinate: number, yCoordinate: number } }
  | { type: 'SET_UPDATE_SITE_MAP_COORDINATES', payload: { xCoordinate: number, yCoordinate: number } }
  | { type: 'RESET_CTX', payload: undefined }

interface ReducerAction {
  type: string, payload: any
}