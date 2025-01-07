// Types
import { Site } from "../../../context/App/types"

export interface SitesTableProps { // SitesTable props
  sites: Site[]
}

export interface SetTableDataStyleProps { // setTableDataStyle fn props
  index: number
  site: Site
}