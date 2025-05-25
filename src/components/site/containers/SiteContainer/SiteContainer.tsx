import { useState, useRef, useContext, memo } from 'react'
import AppContext from '../../../../context/App/AppContext'
import { useScrollToFormRef, useSetIssuesObj, handleSiteIssuesTableRowClick } from '.'
import styles from './SiteContainer.module.css'

// Types
import { MbscCalendarEvent } from '@mobiscroll/react'
import { SiteContainerProps, SiteContainerState } from "./types"

// Components
import SiteHeader from '../../SiteHeader/SiteHeader'
import MapContainer from "../../../map/MapContainer"
import SiteDetails from '../../SiteDetails/SiteDetails'
import SitesActivityCalendar from '../../../sites/calendar/SitesActivityCalendar'
import SiteViolationsBtn from '../../../enforcement/indicators/SiteViolationsIndicator'
import SiteComplaintsBtn from '../../../enforcement/indicators/SiteComplaintsIndicator/SiteComplaintsIndicator'
import SiteIllicitDischargeBtn from '../../../enforcement/indicators/llicitDischargesIndicator'
import DateRangeFilter from '../../../filters/DateRangeFilter'
import SiteIssuesTable from '../../tables/SiteIssuesTable/SiteIssuesTable'
import SiteContactsTable from '../../../contacts/tables/SiteContactsTable/SiteContactsTable'
import { Form, Buttons } from './components'

function SiteContainer({ site }: SiteContainerProps) {
  const { showClosedSiteIssues, dispatch } = useContext(AppContext)

  const [state, setState] = useState<SiteContainerState>({ activeForm: null, formDate: undefined, deleteBtnActive: false, formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  const issuesObj = useSetIssuesObj(site)

  return (
    <div data-testid="site-container" className="flex flex-col gap-10">
      <SiteHeader site={site} />
      <div className={styles.container}>

        <div className="flex flex-col gap-10 w-full 2xl:w-2/3">
          <div className={styles.startDiv}>
            <Buttons
              handleUpdateBtnClick={() => setState(prevState => ({ ...prevState, activeForm: 'updateSite' }))}
              disabled={!!state.activeForm} />

            <div className={styles.mapDiv}>
              <MapContainer
                sites={[site]}
                type={'default'}
                zoom={14} />
                <div className={styles.siteDetails}>
                  <SiteDetails site={site} />
                </div>
            </div>

          </div>
          <SiteContactsTable siteContacts={site.SiteContacts} />
        </div>
        

        <div className={styles.endDiv}>

          <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
            <h3 className={styles.header}>Site Activity</h3>

            <SitesActivityCalendar sites={[site]} />
          </div>

          <div className={styles.violationsDiv}>
            <h3 className={styles.header}>Site Issues</h3>

            <div className="flex justify-evenly w-full">
              <SiteViolationsBtn violations={issuesObj.violations} />
              <SiteComplaintsBtn complaints={issuesObj.complaints} />
              <SiteIllicitDischargeBtn discharges={issuesObj.discharges} />
            </div>

            <DateRangeFilter />

            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center text-neutral-content ml-auto w-fit">
                <label>Show Closed:</label>
                <input 
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  checked={showClosedSiteIssues}
                  onChange={() => dispatch({ type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES', payload: undefined })} />
              </div>
            
              <SiteIssuesTable 
                site={site}
                handleRowClick={handleSiteIssuesTableRowClick(setState)} />
            </div>
          </div>

        </div>
        
      </div>

      <Form
        state={state}
        setState={setState}
        formRef={formRef}
        site={site} />
        
    </div>
  )
}

export default memo(SiteContainer)