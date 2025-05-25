// Types
import { Site, Complaint } from "../../../../context/App/types"

export interface ComplaintsContainerProps { // ComplaintsContainer
  sites: Site[]
  complaints: Complaint[]
}

export interface ComplaintsContainerState { // ComplaintsContainer state
  formUUID: string | undefined
}