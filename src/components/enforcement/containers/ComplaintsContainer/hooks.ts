import { useContext, useMemo } from "react"
import EnforcementCtx from "../../context"
import { useSetTotalPages } from "../ViolationsContainer/hooks"

// Types
import { ComplaintInterface } from "@/context/App/types"
import { ComplaintsTableDataType } from './components'

export const useHandleComplaintsTableData = (complaints: ComplaintInterface[]) => { // Complaints table data
  const { currentPage } = useContext(EnforcementCtx)

  useSetTotalPages(complaints.length)

  return useMemo(() => {
      const allViolations: ComplaintsTableDataType[] = complaints.map(complaint => ({
        ...complaint,
        siteUUID: complaint.Site?.uuid,
        siteName: complaint.Site?.name,
        primaryPermittee: complaint.Site?.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.company
      }))
  
      const startIndex = (currentPage - 1) * 20
      const endIndex = currentPage * 20
      
      return allViolations.slice(startIndex, endIndex)
    }, [complaints, currentPage])
}