import { useContext, useCallback, useEffect } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseHandleDateRangeChangeProps, HandleDateChangeProps } from "./types"

export const useHandleDateRangeChange = (state: UseHandleDateRangeChangeProps['state']) => { // Set date range to ctx on change
  const { dispatch } = useContext(AppContext)

  const cb = useCallback(() => {
    if(state.start && state.end) {
      dispatch({ type: 'SET_DATE_RANGE_FILTER', payload: state })
    } else dispatch({ type: 'SET_DATE_RANGE_FILTER', payload: { start: undefined, end: undefined } })
  }, [state])

  useEffect(() => {
    cb()
  }, [state])
}

export const handleDateChange = (event: HandleDateChangeProps['event'], options: HandleDateChangeProps['options']): void => { // Handle date input change
  const { setState } = options

  const value = event.currentTarget.value
  const target = event.currentTarget.id

  if(value) {
    setState(prevState => ({ ...prevState, [target]: value }))
  }
}