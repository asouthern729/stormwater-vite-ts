import { memo } from 'react'
import { useSetTableDataProps, useSetTableData, useHandleSearch, useHandleBtns } from './hooks'
import styles from './SitesContainer.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import Search from '../../search/Search'
import SitesTable from "../../tables/SitesTable"
import SitesActivityCalendar from '../../calendar/SitesActivityCalendar'
import * as Components from './components'

function SitesContainer({ sites }: { sites: AppTypes.SiteInterface[] }) {
  const tableDataProps = useSetTableDataProps()

  const tableData = useSetTableData({ sites, ...tableDataProps }) 

  const { onSearchChange, searchValue } = useHandleSearch()

  const { onActiveSitesBtnClick, onOpenIssuesBtnClick, showActiveSitesOnly } = useHandleBtns()

  return (
    <div className="flex flex-col my-10">

      <div className="flex justify-between w-full">
        <Search
          onSearchChange={onSearchChange}
          searchValue={searchValue} />
        <div className="flex gap-4 mb-6 ml-auto">
          <Components.ActiveSitesBtn
            showActiveSitesOnly={showActiveSitesOnly}
            onClick={onActiveSitesBtnClick} />
          <Components.OpenIssuesBtn onClick={onOpenIssuesBtnClick} />
        </div>
      </div>

      <div className="flex flex-col gap-8 shadow-xl">
        <div className={styles.mapDiv}>
          <Components.Map sites={tableData} />
          <div className="flex-1 min-h-0 overflow-hidden">
            <SitesTable tableData={tableData} />
          </div>
        </div>

        <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded shadow-xl">
          <h3 className={styles.header}>Activity</h3>

          <SitesActivityCalendar sites={tableData} />
        </div>
      </div>

    </div>
  )
}

export default memo(SitesContainer)