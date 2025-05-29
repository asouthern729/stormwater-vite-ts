import { useContext } from "react"
import { useQueryClient } from "react-query"
import InspectorsCtx from "../../context"
import { useReturnUserRoles } from '@/helpers/hooks'
import { deleteInspector } from "@/context/App/AppActions"

// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import * as AppTypes from '@/context/App/types'
import { InspectorContainerState } from "./types"

// Components
import SitesActivityCalendar from "../../../sites/calendar/SitesActivityCalendar"
import InspectorTable from "../../tables/InspectorTable/InspectorTable"
import FormContainer from "../../../form-elements/FormContainer"
import UpdateInspectorForm from "../../forms/update/UpdateInspectorForm/UpdateInspectorForm"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn"
import UpdateBtn from "../../../form-elements/buttons/UpdateBtn/UpdateBtn"

export const CalendarTable = ({ activeView, sitesArray }: { activeView: "calendar" | "table", sitesArray: AppTypes.SiteInterface[] }) => { // Calendar or table view

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

export const UpdateInspectorBtn = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {
  const { dispatch } = useContext(InspectorsCtx)

  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <div className="absolute left-0">
      <UpdateBtn
        label={'Update Inspector'}
        handleClick={() => dispatch({ type: 'SET_FORM_UUID', payload: inspector.uuid })} />
    </div>
  )
}