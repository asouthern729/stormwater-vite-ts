import { useContext, useCallback } from "react"
import ContactsCtx from "../../context"

// Types
import { ChangeEvent } from "react"

export const useHandleSearch = () => {
  const { dispatch } = useContext(ContactsCtx)

  return useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }, [dispatch])
}