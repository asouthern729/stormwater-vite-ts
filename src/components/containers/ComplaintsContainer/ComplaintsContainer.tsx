import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../helpers'
import styles from './ComplaintsContainer.module.css'

// Types
import { Complaint } from '../../../context/App/types'
import { ComplaintsContainerProps, ComplaintsContainerState } from "./types"

// Components
import CreateLink from '../../buttons/nav/CreateLink/CreateLink'
import SiteComplaintsBtn from '../../indicators/SiteComplaintsIndicator/SiteComplaintsIndicator'
import SitesIssuesTable from '../../tables/SitesIssuesTable/SitesIssuesTable'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'
import { Form } from './components'

function ComplaintsContainer({ sites, complaints }: ComplaintsContainerProps) {
  const [state, setState] = useState<ComplaintsContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="complaints-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <div className="absolute top-5 right-6">
          <CreateLink
            label={'Create New Complaint'}
            location={'/create?formType=createComplaint'} />
        </div>

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