import { useContext } from "react"
import EnforcementCtx from "@/components/enforcement/context"

export const DateRangeInputs = () => {

  return (
    <div className="flex gap-10">
      <StartInput />
      <EndInput />
    </div>
  )
}

export const ClearBtn = () => { // Clear date range filter button
  const { dateRangeFilter, dispatch } = useContext(EnforcementCtx)

  if(!dateRangeFilter.start || !dateRangeFilter.end) return null

  return (
    <ClearFilterBtn onClick={() => dispatch({ type: 'RESET_DATE_RANGE_FILTER' })}>
      Remove Date Range Filter
    </ClearFilterBtn>
  )
}

const StartInput = () => { // Date range filter start input
  const { dateRangeFilter: { start }, dispatch } = useContext(EnforcementCtx)

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="start" className="text-warning">Start:</label>
      <input 
        id="start"
        type="date"
        value={start}
        className="input input-warning bg-neutral"
        onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: e.currentTarget.value })} />
    </div>
  )
}

const EndInput = () => { // Date range filter start input
  const { dateRangeFilter: { end }, dispatch } = useContext(EnforcementCtx)

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="end" className="text-warning">End:</label>
      <input 
        id="end"
        type="date"
        value={end}
        className="input input-warning bg-neutral"
        onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: e.currentTarget.value })} />
    </div>
  )
}

type ClearFilterBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

const ClearFilterBtn = (props: ClearFilterBtnProps) => {

  return (
    <button 
      type="button"
      onClick={props.onClick}
      className="btn btn-warning btn-outline font-[play] uppercase">
        {props.children}
    </button>
  )
}