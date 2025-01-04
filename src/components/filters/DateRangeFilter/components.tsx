import { handleDateChange } from "./utils"

// Types
import { Dispatch, SetStateAction } from "react"
import { DateRangeFilterState } from "./types"

// Components
import ClearFilterBtn from "../../buttons/filters/ClearFilterBtn/ClearFilterBtn"

export const DateRangeInputs = ({ state, setState }: { state: DateRangeFilterState, setState: Dispatch<SetStateAction<DateRangeFilterState>> }) => {

  return (
    <div className="flex gap-10">
      <StartInput
        start={state.start}
        setState={setState} />
      <EndInput
        end={state.end}
        setState={setState} />
    </div>
  )
}

export const ClearBtn = ({ visible, resetState }: { visible: boolean, resetState: () => void }) => { // Clear date range filter button
  if(!visible) return null

  return (
    <ClearFilterBtn
      label={'Remove Date Range Filter'}
      handleClick={resetState} />
  )
}

const StartInput = ({ start, setState }: { start: string | undefined, setState: Dispatch<SetStateAction<DateRangeFilterState>> }) => { // Date range filter start input
  
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="start" className="text-warning">Start:</label>
      <input 
        id="start"
        type="date"
        value={start}
        className="input input-warning"
        onChange={(event) => handleDateChange(event, { setState })} />
    </div>
  )
}

const EndInput = ({ end, setState }: { end: string | undefined, setState: Dispatch<SetStateAction<DateRangeFilterState>> }) => { // Date range filter start input
  
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="start" className="text-warning">End:</label>
      <input 
        id="end"
        type="date"
        value={end}
        className="input input-warning"
        onChange={(event) => handleDateChange(event, { setState })} />
    </div>
  )
}