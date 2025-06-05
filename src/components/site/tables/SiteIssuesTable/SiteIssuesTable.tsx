import { useState, memo } from "react"
import { useReturnUserRoles } from "@/helpers/hooks"
import { useSetSiteIssuesTableData } from "./hooks"
import styles from './SiteIssuesTable.module.css'

// Types
import * as AppTypes from '@/context/App/types'
import { SiteIssuesTableProps, SiteIssuesTableState } from "./types"

// Components
import { TableBody, ShowAllIssuesBtn } from './components'

function SiteIssuesTable({ site }: { site: AppTypes.SiteInterface }) {
  const [state, setState] = useState<SiteIssuesTableState>({ showAll: false })

  const roles = useReturnUserRoles()

  const tableData = useSetSiteIssuesTableData(site, state.showAll)

  const onClick =  roles.includes('[task.write]') ? handleRowClick : () => null

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
          handleRowClick={onClick} />
      </table>

      <ShowAllIssuesBtn
        visible={site.ConstructionViolations.length + site.Complaints.length > 5}
        showAll={state.showAll}
        setState={setState} />

    </div>
  )
}

export default memo(SiteIssuesTable)