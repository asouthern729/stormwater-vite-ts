import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import { setFormType } from '../SitesIssuesTable/utils'

// Types
import { UseSetSiteIssuesTableDataProps, Issue, Combined } from "./types"

export const useSetSiteIssuesTableData = (site: UseSetSiteIssuesTableDataProps['site'], showAll: UseSetSiteIssuesTableDataProps['showAll']): Issue[] => {
  const { dateRangeFilter, showSiteComplaints, showSiteViolations, showSiteIllicitDischarges, showClosedSiteIssues } = useContext(AppContext)

  const { ConstructionViolations, Complaints, IllicitDischarges } = site

  let combined: Combined[] = []

  if(showSiteComplaints) { // Handle complaints
    combined.push(...Complaints.filter(complaint => !showClosedSiteIssues ? !complaint.closed : complaint ))
  }

  if(showSiteViolations) { // Handle construction violations
    combined.push(...ConstructionViolations.filter(violation => !showClosedSiteIssues ? !violation.closed : violation))
  }

  if(showSiteIllicitDischarges) { // Handle illicit discharges
    combined.push(...IllicitDischarges.filter(illicit => !showClosedSiteIssues ? !illicit.closed : illicit))
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

  combined.forEach(issue => {
    const obj: Issue = {
      date: issue.date,
      civilPenalty: {
        issued: !!issue?.penaltyDate,
        received: !!issue?.paymentReceived
      },
      swo: {
        issued: !!issue?.swoDate,
        lifted: !!issue?.swoLiftedDate
      },
      closed: issue.closed,
      concern: issue?.concern,
      otherConcern: issue?.otherConcern,
      form: setFormType(issue as { complaintId?: string, violationId?: string, illicitId?: string }),
      details: issue.details,
      uuid: issue.uuid
    }

    combinedArray.push(obj)
  })

  const sorted = combinedArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if(showAll) {
    return sorted
  } else return sorted.slice(0, 5)
}