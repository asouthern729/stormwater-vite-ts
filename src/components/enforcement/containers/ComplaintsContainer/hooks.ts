import { useContext, useMemo, useState, useCallback } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import EnforcementCtx from "../../context"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import { useSetTotalPages } from "../ViolationsContainer/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'
import { ComplaintsTableDataType } from './components'

export const useHandleTableData = (complaints: AppTypes.ComplaintInterface[]) => { // Complaints table data
  const { currentPage, showClosedSiteIssues, dateRangeFilter } = useContext(EnforcementCtx)

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
    }, [complaints, currentPage, showClosedSiteIssues, dateRangeFilter])

  useSetTotalPages(tableData.count)

  return tableData.data
}

export const useHandleDeleteBtn = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { formUUID, dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteComplaint(formUUID, authHeaders(token))

      if(result.success) {
        queryClient.invalidateQueries('getComplaints')
        queryClient.invalidateQueries(['getSite', siteUUID])
        dispatch({ type: 'RESET_CTX' })
        savedPopup(result.msg)
      } else errorPopup(result.msg)
    }
  }, [state.active, enabled, token, formUUID, queryClient, siteUUID])

  const label = !state.active ? 'Delete Violation' : 'Confirm Delete'

  return { onClick, label }
}