import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../helpers'
import styles from './GreenContainer.module.css'

// Types
import { GreenInfrastructure } from '../../../context/App/types'
import { GreenContainerProps, GreenContainerState } from "./types"

// Components
import CreateLink from '../../buttons/nav/CreateLink/CreateLink'
import GreenViolationsIndicator from '../../indicators/GreenViolationsIndicator/GreenViolationsIndicator'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'
import SitesIssuesTable from '../../tables/SitesIssuesTable/SitesIssuesTable'
import FormContainer from '../../forms/FormContainer/FormContainer'
import GetGreen from '../../forms/get/GetGreen/GetGreen'

function GreenContainer({ green }: GreenContainerProps) {
  const [state, setState] = useState<GreenContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="green-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <div className="absolute top-5 right-6">
          <CreateLink
            label={'Create New Green Violation'}
            location={'/create?formType=createGreen'} />
        </div>

        <div className={styles.header}>Green Infrastructure Violations</div>

        <div className="flex justify-evenly w-full">
          <GreenViolationsIndicator
            green={useSetDataForViolationsIndicators(green) as GreenInfrastructure[]} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <SitesIssuesTable 
            sites={[]}
            issues={{ green, complaints: [], discharges: [] }}
            handleRowClick={handleIssuesTableRowClick(setState)} />
        </div>
      </div>

      {state.formUUID && (
        <div ref={formRef}>
          <FormContainer key={`discharge-${ state.formUUID }`}>
            <GetGreen
              uuid={state.formUUID}
              handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
          </FormContainer>
        </div>
      )}

    </div>
  )
}

export default memo(GreenContainer)