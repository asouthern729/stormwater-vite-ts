import { useState, useRef, memo } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useScrollToFormRef, handleDeleteBtnClick } from "../../../helpers"
import { useSetSitesData } from "../SitesContainer"
import { deleteInspector } from "../../../context/App/AppActions"
import styles from './InspectorContainer.module.css'

// Types
import { MbscCalendarEvent } from '@mobiscroll/react'
import { InspectorContainerProps, InspectorContainerState } from "./types"

// Components
import SitesHeader from "../../layout/SitesHeader/SitesHeader"
import UpdateBtn from "../../buttons/forms/UpdateBtn/UpdateBtn"
import ActiveSitesBtn from '../../buttons/filters/ActiveSitesBtn/ActiveSitesBtn'
import OpenIssuesBtn from '../../buttons/filters/OpenIssuesBtn/OpenIssuesBtn'
import MapLegend from '../../map/MapLegend/MapLegend'
import MapContainer from '../../map/MapContainer/MapContainer'
import SitesTable from "../../tables/SitesTable/SitesTable"
import SitesActivityCalendar from '../../calendars/SitesActivityCalendar/SitesActivityCalendar'
import FormContainer from "../../forms/FormContainer/FormContainer"
import UpdateInspectorForm from "../../forms/update/UpdateInspectorForm/UpdateInspectorForm"
import DeleteBtn from "../../buttons/forms/DeleteBtn/DeleteBtn"

function InspectorContainer({ sites, inspector }: InspectorContainerProps) {
  const [state, setState] = useState<InspectorContainerState>({ deleteBtnActive: false, formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  const sitesArray = useSetSitesData(sites)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  useScrollToFormRef(state, formRef) 

  return (
    <div data-testid="inspector-container" className={styles.container}>

      <section className={styles.topDiv}>
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
      </section>

      <section className={styles.mapDiv}>
        <div className="absolute bottom-4 left-4 z-10">
          <MapLegend sites={sites} />
        </div>
        <MapContainer sites={sitesArray} />
        <SitesTable sites={sitesArray} />
      </section>

      <section className={styles.bottomDiv}>
        <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
          <div className={styles.header}>Sites Activity</div>
          <SitesActivityCalendar 
            sites={sitesArray}
            handleEventClick={(event: MbscCalendarEvent) => navigate(`/site/${ event.event.uuid }`)} />
        </div>
      </section>

      {state.formUUID && (
        <div ref={formRef}>
          <FormContainer key={`violation-${ state.formUUID }`}>
            <UpdateInspectorForm 
              inspector={inspector}
              resetState={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
            <div className="mx-auto">
              <DeleteBtn
                label={!state.deleteBtnActive ? 'Delete Inspector' : 'Confirm Delete'}
                handleClick={() => handleDeleteBtnClick(inspector.uuid, state.deleteBtnActive, deleteInspector, { setState, resetState: () => setState({ deleteBtnActive: false, formUUID: undefined }), invalidateQuery: () => queryClient.invalidateQueries('getInspectors') })} />
            </div>
          </FormContainer>
        </div>
      )}

    </div>
  )
}

export default memo(InspectorContainer)