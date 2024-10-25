// Types
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { Location } from "react-router-dom"
import { Issue } from "../SiteIssuesTable/types"
import { Site, Complaint, IllicitDischarge, GreenInfrastructure } from "../../../context/App/types"

export interface SitesIssuesTableProps { // SitesIssuesTable props
  sites: Site[]
  issues: {
    complaints: Complaint[]
    discharges: IllicitDischarge[]
    green: GreenInfrastructure[]
  }
  handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void
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

export interface SetTableProps { // setTableHeaders and setTableBody fn props
  location: Location<SitesIssuesTableState>
  issue?: Issue
  options: {
    handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void
  }
}

export interface SetCivilPenaltyTableDataProps { // setCivilPenaltyTableData fn props
  civilPenalty: { issued: boolean | null, received: boolean | null } | undefined
}

export interface SetSWOTableDataProps { // setSWOTableData fn props
  swo: { issued: boolean | null, lifted: boolean | null } | undefined
}

export interface HandlePageBtnClickProps { // handleNextPageBtnClick fn and handlePrevPageBtnClick fn props
  setState: Dispatch<SetStateAction<SitesIssuesTableState>>
}