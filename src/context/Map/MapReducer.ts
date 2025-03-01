// Types
import { Basemap } from "../../components/map/MapContainer/types"
import { MapReducerProps } from "./types"

const mapReducer = (state: MapReducerProps['state'], action: MapReducerProps['action']) => {
  switch(action.type) {
    case 'SET_NEW_SITE_MAP_COORDINATES':
      return {
        ...state,
        newSite: action.payload
      }
    case 'SET_UPDATE_SITE_MAP_COORDINATES':
      return {
        ...state,
        updateSite: action.payload
      }
    case 'SET_BASEMAP':
      return {
        ...state,
        basemap: action.payload
      }
    case 'RESET_CTX':
      return {
        basemap: 'dark-gray-vector' as Basemap,
        newSite: {
          xCoordinate: undefined,
          yCoordinate: undefined
        },
        updateSite: {
          xCoordinate: undefined,
          yCoordinate: undefined
        }
      }
    default:
      return state
  }
}

export default mapReducer