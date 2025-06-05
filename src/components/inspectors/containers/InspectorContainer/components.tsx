import React, { useContext, useState } from "react"
import SitesCtx from "@/components/sites/context"
import { InspectorTableProvider } from "../../tables/InspectorTable/context"
import { useReturnUserRoles } from '@/helpers/hooks'
import pinWarningIcon from '@/assets/icons/pin/warning-pin.svg'
import styles from './InspectorContainer.module.css'

// Types
import * as AppTypes from '@/context/App/types'
import { FormProps } from "@/components/enforcement/containers/ViolationsContainer/components"

// Components
import SitesActivityCalendar from "../../../sites/calendar/SitesActivityCalendar"
import InspectorTable from "../../tables/InspectorTable"
import FormContainer from "../../../form-elements/FormContainer"
import UpdateBtn from "../../../form-elements/buttons/UpdateBtn"

export const Header = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {
  const name = inspector.name.split(' ')[0]

  return (
    <div className="flex-1 flex">
      <div className={styles.header}>
        {name}'s Sites
        <img src={pinWarningIcon} alt="pin icon" className={styles.icon} />
      </div>
    </div>
  )
}

export const CalendarAndTable = ({ tableData }: { tableData: AppTypes.SiteInterface[] }) => {
  const [state, setState] = useState<{ view: 'calendar' | 'table' }>({ view: 'calendar' })

  return (
    <>
      <SwitchViewBtn onClick={() => setState(prevState => ({ view: prevState.view === 'calendar' ? 'table' : 'calendar' }))}>
        Switch To { state.view === 'calendar' ? 'Table' : 'Calendar' } View
      </SwitchViewBtn>
      <Calendar 
        visible={state.view === 'calendar'}
        tableData={tableData} />
      <Table
        visible={state.view === 'table'}
        tableData={tableData} />
    </>
  )
}

export const UpdateForm = (props: FormProps) => { // Update form
  const { formUUID } = useContext(SitesCtx)
  
  if(!formUUID) return null

  return (
    <div ref={props.formRef}>
      <FormContainer>
        {props.children}
      </FormContainer>
    </div>
  )
}

export const UpdateInspectorBtn = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {
  const { dispatch } = useContext(SitesCtx)

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

const SwitchViewBtn = ({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) => {

  return (
    <button 
      type="button"
      onClick={onClick}
      className="text-neutral-content font-sans text-lg uppercase hover:text-warning">
        {children}
    </button>
  )
}

const Calendar = ({ visible, tableData }: { visible: boolean, tableData: AppTypes.SiteInterface[] }) => {
  if(!visible) return null

  return (
    <SitesActivityCalendar sites={tableData} />
  )
}

const Table = ({ visible, tableData }: { visible: boolean, tableData: AppTypes.SiteInterface[] }) => {
  if(!visible) return null

  return (
    <InspectorTableProvider>
      <InspectorTable sites={tableData} />
    </InspectorTableProvider>
  )
}