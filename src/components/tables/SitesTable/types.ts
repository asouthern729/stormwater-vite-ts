// Types
import { Dispatch } from "react"
import { AppAction } from "../../../context/App/types"
import { Site } from "../../../context/App/types"

export interface SitesTableProps { // SitesTable props
  sites: Site[]
}

export interface SetTableDataProps { // setTableData fn props
  site: Site
  options: {
    dispatch: Dispatch<AppAction>
  }
}

export interface SetTableDataStyleProps { // setTableDataStyle fn props
  index: number
  hasOpenViolation: boolean
}