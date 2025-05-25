import { useContext, useCallback, useMemo } from "react"
import EnforcementCtx from "../../context"

// Types
import { ConstructionViolationInterface } from "@/context/App/types"
import { ViolationTableDataType } from "./components"

export const useHandleNavBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(EnforcementCtx)

  const handlePrevBtn = useCallback(() => {
    if(currentPage !== 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
    }
  }, [currentPage])

  const handleNextBtn = useCallback(() => {
    if(currentPage !== currentPage) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
    }
  }, [currentPage, totalPages])

  return { handlePrevBtn, handleNextBtn }
}

export const useHandleTableRowClick = (uuid: string) => {
  const { dispatch } = useContext(EnforcementCtx)

  return () => dispatch({ type:  'SET_FORM_UUID', payload: uuid })
}

export const useHandleViolationsTableData = (violations: ConstructionViolationInterface[]) => { // Construction violations table data
  const { currentPage } = useContext(EnforcementCtx)

  return useMemo(() => {
    const allViolations: ViolationTableDataType[] = violations.map(violation => ({
      ...violation,
      siteUUID: violation.Site?.uuid,
      siteName: violation.Site?.name,
      primaryPermittee: violation.Site?.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.company
    }))

    const startIndex = (currentPage - 1) * 20
    const endIndex = currentPage * 20
    
    return allViolations.slice(startIndex, endIndex)
  }, [violations, currentPage])
}