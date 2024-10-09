// Types
import { Complaint } from "../../../../context/App/types"

export interface SiteComplaintsBtnProps { // SiteComplaintsBtn props
  complaints: Complaint[]
  disabled?: boolean
}

export interface SetComplaintsObjProps { // setComplaintsObj fn props
  complaints: Complaint[]
}