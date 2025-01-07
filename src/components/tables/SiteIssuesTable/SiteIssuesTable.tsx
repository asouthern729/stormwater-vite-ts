import { useState, memo } from "react"
import { useSetSiteIssuesTableData } from "./hooks"
import styles from './SiteIssuesTable.module.css'

// Types
import { SiteIssuesTableProps, SiteIssuesTableState } from "./types"

// Components
import { TableBody, ShowAllIssuesBtn } from './components'

function SiteIssuesTable({ site, handleRowClick }: SiteIssuesTableProps) {
  const [state, setState] = useState<SiteIssuesTableState>({ showAll: false })

  const tableData = useSetSiteIssuesTableData(site, state.showAll)

  return (
    <div className={styles.container}>

      <table className="table table-xs text-neutral-content">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th className="text-center">Civil Penalty</th>
            <th className="text-center">SWO</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <TableBody
          issues={tableData}
          handleRowClick={handleRowClick} />
      </table>

      <ShowAllIssuesBtn
        visible={site.ConstructionViolations.length + site.Complaints.length > 5}
        showAll={state.showAll}
        setState={setState} />

    </div>
  )
}

export default memo(SiteIssuesTable)