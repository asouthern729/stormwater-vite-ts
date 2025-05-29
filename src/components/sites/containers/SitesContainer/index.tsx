import { memo } from 'react'
import { useSetTableData } from './hooks'
import styles from './SitesContainer.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import MapLegend from '../../../map/MapLegend'
import SitesTable from "../../tables/SitesTable"
import SitesActivityCalendar from '../../calendar/SitesActivityCalendar'
import * as Components from './components'

function SitesContainer({ sites }: { sites: AppTypes.SiteInterface[] }) {
  const tableData = useSetTableData(sites) 

  return (
    <div className={styles.container}>

      <div className={styles.topDiv}>
        <div className="absolute flex gap-4 right-0">
          <Components.ActiveSitesBtn />
          <Components.OpenIssuesBtn />
        </div>
      </div>

      <div className={styles.mapDiv}>
        <Components.Map sites={sites} />
        <div className="absolute bottom-4 left-4 z-10">
          <MapLegend sites={sites} />
        </div>

        <SitesTable sites={tableData} />
      </div>

      <div className={styles.bottomDiv}>
        <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
          <h3 className={styles.header}>Sites Activity</h3>

          <SitesActivityCalendar sites={tableData} />
        </div>
      </div>

    </div>
  )
}

export default memo(SitesContainer)