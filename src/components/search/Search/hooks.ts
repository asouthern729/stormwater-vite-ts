import { useContext, useCallback } from "react"
import SitesCtx from "@/components/sites/context"

// Types
import { ChangeEvent } from "react"

export const useHandleSearch = () => {
  const { dispatch } = useContext(SitesCtx)

  return useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }, [dispatch])
}