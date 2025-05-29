import { useContext, useCallback, useMemo, useEffect } from "react"
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

  useSetTotalPages(violations.length)

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

export const useSetTotalPages = (count: number) => { // Set total pages to ctx
  const { dispatch } = useContext(EnforcementCtx)

  dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(count / 20) })
}

export const useResetCtx = () => { // Reset EnforcementCtx on enforcement page change
  const { dispatch } = useContext(EnforcementCtx)

  useEffect(() => {
    return () => dispatch({ type: 'RESET_CTX' })
  }, [dispatch])
}