import { useState, useRef } from 'react'
import { useScrollToFormRef } from '../../../helpers'
import { handleRowClick } from '.'
import styles from './ComplaintsContainer.module.css'

// Types
import { ComplaintsContainerProps, ComplaintsContainerState } from "./types"

// Components
import SiteComplaintsBtn from '../../buttons/filters/SiteComplaintsBtn/SiteComplaintsBtn'
import SitesIssuesTable from '../../tables/SitesIssuesTable/SitesIssuesTable'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'
import FormContainer from '../../forms/FormContainer/FormContainer'
import GetComplaint from '../../forms/get/GetComplaint/GetComplaint'

function ComplaintsContainer({ sites, complaints }: ComplaintsContainerProps) {
  const [state, setState] = useState<ComplaintsContainerState>({ deleteBtnActive: false, formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div className="flex flex-col gap-10">
      <div className={styles.container}>
        <div className={styles.header}>Complaints</div>

        <div className="flex justify-evenly w-full">
          <SiteComplaintsBtn
            complaints={[...complaints, ...sites.flatMap(site => site.Complaints)]}
            disabled={true} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <SitesIssuesTable 
            sites={sites}
            issues={{ complaints: [ ...complaints ], discharges: [] }}
            handleRowClick={handleRowClick(setState)} />
        </div>
      </div>

      {state.formUUID && (
        <div ref={formRef}>
          <FormContainer>
            <GetComplaint
              uuid={state.formUUID}
              resetState={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
          </FormContainer>
        </div>
      )}

    </div>
  )
}

export default ComplaintsContainer