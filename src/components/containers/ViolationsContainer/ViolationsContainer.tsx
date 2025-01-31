import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../helpers'
import styles from './ViolationsContainer.module.css'

// Types
import { ConstructionViolation } from '../../../context/App/types'
import { ViolationsContainerProps, ViolationsContainerState } from "./types"

// Components
import SiteViolationsBtn from '../../indicators/SiteViolationsIndicator/SiteViolationsIndicator'
import SitesIssuesTable from '../../tables/SitesIssuesTable/SitesIssuesTable'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'
import { Form, CreateBtn } from './components'

function ViolationsContainer({ sites }: ViolationsContainerProps) {
  const [state, setState] = useState<ViolationsContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="violations-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <CreateBtn />
        
        <div className={styles.header}>Construction Violations</div>

        <div className="flex flex-col m-auto w-fit">
          <SiteViolationsBtn 
            violations={useSetDataForViolationsIndicators(sites.flatMap(site => site.ConstructionViolations)) as ConstructionViolation[]}
            disabled={true} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <SitesIssuesTable 
            sites={sites}
            issues={{ complaints: [], discharges: [], green: [] }}
            handleRowClick={handleIssuesTableRowClick(setState)} />
        </div>
      </div>

      <Form
        formUUID={state.formUUID}
        formRef={formRef}
        setState={setState} />
      
    </div>
  )
}

export default memo(ViolationsContainer)