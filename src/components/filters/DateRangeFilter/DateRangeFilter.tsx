import { useState } from 'react'
import { useHandleDateRangeChange } from './hooks'
import styles from './DateRangeFilter.module.css'

// Types
import { DateRangeFilterState } from './types'

// Components
import { DateRangeInputs, ClearBtn } from './components'

function DateRangeFilter() {
  const [state, setState] = useState<DateRangeFilterState>({ start: undefined, end: undefined })

  useHandleDateRangeChange(state)

  return (
    <div data-testid="date-range-filter" className={styles.container}>
      <h2 className={styles.header}>Date Range Filter</h2>

      <DateRangeInputs
        state={state}
        setState={setState} />
      
      <ClearBtn
        visible={!!state.start && !!state.end}
        resetState={() => setState({ start: undefined, end: undefined })} />
    </div>
  )
}

export default DateRangeFilter