import { useContext } from "react"
import { useLocation } from "react-router"
import AppContext from "../../../../context/App/AppContext"
import { setFormType } from "./utils"

// Types
import { Issue } from "../../../site/tables/SiteIssuesTable/types"
import { Combined } from "../../../site/tables/SiteIssuesTable/types"
import { SiteInterface } from "@/context/App/types"

export const useSetSitesIssuesTableData = (sites: SiteInterface[]): Issue[] => { // Set table data for SitesIssuesTable
  const { dateRangeFilter, showClosedSiteIssues } = useContext(AppContext)

  const pathname = useLocation().pathname

  const combined = sites.flatMap(site => [
    ...site.ConstructionViolations || [],
    ...site.Complaints || [],
    ...site.IllicitDischarges || []
  ])

  let filtered = combined

  if(dateRangeFilter.start && dateRangeFilter.end) { // Handle date range filter
    filtered = filtered.filter(issue => {
      const date = new Date(issue.date)
      const start = new Date(dateRangeFilter.start)
      const end = new Date(dateRangeFilter.end)

      return date >= start && date <= end
    })
  }

  if(!showClosedSiteIssues) { // Handle closed issue filter
    filtered = filtered.filter(issue => !issue.closed)
  }

  const combinedArray: Issue[] = []

  filtered.forEach(issue => {
    const site = sites.find(site => site.siteId === issue.siteId) // Find site from sites[]

    const obj: Issue = {
      date: issue.date,
      site: site?.name,
      siteUUID: site?.uuid,
      responsibleParty: issue?.responsibleParty,
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