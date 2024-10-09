// Types
import { IllicitDischarge } from "../../../../context/App/types"

export interface SiteIllicitDischargeBtnProps { // SiteIllicitDischargeBtn props
  discharges: IllicitDischarge[]
  disabled?: boolean
}

export interface SetDischargesObjProps { // setDischargesObj fn props
  discharges: IllicitDischarge[]
}