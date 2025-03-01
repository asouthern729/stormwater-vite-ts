import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import UserContext from "../../../context/User/UserContext"
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
import UpdateBtn from "../../buttons/forms/UpdateBtn/UpdateBtn"

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

  const queryClient= useQueryClient()

  if(!formUUID) return null

  return (
    <div ref={formRef}>
      <FormContainer key={`violation-${ formUUID }`}>
        <UpdateInspectorForm 
          inspector={inspector}
          handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
        <div className="mx-auto">
          <DeleteBtn
            label={!deleteBtnActive ? 'Delete Inspector' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(inspector.inspectorId, deleteBtnActive, deleteInspector, { setState, handleCloseForm: () => setState({ deleteBtnActive: false, formUUID: undefined }), invalidateQuery: () => queryClient.invalidateQueries('getInspectors') })} />
        </div>
      </FormContainer>
    </div>
  )
}

export const UpdateInspectorBtn = ({ handleClick }: { handleClick: () => void }) => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
    <div className="absolute left-0">
      <UpdateBtn
        label={'Update Inspector'}
        handleClick={handleClick} />
    </div>
  )
}