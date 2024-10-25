import { useState } from 'react'
import { useHandleDateRangeChange, handleDateChange } from '.'
import styles from './DateRangeFilter.module.css'

// Types
import { DateRangeFilterState } from './types'

// Components
import ClearFilterBtn from '../../buttons/filters/ClearFilterBtn/ClearFilterBtn'

function DateRangeFilter() {
  const [state, setState] = useState<DateRangeFilterState>({ start: undefined, end: undefined })

  useHandleDateRangeChange(state)

  return (
    <div data-testid="date-range-filter" className={styles.container}>
      <div className={styles.header}>Date Range Filter</div>
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <label htmlFor="start" className="text-warning">Start:</label>
          <input 
            id="start"
            type="date"
            value={state.start}
            className="input input-warning"
            onChange={(event) => handleDateChange(event, { setState })} />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="End" className="text-warning">End:</label>
          <input 
            id="end"
            type="date"
            value={state.end}
            className="input input-warning"
            onChange={(event) => handleDateChange(event, { setState })} />  
        </div>
      </div>
      
      {(state.start && state.end) && (
        <ClearFilterBtn
          label={'Remove Date Range Filter'}
          handleClick={() => setState({ start: '', end: '' })} />
      )}
    </div>
  )
}

export default DateRangeFilter