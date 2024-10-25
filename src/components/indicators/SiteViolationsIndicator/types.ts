// Types
import { ConstructionViolation } from "../../../context/App/types"

export interface SiteViolationsIndicatorProps {
  violations: ConstructionViolation[]
  disabled?: boolean
}

export interface SetViolationsObjProps { // setViolationsObj fn props
  violations: ConstructionViolation[]
}