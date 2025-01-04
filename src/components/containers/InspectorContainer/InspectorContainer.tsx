import { useState, useRef, memo } from "react"
import { useScrollToFormRef } from "../../../helpers"
import { useSetSitesData } from "../SitesContainer/hooks"
import styles from './InspectorContainer.module.css'

// Types
import { InspectorContainerProps, InspectorContainerState, SiteActivityCalendarViewState } from "./types"

// Components
import SitesHeader from "../../layout/SitesHeader/SitesHeader"
import UpdateBtn from "../../buttons/forms/UpdateBtn/UpdateBtn"
import ActiveSitesBtn from '../../buttons/filters/ActiveSitesBtn/ActiveSitesBtn'
import OpenIssuesBtn from '../../buttons/filters/OpenIssuesBtn/OpenIssuesBtn'
import MapLegend from '../../map/MapLegend/MapLegend'
import MapContainer from '../../map/MapContainer/MapContainer'
import SitesTable from "../../tables/SitesTable/SitesTable"
import { CalendarTable, Form } from './components'

function InspectorContainer({ sites, inspector }: InspectorContainerProps) {
  const [state, setState] = useState<InspectorContainerState>({ deleteBtnActive: false, formUUID: undefined })
  const [siteActivityView, setSiteActivityView] = useState<SiteActivityCalendarViewState>({ activeView: 'calendar' })

  const formRef = useRef<HTMLDivElement>(null)

  const sitesArray = useSetSitesData(sites)

  useScrollToFormRef(state, formRef) 

  return (
    <div data-testid="inspector-container" className={styles.container}>

      <div className={styles.topDiv}>
        <div className="absolute left-0">
          <UpdateBtn
            label={'Update Inspector'}
            handleClick={() => setState(prevState => ({ ...prevState, formUUID: sites[0].Inspector?.uuid }))} />
        </div>
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

          <button 
            type="button"
            onClick={() => setSiteActivityView(prevState => ({ activeView: prevState.activeView === 'calendar' ? 'table' : 'calendar' }))}
            className="text-neutral-content font-sans text-lg uppercase hover:text-warning">
              Switch To { siteActivityView.activeView === 'calendar' ? 'Table' : 'Calendar' } View
          </button>
          <CalendarTable
            activeView={siteActivityView.activeView}
            sitesArray={sitesArray} />
        </div>
      </div>

      <Form
        state={state}
        formRef={formRef}
        setState={setState}
        inspector={inspector} />

    </div>
  )
}

export default memo(InspectorContainer)