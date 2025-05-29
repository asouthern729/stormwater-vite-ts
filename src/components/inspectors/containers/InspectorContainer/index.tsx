import { useRef, memo } from "react"
import { useScrollToFormRef } from "@/helpers/hooks"
import { useSetSitesData } from "../../../sites/containers/SitesContainer/hooks"
import styles from './InspectorContainer.module.css'

// Types
import * as Types from '@/context/App/types'
import { InspectorContainerProps, InspectorContainerState, SiteActivityCalendarViewState } from "./types"

// Components
import SitesHeader from "../../../layout/SitesHeader/SitesHeader"
import { ActiveSitesBtn, OpenIssuesBtn } from "../../../sites/containers/SitesContainer/components"
import MapLegend from '../../../map/MapLegend'
import MapContainer from '../../../map/MapContainer'
import SitesTable from "../../../sites/tables/SitesTable"
import { CalendarTable, Form, UpdateInspectorBtn } from './components'

function InspectorContainer({ sites, inspector }: { sites: Types.SiteInterface[], inspector: Types.InspectorInterface }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef) 

  const sitesArray = useSetSitesData(sites)

  return (
    <div className={styles.container}>

      <div className={styles.topDiv}>
        <UpdateInspectorBtn handleClick={() => setState(prevState => ({ ...prevState, formUUID: sites[0].Inspector?.uuid }))} />
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