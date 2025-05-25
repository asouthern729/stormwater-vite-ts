import { useEffect, useContext, useMemo } from "react"
import AppContext from "../../../../context/App/AppContext"

// Types
import { MouseEvent } from "react"
import { ConstructionViolation, Complaint, IllicitDischarge } from "../../../../context/App/types"
import { UseScrollToFormRefProps, SetIssuesObjProps, HandleSiteIssuesTableRowClickProps, SiteForm } from "./types"

export const useScrollToFormRef = (state: UseScrollToFormRefProps['state'], formRef: UseScrollToFormRefProps['formRef']): void => {
  useEffect(() => { // Scroll to form if active
    if(state.activeForm && formRef.current) {
      setTimeout(() => {
        if(formRef?.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 500)
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.activeForm, formRef])
}

export const useSetIssuesObj = (site: SetIssuesObjProps['site']): { violations: ConstructionViolation[], complaints: Complaint[], discharges: IllicitDischarge[] } => { // Set issues object used for issues btns / indicators
  const { dateRangeFilter } = useContext(AppContext)

  const issues = useMemo(() => {
    const obj: { violations: ConstructionViolation[], complaints: Complaint[], discharges: IllicitDischarge[] } = {
      violations: [],
      complaints: [],
      discharges: []
    }
  
    if(dateRangeFilter.start && dateRangeFilter.end) { // Date range filter applied
      const filterStart = new Date(dateRangeFilter.start)
      const filterEnd = new Date(dateRangeFilter.end)
  
      obj.violations = site.ConstructionViolations.filter(violation => {
        const date = new Date(violation.date)
  
        if(date >= filterStart && date <= filterEnd) {
          return violation
        }
      })
  
      obj.complaints = site.Complaints.filter(complaint => {
        const date = new Date(complaint.date)
  
        if(date >= filterStart && date <= filterEnd) {
          return complaint
        }
      })
  
      obj.discharges = site.IllicitDischarges.filter(discharge => {
        const date = new Date(discharge.date)
  
        if(date >= filterStart && date <= filterEnd) {
          return discharge
        }
      })
    } else {
      obj.violations = site?.ConstructionViolations
      obj.complaints = site?.Complaints
      obj.discharges = site?.IllicitDischarges
    }
  
    return obj
  }, [site, dateRangeFilter.start, dateRangeFilter.end])

  return issues  
}

export const handleSiteIssuesTableRowClick = (setState: HandleSiteIssuesTableRowClickProps['setState']) => (event: MouseEvent<HTMLTableRowElement>): void => { // Handle issues table row click
  const { form, uuid } = event.currentTarget.dataset

  setState(prevState => ({ ...prevState, activeForm: form as SiteForm, formUUID: uuid }))
}