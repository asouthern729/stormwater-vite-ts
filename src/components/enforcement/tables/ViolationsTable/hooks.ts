import { useContext } from "react"
import EnforcementCtx from "../../context"

// Types
import { ConstructionViolationInterface, SiteInterface } from "@/context/App/types"
import { ViolationsTableData } from "./types"

export const useSetTableData = (violations: ConstructionViolationInterface[], sites: SiteInterface[]) => {
  const { dateRangeFilter, showClosedSiteIssues } = useContext(EnforcementCtx)

  let filtered: ConstructionViolationInterface[] = violations

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

  const tableData: ViolationsTableData[] = []

  filtered.forEach(issue => {
    const site = sites.find(site => site.siteId === issue.siteId) as SiteInterface // Find site from sites[]

    const primaryPermitee = site.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.company

    const obj: ViolationsTableData = {
      ...issue,
      site: site.name,
      siteUUID: site.uuid,
      primaryPermitee,
      form: 'updateSiteConstructionViolation'
    }

    tableData.push(obj)
  })

  return tableData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}