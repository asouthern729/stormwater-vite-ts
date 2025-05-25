// Types
import { MouseEvent } from "react"
import { Site } from "../../../../context/App/types"
import { SiteForm } from "../../containers/SiteContainer/types"

export interface SiteIssuesTableProps { // SiteIssuesTable props
  site: Site
  handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void
}

export interface SiteIssuesTableState { // SiteIssuesTable state obj
  showAll: boolean
}

export interface UseSetSiteIssuesTableDataProps { // useSetSiteIssuesTableData hook props
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
  site?: string | undefined
  siteUUID?: string | undefined
  responsibleParty?: string | null | undefined
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
  concern: string | null | undefined
  otherConcern: string | null | undefined
  uuid: string
}

export interface Combined {
  date: string
  siteId?: string | null 
  responsibleParty?: string | null 
  penaltyDate?: string 
  paymentReceived?: string 
  swoDate?: string 
  swoLiftedDate?: string 
  closed: boolean 
  concern?: string 
  otherConcern?: string | null 
  details: string 
  uuid: string 
}
