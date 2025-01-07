import { useState, memo } from 'react'
import { useHandlePageData } from '../../../helpers'
import { useSetSitesIssuesTableData } from './hooks'
import styles from './SitesIssuesTable.module.css'

// Types
import { Issue } from '../SiteIssuesTable/types'
import { SitesIssuesTableProps, SitesIssuesTableState } from "./types"

// Components
import { ShowClosedCheckbox, PageNavBtns, TableHeaders, TableBody } from './components'

function SitesIssuesTable({ sites, issues, handleRowClick }: SitesIssuesTableProps) {
  const [state, setState] = useState<SitesIssuesTableState>({ currentPage: 1 })

  const tableData = useSetSitesIssuesTableData(sites, issues)

  const totalPages = Math.ceil(tableData.length / 20) // 20 results per page

  const pageData = useHandlePageData(tableData, state.currentPage) as Issue[]

  return (
    <div data-testid="sites-issues-table" className={styles.container}>

      <div className="flex justify-between items-end w-full">
        <ShowClosedCheckbox />

        <PageNavBtns
          setState={setState}
          totalPages={totalPages}
          currentPage={state.currentPage} />
      </div>    

      <table className="table table-sm text-neutral-content">
        <TableHeaders />
        <TableBody
          issues={pageData}
          handleRowClick={handleRowClick} />
      </table>
      
    </div>
  )
}

export default memo(SitesIssuesTable)