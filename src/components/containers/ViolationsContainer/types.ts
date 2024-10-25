// Types
import { Site } from "../../../context/App/types"

export interface ViolationsContainerProps { // ViolationsContainer props
  sites: Site[]
}

export interface ViolationsContainerState { // ViolationsContainer state
  formUUID: string | undefined
}