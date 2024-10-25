// Types
import { GreenInfrastructure } from "../../../context/App/types"

export interface GreenContainerProps { // GreenContainer props
  green: GreenInfrastructure[]
}

export interface GreenContainerState { // GreenContainer state obj
  formUUID: string | undefined
}