// Types
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { Site, Complaint, IllicitDischarge, GreenInfrastructure } from "../../../../context/App/types"

export interface SitesIssuesTableProps { // SitesIssuesTable props
  sites: Site[]
  issues: {
    complaints: Complaint[]
    discharges: IllicitDischarge[]
    green: GreenInfrastructure[]
  }
}

export interface SitesIssuesTableState { // SitesIssuesTable state object
  currentPage: number
}

export interface UseSetSitesIssuesTableDataProps { // useSetSitesIssuesTableData hook props
  sites: Site[]
  issues: {
    complaints: Complaint[]
    discharges: IllicitDischarge[]
    green: GreenInfrastructure[]
  }
  currentPage: number
}

export interface HandlePageBtnClickProps { // handleNextPageBtnClick fn and handlePrevPageBtnClick fn props
  setState: Dispatch<SetStateAction<SitesIssuesTableState>>
}