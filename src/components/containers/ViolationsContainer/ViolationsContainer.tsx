import styles from './ViolationsContainer.module.css'

// Types
import { ViolationsContainerProps } from "./types"

// Components
import SiteViolationsBtn from '../../buttons/filters/SiteViolationsBtn/SiteViolationsBtn'
import SitesIssuesTable from '../../tables/SitesIssuesTable/SitesIssuesTable'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'

function ViolationsContainer({ sites }: ViolationsContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Construction Violations</div>

      <div className="flex justify-evenly w-full">
        <SiteViolationsBtn 
          violations={sites.flatMap(site => site.ConstructionViolations)}
          disabled={true} />
      </div>

      <div className="flex flex-col gap-3">
        <DateRangeFilter />
        <SitesIssuesTable sites={sites} />
      </div>
    </div>
  )
}

export default ViolationsContainer