import { useState } from "react"
import { useSetInspectorTableData, setInspectorTableRow } from "."
import styles from './InspectorTable.module.css'

// Types
import { InspectorTableProps, InspectorTableState } from "./types"

// Components
import InspectorTableYearBtns from "../../buttons/filters/InspectorTableYearBtns/InspectorTableYearBtns"

function InspectorTable({ sites }: InspectorTableProps) {
  const [state, setState] = useState<InspectorTableState>({ year: new Date().getFullYear() })

  const inspectorTableData = useSetInspectorTableData(sites, state.year)

  return (
    <div className={styles.container}>
      <div className="ml-auto">
        <InspectorTableYearBtns
          year={state.year}
          setState={setState} />
      </div>
      <table className="table table-sm text-neutral-content">
        <thead>
          <tr>
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
            return setInspectorTableRow(row)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default InspectorTable