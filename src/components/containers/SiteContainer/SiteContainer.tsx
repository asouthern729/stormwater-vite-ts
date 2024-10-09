import { useState, useRef, useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import { useScrollToFormRef, useSetIssuesObj, handleSiteIssuesTableRowClick } from '.'
import styles from './SiteContainer.module.css'

// Types
import { MbscCalendarEvent } from '@mobiscroll/react'
import { SiteContainerProps, SiteContainerState } from "./types"

// Components
import SiteHeader from '../../site/SiteHeader/SiteHeader'
import MapContainer from "../../map/MapContainer/MapContainer"
import SiteDetails from '../../site/SiteDetails/SiteDetails'
import SitesActivityCalendar from '../../calendars/SitesActivityCalendar/SitesActivityCalendar'
import SiteViolationsBtn from '../../buttons/filters/SiteViolationsBtn/SiteViolationsBtn'
import SiteComplaintsBtn from '../../buttons/filters/SiteComplaintsBtn/SiteComplaintsBtn'
import SiteIllicitDischargeBtn from '../../buttons/filters/SiteIllicitDischargeBtn/SiteIllicitDischargeBtn'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'
import SiteIssuesTable from '../../tables/SiteIssuesTable/SiteIssuesTable'
import SiteContactsTable from '../../tables/SiteContactsTable/SiteContactsTable'
import BackToHomeBtn from '../../buttons/nav/BackToHomeBtn/BackToHomeBtn'
import UpdateBtn from '../../buttons/forms/UpdateBtn/UpdateBtn'
import SetSiteForm from '../../forms/SetSiteForm/SetSiteForm'

function SiteContainer({ site }: SiteContainerProps) {
  const { showClosedSiteIssues, dispatch } = useContext(AppContext)

  const [state, setState] = useState<SiteContainerState>({ activeForm: null, formDate: undefined, deleteBtnActive: false, formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  const issuesObj = useSetIssuesObj(site)

  return (
    <div className="flex flex-col gap-10">
      <SiteHeader site={site} />
      <div className={styles.container}>

        <section className="flex flex-col gap-10 w-full 2xl:w-2/3">
          <div className={styles.startDiv}>
            <div className="flex gap-2 w-fit 2xl:flex-col 2xl:w-full 2xl:gap-4">
              <BackToHomeBtn />
              <UpdateBtn 
                label={'Update Site'}
                handleClick={() => setState(prevState => ({ ...prevState, activeForm: 'updateSite' }))}
                disabled={!!state.activeForm} />
            </div>

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
        </section>
        

        <section className={styles.endDiv}>
          <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
            <div className={styles.header}>Site Activity</div>
            <SitesActivityCalendar 
              sites={[site]}
              handleEventClick={(event: MbscCalendarEvent) => setState(prevState => ({ ...prevState, activeForm: event.event.form, formUUID: event.event.formUUID }))}
              handleCellClick={(event: MbscCalendarEvent) => setState(prevState => ({ ...prevState, activeForm: 'createSiteLog', formDate: event.date?.toString() }))} />
          </div>
          <div className={styles.violationsDiv}>
            <div className={styles.header}>Site Issues</div>

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
        </section>
        
      </div>

      {state.activeForm && (
        <div ref={formRef}>
          <SetSiteForm
            state={state}
            site={site}
            setState={setState} />
        </div>
      )}
        
    </div>
  )
}

export default SiteContainer