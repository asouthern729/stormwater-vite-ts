// Types
import { ChangeEvent, SetStateAction, Dispatch } from "react"

export interface DateRangeFilterState { // DateRangeFilter state obj
  start: string | undefined
  end: string | undefined
}

export interface UseHandleDateRangeChangeProps { // useHandleDateRangeChange hook props
  state: DateRangeFilterState
}

export interface HandleDateChangeProps { // handleDateChange fn props
  event: ChangeEvent<HTMLInputElement>
  options: {
    setState: Dispatch<SetStateAction<DateRangeFilterState>>
  }
}