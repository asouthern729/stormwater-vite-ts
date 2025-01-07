import { useState, useRef } from "react"
import { useSetInspectorTableData, useScrollToFormRef } from "./hooks"
import styles from './InspectorTable.module.css'

// Types
import { InspectorTableProps, InspectorTableState } from "./types"

// Components
import InspectorTableYearBtns from "../../buttons/filters/InspectorTableYearBtns/InspectorTableYearBtns"
import { CreateLogBtn, TableBody, Form } from './components'

function InspectorTable({ sites }: InspectorTableProps) {
  const [state, setState] = useState<InspectorTableState>({ year: new Date().getFullYear(), selection: [], showForm: false })

  const inspectorTableData = useSetInspectorTableData(sites, state.year)

  const tableRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state.showForm, formRef, tableRef)

  return (
    <div data-testid="inspector-table" ref={tableRef}  className={styles.container}>
      <div className="relative flex justify-between items-center w-full min-h-10">
        <CreateLogBtn
          selected={state.selection.length}
          handleClick={() => setState(prevState => ({ ...prevState, showForm: !prevState.showForm }))} />
        <div className="absolute right-0 bottom-0">
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
        <TableBody 
          tableData={inspectorTableData}
          selection={state.selection}
          setState={setState} />
      </table>

      <Form
        visible={state.showForm}
        formRef={formRef}
        selection={state.selection}
        handleCloseForm={() => setState(prevState => ({ ...prevState, showForm: false }))} />
    </div>
  )
}

export default InspectorTable