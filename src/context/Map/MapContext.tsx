import { Reducer, createContext, useReducer } from "react"
import mapReducer from "./MapReducer"

// Types
import { ReactNode } from "react"
import { MapContextObj, MapState, MapAction } from "./types"

const MapContext = createContext<MapContextObj>({
  mapDispatch: () => {},
  basemap: 'dark-gray-vector',
  newSite: {
    xCoordinate: undefined,
    yCoordinate: undefined
  },
  updateSite: {
    xCoordinate: undefined,
    yCoordinate: undefined
  }
})

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const initialState: MapState = {
    basemap: 'dark-gray-vector',
    newSite: {
      xCoordinate: undefined,
      yCoordinate: undefined
    },
    updateSite: {
      xCoordinate: undefined,
      yCoordinate: undefined
    }
  }

  const [state, mapDispatch] = useReducer<Reducer<MapState, MapAction>>(mapReducer, initialState)

  return (
    <MapContext.Provider value={{ ...state, mapDispatch }}>
      {children}
    </MapContext.Provider>
  )
}

export default MapContext