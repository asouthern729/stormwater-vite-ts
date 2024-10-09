// Types
import { Dispatch, SetStateAction } from "react"
import { MapContainerState, Basemap} from "../MapContainer/types"

export interface BasemapSelectorProps { // BasemapSelector props
  basemap: Basemap
  setState: Dispatch<SetStateAction<MapContainerState>>
}