import { useContext, useState, useRef } from "react"
import InspectorCtx from "../../context"
import { InspectorTableProvider } from "../../tables/InspectorTable/context"
import { useReturnUserRoles } from '@/helpers/hooks'
import { useSetInspectorMapView } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'
import { FormProps } from "@/components/enforcement/containers/ViolationsContainer/components"

// Components
import SitesActivityCalendar from "../../../sites/calendar/SitesActivityCalendar"
import InspectorTable from "../../tables/InspectorTable"
import FormContainer from "../../../form-elements/FormContainer"
import UpdateBtn from "../../../form-elements/buttons/UpdateBtn"
import { MapLoading } from "@/components/sites/containers/SitesContainer/components"
import BasemapSelector from "@/components/map/BasemapSelector"
import MapLegend from "@/components/map/MapLegend"

export const Map = ({ sites }: { sites: AppTypes.SiteInterface[] }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  const isLoaded = useSetInspectorMapView(mapRef, sites)

  return (
    <div className="flex-1 h-full bg-neutral">
      <div ref={mapRef} className="relative w-full h-full">
        <MapLoading isLoaded={isLoaded} />
        <div className="absolute top-2 right-4 z-10">
          <BasemapSelector />
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <MapLegend sites={sites} />
        </div>
      </div>
    </div>
  )
}

export const Header = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {
  const name = inspector.name.split(' ')[0]

  return (
    <div className="flex-1 flex">
      <h2 className="text-neutral-content font-[shrikhand] text-5xl m-auto pb-10">{name}'s Sites</h2>
    </div>
  )
}

export const CalendarAndTable = ({ tableData }: { tableData: AppTypes.SiteInterface[] }) => {
  const [state, setState] = useState<{ view: 'calendar' | 'table' }>({ view: 'calendar' })

  const label = state.view === 'calendar' ? 'Switch To Table View' : 'Switch To Calendar View'

  return (
    <>
      <SwitchViewBtn onClick={() => setState(prevState => ({ view: prevState.view === 'calendar' ? 'table' : 'calendar' }))}>
        {label}
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
  const { inspectorUUID } = useContext(InspectorCtx)
  
  if(!inspectorUUID) return null

  return (
    <div ref={props.formRef}>
      <FormContainer>
        {props.children}
      </FormContainer>
    </div>
  )
}

export const UpdateInspectorBtn = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {
  const { dispatch } = useContext(InspectorCtx)

  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <UpdateBtn onClick={() => dispatch({ type: 'SET_INSPECTOR_UUID', payload: inspector.uuid })}>
      Update Inspector
    </UpdateBtn>
  )
}

const SwitchViewBtn = ({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) => {

  return (
    <button 
      type="button"
      onClick={onClick}
      className="btn btn-ghost text-neutral-content font-[play] text-lg uppercase m-auto w-fit hover:text-neutral">
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