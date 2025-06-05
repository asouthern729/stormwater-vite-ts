import { useContext, useMemo } from "react"
import EnforcementCtx from "../../context"
import { useSetTotalPages } from "../ViolationsContainer/hooks"

// Types
import * as AppTypes from '@/context/App/types'
import { ComplaintsTableDataType } from './components'

export const useHandleTableData = (complaints: AppTypes.ComplaintInterface[]) => { // Complaints table data
  const { currentPage, totalPages, showClosedSiteIssues, dateRangeFilter } = useContext(EnforcementCtx)

  const tableData = useMemo(() => {
      let allComplaints: ComplaintsTableDataType[] = complaints.map(complaint => ({
        ...complaint,
        siteUUID: complaint.Site?.uuid,
        siteName: complaint.Site?.name,
        primaryPermitee: complaint.responsibleParty || complaint.Site?.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.company || '-'
      }))

      if(!showClosedSiteIssues) {
        allComplaints = allComplaints.filter(complaint => !complaint.closed)
      }

      if(dateRangeFilter.start && dateRangeFilter.end) {
        allComplaints = allComplaints.filter(complaint => {
          const complaintDate = new Date(complaint.date)
          const startDate = new Date(dateRangeFilter.start)
          const endDate = new Date(dateRangeFilter.end)

          if(complaintDate > startDate && complaintDate < endDate) {
            return complaint
          }
        })
      }
  
      const startIndex = (currentPage - 1) * 20
      const endIndex = currentPage * 20
      
      return { data: allComplaints.slice(startIndex, endIndex), count: allComplaints.length }
    }, [complaints, currentPage, totalPages, showClosedSiteIssues, dateRangeFilter])

  useSetTotalPages(tableData.count)

  return tableData.data
}