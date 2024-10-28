// Types
import { Site } from "../../../context/App/types"

export interface InspectorTableProps { // InspectorTable props
  sites: Site[]
}

export interface InspectorTableState { // InspectorTable state object
  year: number
}

export interface UseSetInspectorTableDataProps { // useSetInspectorTableData hook props
  sites: Site[]
  year: number
}

export interface InspectorTableData {
  site: string
  dates: string[]
}