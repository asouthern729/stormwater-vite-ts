import { useContext, useMemo } from "react"
import EnforcementCtx from "../../context"
import { useSetTotalPages } from "../ViolationsContainer/hooks"

// Types
import * as AppTypes from '@/context/App/types'
import { IllicitDischargesTableDataType } from "./components"

export const useHandleTableData = (discharges: AppTypes.IllicitDischargeInterface[]) => { // Illciit discharges table data
  const { currentPage, totalPages, showClosedSiteIssues, dateRangeFilter } = useContext(EnforcementCtx)

  const tableData = useMemo(() => {
      let allDischarges: IllicitDischargesTableDataType[] = discharges.map(discharge => ({
        ...discharge,
        siteUUID: discharge.Site?.uuid,
        siteName: discharge.Site?.name,
        primaryPermitee: discharge.responsibleParty || discharge.Site?.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.company || '-'
      }))

      if(!showClosedSiteIssues) {
        allDischarges = allDischarges.filter(discharge => !discharge.closed)
      }

      if(dateRangeFilter.start && dateRangeFilter.end) {
        allDischarges = allDischarges.filter(discharge => {
          const dischargeDate = new Date(discharge.date)
          const startDate = new Date(dateRangeFilter.start)
          const endDate = new Date(dateRangeFilter.end)

          if(dischargeDate > startDate && dischargeDate < endDate) {
            return discharge
          }
        })
      }
  
      const startIndex = (currentPage - 1) * 20
      const endIndex = currentPage * 20
      
      return { data: allDischarges.slice(startIndex, endIndex), count: allDischarges.length }
    }, [discharges, currentPage, totalPages, showClosedSiteIssues, dateRangeFilter])

    useSetTotalPages(tableData.count)

    return tableData.data
}