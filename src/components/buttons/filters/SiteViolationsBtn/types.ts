// Types
import { ConstructionViolation } from "../../../../context/App/types"

export interface SiteViolationsBtnProps {
  violations: ConstructionViolation[]
  disabled?: boolean
}

export interface SetViolationsObjProps { // setViolationsObj fn props
  violations: ConstructionViolation[]
}