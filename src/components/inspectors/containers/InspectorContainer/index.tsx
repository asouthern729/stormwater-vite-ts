import { useRef, memo } from "react"
import { useSetTableData } from "@/components/sites/containers/SitesContainer/hooks"
import { useScrollToFormRef } from './hooks'
import styles from './InspectorContainer.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { ActiveSitesBtn, OpenIssuesBtn } from "@/components/sites/containers/SitesContainer/components"
import { Map } from "@/components/sites/containers/SitesContainer/components"
import SitesTable from "@/components/sites/tables/SitesTable"
import UpdateInspectorForm from "../../forms/update/UpdateInspectorForm"
import * as Components from './components'

function InspectorContainer({ sites, inspector }: { sites: AppTypes.SiteInterface[], inspector: AppTypes.InspectorInterface }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef) 

  const tableData = useSetTableData(sites)

  return (
    <div className={styles.container}>

      <div className={styles.topDiv}>
        <Components.UpdateInspectorBtn inspector={inspector} />
        <Components.Header inspector={inspector} />
        <div className="absolute flex gap-4 right-0">
          <ActiveSitesBtn />
          <OpenIssuesBtn />
        </div>
      </div>

      <div className={styles.mapDiv}>
        <Map sites={sites} />
        <SitesTable sites={tableData} />
      </div>

      <div className={styles.bottomDiv}>
        <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
          <h3 className={styles.header}>Sites Activity</h3>

          <Components.CalendarAndTable tableData={tableData} />
        </div>
      </div>

      <Components.UpdateForm formRef={formRef}>
        <UpdateInspectorForm inspector={inspector} />
      </Components.UpdateForm>

    </div>
  )
}

export default memo(InspectorContainer)