// Types
import { MouseEvent } from "react"
import { Site } from "../../../context/App/types"
import { SiteForm } from "../../containers/SiteContainer/types"

export interface SiteIssuesTableProps { // SiteIssuesTable props
  site: Site
  handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void
}

export interface SiteIssuesTableState { // SiteIssuesTable state obj
  showAll: boolean
}

export interface SetSiteIssuesTableDataProps { // setSiteIssuesTableData fn props
  site: Site
  showAll: boolean
}

export interface SetTypeIconProps { // setTypeIcon fn props
  type: SiteForm
}

export interface SetCivilPenaltyTableDataProps { // setCivilPenaltyTableDataProps fn props
  civilPenalty: { issued: string | null, received: boolean | null }
}

export interface Issue { // For SiteIssues and SitesIssues components
  date: string
  civilPenalty: {
    issued: boolean | null
    received: boolean | null
  }
  swo: {
    issued: boolean | null
    lifted: boolean | null
  }
  closed: boolean
  form: SiteForm
  details: string
  site?: string
  siteUUID?: string
  uuid?: string
}