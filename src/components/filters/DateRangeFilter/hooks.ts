import { useContext, useCallback, useEffect } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseHandleDateRangeChangeProps } from "./types"

export const useHandleDateRangeChange = (state: UseHandleDateRangeChangeProps['state']): void => { // Set date range to ctx on change
  const { dispatch } = useContext(AppContext)

  const cb = useCallback(() => {
    if(state.start && state.end) {
      dispatch({ type: 'SET_DATE_RANGE_FILTER', payload: state })
    } else dispatch({ type: 'SET_DATE_RANGE_FILTER', payload: { start: undefined, end: undefined } })
  }, [state, dispatch])

  useEffect(() => {
    cb()
  }, [cb])
}