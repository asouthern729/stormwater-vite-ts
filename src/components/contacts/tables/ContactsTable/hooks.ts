import { useContext, useMemo, useCallback } from "react"
import ContactsCtx from "../../context"
import { useReturnUserRoles } from "@/helpers/hooks"

// Types
import { ContactInterface } from "@/context/App/types"

export const useHandleTableData = (contacts: ContactInterface[]) => {
  const { currentPage } = useContext(ContactsCtx)

  return useMemo(() => {
    const startIndex = (currentPage - 1) * 20
    const endIndex = currentPage * 20
    
    return contacts.slice(startIndex, endIndex)
  }, [contacts, currentPage])
}

export const useOnTableRowClick = (uuid: string) => {
  const { dispatch } = useContext(ContactsCtx)

  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) {
    return () => null
  }

  return () => dispatch({ type: 'SET_FORM_UUID', payload: uuid })
}

export const useHandleNavBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(ContactsCtx)

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