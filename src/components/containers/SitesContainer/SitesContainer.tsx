import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetSitesData } from './hooks'
import styles from './SitesContainer.module.css'

// Types
import { MbscCalendarEvent } from '@mobiscroll/react'
import { SitesContainerProps } from "./types"

// Components
import SitesHeader from '../../layout/SitesHeader/SitesHeader'
import ActiveSitesBtn from '../../buttons/filters/ActiveSitesBtn/ActiveSitesBtn'
import OpenIssuesBtn from '../../buttons/filters/OpenIssuesBtn/OpenIssuesBtn'
import MapLegend from '../../map/MapLegend/MapLegend'
import MapContainer from '../../map/MapContainer/MapContainer'
import SitesTable from "../../tables/SitesTable/SitesTable"
import SitesActivityCalendar from '../../calendars/SitesActivityCalendar/SitesActivityCalendar'

function SitesContainer({ sites }: SitesContainerProps) {
  const sitesArray = useSetSitesData(sites) 

  const navigate = useNavigate()

  return (
    <div data-testid="sites-container" className={styles.container}>

      <div className={styles.topDiv}>
        <SitesHeader />

        <div className="absolute flex gap-4 right-0">
          <ActiveSitesBtn />
          <OpenIssuesBtn />
        </div>
      </div>

      <div className={styles.mapDiv}>
        <div className="absolute bottom-4 left-4 z-10">
          <MapLegend sites={sites} />
        </div>

        <MapContainer sites={sitesArray} />
        <SitesTable sites={sitesArray} />
      </div>

      <div className={styles.bottomDiv}>
        <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
          <h3 className={styles.header}>Sites Activity</h3>

          <SitesActivityCalendar 
            sites={sitesArray}
            handleEventClick={(event: MbscCalendarEvent) => navigate(`/site/${ event.event.uuid }`)} />
        </div>
      </div>

    </div>
  )
}

export default memo(SitesContainer)