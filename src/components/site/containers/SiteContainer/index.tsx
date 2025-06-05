import { memo } from 'react'
import styles from './SiteContainer.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import SiteDetails from '../../details/SiteDetails'
import SitesActivityCalendar from '@/components/sites/calendar/SitesActivityCalendar'
import DateRangeFilter from '@/components/enforcement/filters/DateRangeFilter'
import SiteIssuesTable from '../../tables/SiteIssuesTable/SiteIssuesTable'
import SiteContactsTable from '../../tables/SiteContactsTable'
import * as Components from './components'

function SiteContainer({ site }: { site: AppTypes.SiteInterface }) {

  return (
    <div className="flex flex-col gap-10">
      <Components.Header site={site} />
      <div className={styles.container}>
        <div className="flex flex-col gap-10 w-full 2xl:w-2/3">
          <div className={styles.startDiv}>
            <Components.Buttons />

            <div className={styles.mapDiv}>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <SiteDetails site={site} />
              </div>
              {/* TODO future Site Map */}
            </div>

          </div>
          <SiteContactsTable siteContacts={site.SiteContacts || []} />
        </div>
        

        <div className={styles.endDiv}>
          <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
            <h3 className={styles.header}>Site Activity</h3>

            <SitesActivityCalendar sites={[site]} />
          </div>

          <div className={styles.violationsDiv}>
            <h3 className={styles.header}>Site Issues</h3>

            <Components.EnforcementIndicators site={site} />
            <DateRangeFilter />

            <div className="flex flex-col gap-3">
              <Components.SiteIssuesCheckbox />
            
              <SiteIssuesTable site={site} />
            </div>
          </div>

        </div>
      </div>

      <Components.Form site={site} />
        
    </div>
  )
}

export default memo(SiteContainer)