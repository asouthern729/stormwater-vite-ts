// Types
import { Dispatch, SetStateAction } from "react"
import { InspectorTableState } from "../../tables/InspectorTable/types"

export interface InspectorTableYearBtnsProps { // InspectorTableYearBtn props
  year: number
  setState: Dispatch<SetStateAction<InspectorTableState>>
}