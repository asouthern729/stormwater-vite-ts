import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { handleDeleteBtnClick } from "../../../helpers"
import { deleteInspector } from "../../../context/App/AppActions"

// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { MbscCalendarEvent } from "@mobiscroll/react"
import { Site, Inspector } from "../../../context/App/types"
import { InspectorContainerState } from "./types"

// Components
import SitesActivityCalendar from "../../calendars/SitesActivityCalendar/SitesActivityCalendar"
import InspectorTable from "../../tables/InspectorTable/InspectorTable"
import FormContainer from "../../forms/FormContainer/FormContainer"
import UpdateInspectorForm from "../../forms/update/UpdateInspectorForm/UpdateInspectorForm"
import DeleteBtn from "../../buttons/forms/DeleteBtn/DeleteBtn"

export const CalendarTable = ({ activeView, sitesArray }: { activeView: "calendar" | "table", sitesArray: Site[] }) => { // Calendar or table view
  const navigate = useNavigate()

  if(activeView === 'calendar') { // Show calendar
    return (
      <SitesActivityCalendar 
        sites={sitesArray}
        handleEventClick={(event: MbscCalendarEvent) => navigate(`/site/${ event.event.uuid }`)} />
    )
  }

  return <InspectorTable sites={sitesArray} /> // Show table
}

export const Form = ({ state, formRef, setState, inspector }: { state: InspectorContainerState, formRef: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<InspectorContainerState>>, inspector: Inspector }) => { // Update inspector form
  const { formUUID, deleteBtnActive } = state

  if(!formUUID) return null

  const queryClient= useQueryClient()

  return (
    <div ref={formRef}>
      <FormContainer key={`violation-${ formUUID }`}>
        <UpdateInspectorForm 
          inspector={inspector}
          handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
        <div className="mx-auto">
          <DeleteBtn
            label={!deleteBtnActive ? 'Delete Inspector' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(inspector.uuid, deleteBtnActive, deleteInspector, { setState, handleCloseForm: () => setState({ deleteBtnActive: false, formUUID: undefined }), invalidateQuery: () => queryClient.invalidateQueries('getInspectors') })} />
        </div>
      </FormContainer>
    </div>
  )
}