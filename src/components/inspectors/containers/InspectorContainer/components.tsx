import { useQueryClient } from "react-query"
import { useReturnUserRoles } from '@/helpers/hooks'
import { deleteInspector } from "@/context/App/AppActions"

// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { SiteInterface, InspectorInterface } from "../../../../context/App/types"
import { InspectorContainerState } from "./types"

// Components
import SitesActivityCalendar from "../../../sites/calendar/SitesActivityCalendar"
import InspectorTable from "../../tables/InspectorTable/InspectorTable"
import FormContainer from "../../../form-elements/FormContainer"
import UpdateInspectorForm from "../../forms/update/UpdateInspectorForm/UpdateInspectorForm"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn/DeleteBtn"
import UpdateBtn from "../../../form-elements/buttons/UpdateBtn/UpdateBtn"

export const CalendarTable = ({ activeView, sitesArray }: { activeView: "calendar" | "table", sitesArray: SiteInterface[] }) => { // Calendar or table view

  if(activeView === 'calendar') { // Show calendar
    return (
      <SitesActivityCalendar sites={sitesArray} />
    )
  }

  return <InspectorTable sites={sitesArray} /> // Show table
}

export const Form = ({ state, formRef, setState, inspector }: { state: InspectorContainerState, formRef: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<InspectorContainerState>>, inspector: InspectorInterface }) => { // Update inspector form
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
  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <div className="absolute left-0">
      <UpdateBtn
        label={'Update Inspector'}
        handleClick={handleClick} />
    </div>
  )
}