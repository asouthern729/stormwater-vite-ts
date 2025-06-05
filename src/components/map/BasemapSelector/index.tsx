import styles from './BasemapSelector.module.css'

// Components
import * as Components from './components'

function BasemapSelector() {

  return (
    <div className="flex flex-col">
      <label htmlFor="basemap selector" className={styles.label}>Basemap</label>
      <div className={styles.container}>
        <Components.BasemapSelect />
      </div>
    </div>
  )
}

export default BasemapSelector