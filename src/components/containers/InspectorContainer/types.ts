// Types
import { Site, Inspector } from "../../../context/App/types"

export interface InspectorContainerProps { // InspectorContainer props
  sites: Site[]
  inspector: Inspector
}

export interface InspectorContainerState { // InspectorContainer state obj
  deleteBtnActive: boolean
  formUUID?: string | undefined
}