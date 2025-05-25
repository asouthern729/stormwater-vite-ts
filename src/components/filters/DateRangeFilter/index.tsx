import styles from './DateRangeFilter.module.css'

// Components
import * as Components from './components'

function DateRangeFilter() {

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Date Range Filter</h2>

      <Components.DateRangeInputs />
      <Components.ClearBtn />
    </div>
  )
}

export default DateRangeFilter