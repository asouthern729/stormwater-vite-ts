// Types
import { Site, IllicitDischarge } from "../../../context/App/types"

export interface DischargesContainerProps { // DischargesContainer props
  sites: Site[]
  discharges: IllicitDischarge[]
}

export interface DischargesContainerState { // DischargesContainer state
  formUUID: string | undefined
}