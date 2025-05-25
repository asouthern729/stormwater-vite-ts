import { useContext, useMemo } from "react"
import EnforcementCtx from "../../context"

// Types
import { IllicitDischargeInterface } from "@/context/App/types"
import { IllicitDischargesTableDataType } from "./components"

export const useHandleDischargesTableData = (discharges: IllicitDischargeInterface[]) => { // Illciit discharges table data
  const { currentPage } = useContext(EnforcementCtx)

  return useMemo(() => {
      const allViolations: IllicitDischargesTableDataType[] = discharges.map(discharge => ({
        ...discharge,
        siteUUID: discharge.Site?.uuid,
        siteName: discharge.Site?.name,
        primaryPermittee: discharge.Site?.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.company
      }))
  
      const startIndex = (currentPage - 1) * 20
      const endIndex = currentPage * 20
      
      return allViolations.slice(startIndex, endIndex)
    }, [discharges, currentPage])
}