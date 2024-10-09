// Types
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { Location } from "react-router-dom"
import { Issue } from "../SiteIssuesTable/types"
import { Site, Complaint, IllicitDischarge } from "../../../context/App/types"

export interface SitesIssuesTableProps { // SitesIssuesTable props
  sites: Site[]
  issues: {
    complaints: Complaint[]
    discharges: IllicitDischarge[]
  }
  handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void
}

export interface SitesIssuesTableState { // SitesIssuesTable state object
  currentPage: number
}

export interface UseHandlePageData { // useHandlePageData hook props
  tableData: Issue[]
  currentPage: number
}

export interface SetSitesIssuesTableDataProps { // setSitesIssuesTableData fn props
  sites: Site[]
  issues: {
    complaints: Complaint[]
    discharges: IllicitDischarge[]
  }
  currentPage: number
}

export interface SetTableProps { // setTableHeaders and setTableBody fn props
  location: Location<any>
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