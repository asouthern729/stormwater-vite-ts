import { useState, useRef } from "react"
import { useSetInspectorTableData, setInspectorTableRow, useScrollToFormRef } from "."
import styles from './InspectorTable.module.css'

// Types
import { InspectorTableProps, InspectorTableState } from "./types"

// Components
import InspectorTableYearBtns from "../../buttons/filters/InspectorTableYearBtns/InspectorTableYearBtns"
import CreateSiteLogBtn from "../../buttons/forms/CreateSiteLogBtn/CreateSiteLogBtn"
import FormContainer from "../../forms/FormContainer/FormContainer"
import CreateMultipleSiteLogsForm from "../../forms/create/CreateMultipleSiteLogsForm/CreateMultipleSiteLogsForm"

function InspectorTable({ sites }: InspectorTableProps) {
  const [state, setState] = useState<InspectorTableState>({ year: new Date().getFullYear(), selection: [], showForm: false })

  const inspectorTableData = useSetInspectorTableData(sites, state.year)

  const tableRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state.showForm, formRef, tableRef)

  return (
    <div data-testid="inspector-table" ref={tableRef}  className={styles.container}>
      <div className="relative flex justify-between items-center w-full min-h-10">
        {state.selection.length > 0 && (
          <div className="mx-auto">
            <CreateSiteLogBtn 
              selected={state.selection.length}
              handleClick={() => setState(prevState => ({ ...prevState, showForm: !prevState.showForm }))} />
          </div>
        )}
        <div className="absolute right-0">
          <InspectorTableYearBtns
            year={state.year}
            setState={setState} />
        </div>
      </div>
      <table className="table table-sm text-neutral-content">
        <thead>
          <tr>
            <th>Create Site Log</th>
            <th>Site</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Aug</th>
            <th>Sep</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dec</th>
          </tr>
        </thead>
        <tbody>
          {inspectorTableData.map(row => {
            return setInspectorTableRow(row, state.selection, { setState })
          })}
        </tbody>
      </table>

      {state.showForm && (
        <div ref={formRef} className="w-full">
          <FormContainer>
            <CreateMultipleSiteLogsForm 
              siteIds={state.selection}
              handleCloseForm={() => setState(prevState => ({ ...prevState, showForm: false }))} />
          </FormContainer>
        </div>
      )}
    </div>
  )
}

export default InspectorTable