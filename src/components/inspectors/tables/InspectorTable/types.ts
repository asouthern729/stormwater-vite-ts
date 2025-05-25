// Types
import { Dispatch, SetStateAction, RefObject } from "react"
import { Site } from "../../../../context/App/types"

export interface InspectorTableProps { // InspectorTable props
  sites: Site[]
}

export interface InspectorTableState { // InspectorTable state object
  year: number
  selection: string[]
  showForm: boolean
}

export interface UseSetInspectorTableDataProps { // useSetInspectorTableData hook props
  sites: Site[]
  year: number
}

export interface UseScrollToFormRefProps { // useScrollToFormRef hook props
  showForm: boolean
  formRef: RefObject<HTMLDivElement>
  tableRef: RefObject<HTMLDivElement>
}

export interface SetInspectorTableRowProps { // setInspectorTableRow fn props
  row: InspectorTableData
  selection: string[]
  options: {
    setState: Dispatch<SetStateAction<InspectorTableState>>
  }
}

export interface InspectorTableData {
  site: string
  dates: string[]
  uuid: string
  siteId: string
}