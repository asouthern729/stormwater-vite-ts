import styles from './DischargesContainer.module.css'

// Types
import { DischargesContainerProps } from "./types"

// Components
import SiteIllicitDischargeBtn from "../../buttons/filters/SiteIllicitDischargeBtn/SiteIllicitDischargeBtn"
import SitesIssuesTable from "../../tables/SitesIssuesTable/SitesIssuesTable"
import DateRangeFilter from "../../filters/DateRangeFilter/DateRangeFilter"

function DischargesContainer({ sites }: DischargesContainerProps) {

  return (
    <div className={styles.container}>
      <div className={styles.header}>Illicit Discharges</div>

      <div className="flex justify-evenly w-full">
        <SiteIllicitDischargeBtn
          discharges={sites.flatMap(site => site.IllicitDischarges)}
          disabled={true} />
      </div>

      <div className="flex flex-col gap-3">
        <DateRangeFilter />
        <SitesIssuesTable sites={sites} />
      </div>
    </div>
  )
}

export default DischargesContainer