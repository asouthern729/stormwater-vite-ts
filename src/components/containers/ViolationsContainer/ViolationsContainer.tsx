import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../helpers'
import styles from './ViolationsContainer.module.css'

// Types
import { ConstructionViolation } from '../../../context/App/types'
import { ViolationsContainerProps, ViolationsContainerState } from "./types"

// Components
import CreateLink from '../../buttons/nav/CreateLink/CreateLink'
import SiteViolationsBtn from '../../indicators/SiteViolationsIndicator/SiteViolationsIndicator'
import SitesIssuesTable from '../../tables/SitesIssuesTable/SitesIssuesTable'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'
import FormContainer from '../../forms/FormContainer/FormContainer'
import GetViolation from '../../forms/get/GetViolation/GetViolation'

function ViolationsContainer({ sites }: ViolationsContainerProps) {
  const [state, setState] = useState<ViolationsContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="violations-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <div className="absolute top-5 right-6">
          <CreateLink
            label={'Create New Violation'}
            location={'/create?formType=createViolation'} />
        </div>
        
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

      {state.formUUID && (
        <div ref={formRef}>
          <FormContainer key={`violation-${ state.formUUID }`}>
            <GetViolation
              uuid={state.formUUID}
              resetState={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
          </FormContainer>
        </div>
      )}
      
    </div>
  )
}

export default memo(ViolationsContainer)