import { useContext, useMemo } from "react"
import { useLocation, Link } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"

// Types
import { ReactNode } from "react"
import { SiteForm } from "../../containers/SiteContainer/types"
import { Issue } from "../SiteIssuesTable/types"
import { UseHandlePageData,  SetTableProps, SetSitesIssuesTableDataProps, SetCivilPenaltyTableDataProps, SetSWOTableDataProps, HandlePageBtnClickProps } from "./types"

export const useHandlePageData = (tableData: UseHandlePageData['tableData'], currentPage: UseHandlePageData['currentPage']): Issue[] => {
  const pageData = useMemo(() => {
    return tableData.slice((currentPage * 20) - 20, currentPage * 20)
  }, [tableData, currentPage])

  return pageData
}

export const setSitesIssuesTableData = (sites: SetSitesIssuesTableDataProps['sites'], issues: SetSitesIssuesTableDataProps['issues']): Issue[] => { // Set table data for SitesIssuesTable
  const { dateRangeFilter, showSiteComplaints, showSiteViolations, showSiteIllicitDischarges, showClosedSiteIssues } = useContext(AppContext)

  const location = useLocation().pathname

  let combined: any[] = showClosedSiteIssues ? [ ...issues.complaints, ...issues.discharges ] : [ ...issues.complaints.filter(complaint => !complaint.closed), ...issues.discharges.filter(discharge => !discharge.closed) ]

  if(showSiteComplaints && !['/violations', '/discharges'].includes(location)) { // Handle complaints
    sites.forEach(site => {
      if(showClosedSiteIssues) { 
        combined.push(...site.Complaints)
      } else combined.push(...site.Complaints.filter(complaint => !complaint.closed)) 
    })
  }

  if(showSiteViolations && !['/complaints', '/discharges'].includes(location)) { // Handle construction violations
    sites.forEach(site => {
      if(showClosedSiteIssues) {
        combined.push(...site.ConstructionViolations)
      } else combined.push(...site.ConstructionViolations.filter(violation => !violation.closed)) 
    })
  }

  if(showSiteIllicitDischarges && !['/violations', '/complaints'].includes(location)) { // Handle illicit discharges
    sites.forEach(site => {
      if(showClosedSiteIssues) {
        combined.push(...site.IllicitDischarges)
      } else combined.push(...site.IllicitDischarges.filter(discharge => !discharge.closed))
    })
  }

  if(dateRangeFilter.start && dateRangeFilter.end) { // Handle date range filter
    combined = combined.filter(issue => {
      const filterStart = new Date(dateRangeFilter.start as string)
      const filterEnd = new Date(dateRangeFilter.end as string)
      const date = new Date(issue.date)

      if(date >= filterStart && date <= filterEnd) {
        return issue
      }
    })
  }

  let combinedArray: Issue[] = []

  combined.forEach((issue) => {

    const site = sites.find(site => site.siteId === issue.siteId) // Find site from sites[]

    const obj: Issue = {
      date: issue.date,
      site: site?.name,
      siteUUID: site?.uuid,
      civilPenalty: {
        issued: issue?.penaltyDate ? true : false,
        received: issue?.paymentReceived ? true : false
      },
      swo: {
        issued: issue?.swoDate ? true : false,
        lifted: issue?.swoLiftedDate ? true : false
      },
      closed: issue.closed,
      form: setFormType(issue as { violationId?: string, complaintId?: string, illicitId?: string }),
      details: issue.details,
      uuid: issue.uuid
    }

    combinedArray.push(obj)
  })

  const sorted = combinedArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return sorted
}

export const handleNextPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle next page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))
}

export const handlePrevPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle prev page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))
}

export const setFormType = (issue: { violationId?: string, complaintId?: string, illicitId?: string }): SiteForm => { // Set form type for issues tables
  if(issue.complaintId) { // Complaint
    return 'updateSiteComplaint'
  }

  if(issue.illicitId) { // Illicit discharge
    return 'updateIllicitDischarge' 
  }

  return 'updateSiteConstructionViolation'
}

export const setTableHeaders = (location: SetTableProps['location']): ReactNode => { // Set tbale headers by location
  const page = location.pathname.split('/')[1]

  if(page === 'complaints') { // Complaints
    return (
      <tr>
        <th>Date</th>
        <th>Site</th>
        <th className="text-center">Status</th>
      </tr>
    )
  }

  return ( // Construction violations and illicit discharges
    <tr>
      <th>Date</th>
      <th>Type</th>
      <th className="text-center">Civil Penalty</th>
      <th className="text-center">SWO</th>
      <th className="text-center">Status</th>
    </tr>
  )
}

export const setTableBody = (location: SetTableProps['location'], issue: SetTableProps['issue'], options: SetTableProps['options']): ReactNode => { // Set table body based on location
  const { handleRowClick } = options

  const page = location.pathname.split('/')[1]

  if(page === 'complaints') { // Complaints
    return (
      <tr key={`sites-issues-table-row-${ issue?.uuid }`} data-uuid={issue?.uuid} title={issue?.details} onClick={(event) => handleRowClick(event)}>
        <td>{issue?.date}</td>
        <td className={issue?.siteUUID ? "whitespace-nowrap hover:text-warning" : "whitespace-nowrap"}>{issue?.siteUUID ? <Link to={`/site/${ issue.siteUUID }`}>{issue.site}</Link> : null}</td>
        {setStatusTableData(issue?.closed || false)}
      </tr>
    )
  }

  return (
    <tr key={`sites-issues-table-row-${ issue?.uuid }`} title={issue?.details}>
      <td>{issue?.date}</td>
      <td className={issue?.siteUUID ? "whitespace-nowrap hover:text-warning" : "whitespace-nowrap"}>{issue?.siteUUID ? <Link to={`/site/${ issue.siteUUID }`}>{issue.site}</Link> : null}</td>
      {setCivilPenaltyTableData(issue?.civilPenalty)}
      {setSWOTableData(issue?.swo)}
      {setStatusTableData(issue?.closed)}
    </tr>
  )
}

export const setCivilPenaltyTableData = (civilPenalty: SetCivilPenaltyTableDataProps['civilPenalty']): ReactNode => { // Set civil penalty table data
  if(civilPenalty?.issued) {
    if(civilPenalty.received) {
      return <td className="text-neutral-content font-bold uppercase text-center">Paid</td>
    } else return <td className="text-error font-bold uppercase text-center">Issued</td>
  } else return <td></td>
}

export const setSWOTableData = (SWO: SetSWOTableDataProps['swo']): ReactNode => { // Set swo table data
  if(SWO?.issued) {
    if(SWO.lifted) {
      return <td className="text-neutral-content font-bold uppercase text-center">Lifted</td>
    } else return <td className="text-error font-bold uppercase text-center">Issued</td>
  } else return <td></td>
}

export const setStatusTableData = (closed: boolean | undefined): ReactNode => { // Set status table data
  if(closed) {
    return <td className="text-success font-bold uppercase text-center">Closed</td>
  } else return <td className="text-errorD font-bold uppercase text-center">Open</td>
}