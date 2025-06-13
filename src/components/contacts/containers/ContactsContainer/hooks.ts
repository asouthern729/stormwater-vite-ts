import { useContext, useCallback, useMemo, useEffect } from "react"
import { useReturnUserRoles } from "@/helpers/hooks"
import ContactsCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleNavBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(ContactsCtx)

  const handlePrevBtn = useCallback(() => {
    if(currentPage !== 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
    }
  }, [currentPage, dispatch])

  const handleNextBtn = useCallback(() => {
    if(currentPage !== totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
    }
  }, [currentPage, totalPages, dispatch])

  const label = `Page ${ currentPage } / ${ totalPages }`

  return { handlePrevBtn, handleNextBtn, label }
}

export const useHandleTableData = (contacts: AppTypes.ContactInterface[]) => {
  const { currentPage, searchValue } = useContext(ContactsCtx)

  useSetTotalPages(contacts.length)

  return useMemo(() => {
    let contactsArray: AppTypes.ContactInterface[]

    if(searchValue) {
      const regex = new RegExp(searchValue, 'i')

      contactsArray = contacts.filter(contact => {
        const searchableProps: (keyof AppTypes.ContactInterface)[] = ['name', 'company']

        return searchableProps.some(prop => {
          const value = contact[prop]
          return value && regex.test(value as string)
        })
      })
    } else contactsArray = contacts

    const startIndex = (currentPage - 1) * 50
    const endIndex = currentPage * 50

    return contactsArray.slice(startIndex, endIndex)
  }, [contacts, currentPage, searchValue])
}

export const useScrollToFormRef = (formRef: React.RefObject<HTMLDivElement>) => {
  const { formUUID } = useContext(ContactsCtx)

  useEffect(() => { // Scroll to form if active
    if(formUUID && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [formUUID, formRef])
}

export const useOnTableRowClick = (uuid: string) => {
  const { dispatch } = useContext(ContactsCtx)

  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) {
    return () => null
  }

  return () => dispatch({ type: 'SET_FORM_UUID', payload: uuid })
}

const useSetTotalPages = (count: number) => { // Set total pages to ctx
  const { dispatch } = useContext(ContactsCtx)

  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(count / 50) })
  }, [count, dispatch])
}