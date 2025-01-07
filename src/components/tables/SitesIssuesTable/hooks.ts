import { useContext } from "react"
import { useLocation } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"
import { setFormType } from "./utils"

// Types
import { Issue } from "../SiteIssuesTable/types"
import { Combined } from "../SiteIssuesTable/types"
import { UseSetSitesIssuesTableDataProps } from "./types"

export const useSetSitesIssuesTableData = (sites: UseSetSitesIssuesTableDataProps['sites'], issues: UseSetSitesIssuesTableDataProps['issues']): Issue[] => { // Set table data for SitesIssuesTable
  const { dateRangeFilter, showSiteComplaints, showSiteViolations, showSiteIllicitDischarges, showClosedSiteIssues } = useContext(AppContext)

  const location = useLocation().pathname

  let combined: Combined[] = showClosedSiteIssues ? [ ...issues.complaints, ...issues.discharges, ...issues.green ] : [ ...issues.complaints.filter(complaint => !complaint.closed), ...issues.discharges.filter(discharge => !discharge.closed), ...issues.green.filter(violation => !violation.closed) ]

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

  const combinedArray: Issue[] = []

  combined.forEach((issue) => {

    const site = sites.find(site => site.siteId === issue.siteId) // Find site from sites[]

    const obj: Issue = {
      date: issue.date,
      site: site?.name,
      siteUUID: site?.uuid,
      responsibleParty: issue.responsibleParty,
      civilPenalty: {
        issued: !!issue?.penaltyDate,
        received: !!issue?.paymentReceived
      },
      swo: {
        issued: !!issue?.swoDate,
        lifted: !!issue?.swoLiftedDate
      },
      closed: issue.closed,
      form: setFormType(issue as { violationId?: string, complaintId?: string, illicitId?: string }),
      details: issue.details,
      concern: issue.concern,
      otherConcern: issue.otherConcern,
      uuid: issue.uuid
    }

    combinedArray.push(obj)
  })

  const sorted = combinedArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return sorted
}