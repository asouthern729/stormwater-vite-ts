import { useContext } from "react"
import EnforcementCtx from "../../context"

// Types
import { SiteIssuesType } from "./components"

export const useFilterIssues = (issues: SiteIssuesType[]) => {
  const { dateRangeFilter } = useContext(EnforcementCtx)

  if(dateRangeFilter.start && dateRangeFilter.end) { // Date filter applied
    const start = new Date(dateRangeFilter.start)
    const end = new Date(dateRangeFilter.end)

    return issues?.filter(issue => new Date(issue?.date as string) >= start && new Date(issue?.date as string) <= end)
  }

  return issues
}