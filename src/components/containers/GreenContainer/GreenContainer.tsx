import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../helpers'
import styles from './GreenContainer.module.css'

// Types
import { GreenInfrastructure } from '../../../context/App/types'
import { GreenContainerProps, GreenContainerState } from "./types"

// Components
import GreenViolationsIndicator from '../../indicators/GreenViolationsIndicator/GreenViolationsIndicator'
import DateRangeFilter from '../../filters/DateRangeFilter/DateRangeFilter'
import SitesIssuesTable from '../../tables/SitesIssuesTable/SitesIssuesTable'
import { Form, CreateBtn } from './components'

function GreenContainer({ green }: GreenContainerProps) {
  const [state, setState] = useState<GreenContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="green-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <CreateBtn />

        <h2 className={styles.header}>Green Infrastructure Violations</h2>

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

      <Form
        formUUID={state.formUUID}
        formRef={formRef}
        setState={setState} />

    </div>
  )
}

export default memo(GreenContainer)