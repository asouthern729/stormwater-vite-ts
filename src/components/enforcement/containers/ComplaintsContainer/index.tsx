import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../../helpers/hooks'
import styles from './ComplaintsContainer.module.css'

// Types
import { ComplaintInterface } from '../../../../context/App/types'
import { ComplaintsContainerProps, ComplaintsContainerState } from "./types"

// Components
import SiteComplaintsBtn from '../../indicators/SiteComplaintsIndicator/SiteComplaintsIndicator'
import SitesIssuesTable from '../../tables/SitesIssuesTable'
import DateRangeFilter from '../../../filters/DateRangeFilter'
import { Form, CreateBtn } from './components'

function ComplaintsContainer({ sites, complaints }: ComplaintsContainerProps) {
  const [state, setState] = useState<ComplaintsContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="complaints-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <CreateBtn />

        <h2 className={styles.header}>Complaints</h2>

        <div className="flex justify-evenly w-full">
          <SiteComplaintsBtn
            complaints={useSetDataForViolationsIndicators([...complaints, ...sites.flatMap(site => site.Complaints)]) as Complaint[]}
            disabled={true} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <SitesIssuesTable 
            sites={sites}
            issues={{ complaints: [ ...complaints ], discharges: [], green: [] }}
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

export default memo(ComplaintsContainer)