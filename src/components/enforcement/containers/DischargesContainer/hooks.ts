import { useContext, useMemo, useState, useCallback } from "react"
import { useQueryClient } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import EnforcementCtx from "../../context"
import { useSetTotalPages } from "../ViolationsContainer/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

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

export const useHandleDeleteBtn = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteIllicitDischarge(formUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
      } else errorPopup(result.msg)

      queryClient.invalidateQueries('getIllicitDischarges')
    }
  }, [state.active, enabled, token, formUUID, queryClient])

  const label = !state.active ? 'Delete Illicit Discharge' : 'Confirm Delete'

  return { onClick, label }
}