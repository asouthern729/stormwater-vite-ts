// Types
import { Complaint } from "../../../context/App/types"

export interface SiteComplaintsIndicatorProps { // SiteComplaintIndicator props
  complaints: Complaint[]
  disabled?: boolean
}

export interface SetComplaintsObjProps { // setComplaintsObj fn props
  complaints: Complaint[]
}