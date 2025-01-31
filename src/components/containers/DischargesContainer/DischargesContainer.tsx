import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../helpers'
import styles from './DischargesContainer.module.css'

// Types
import { IllicitDischarge } from '../../../context/App/types'
import { DischargesContainerProps, DischargesContainerState } from "./types"

// Components
import SiteIllicitDischargeBtn from "../../indicators/SiteIllicitDischargeIndicator/SiteIllicitDischargeIndicator"
import SitesIssuesTable from "../../tables/SitesIssuesTable/SitesIssuesTable"
import DateRangeFilter from "../../filters/DateRangeFilter/DateRangeFilter"
import { Form, CreateBtn } from './components'

function DischargesContainer({ sites, discharges }: DischargesContainerProps) {
  const [state, setState] = useState<DischargesContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="discharges-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <CreateBtn />

        <h2 className={styles.header}>Illicit Discharges</h2>

        <div className="flex justify-evenly w-full">
          <SiteIllicitDischargeBtn
            discharges={useSetDataForViolationsIndicators([ ...discharges, ...sites.flatMap(site => site.IllicitDischarges)]) as IllicitDischarge[]}
            disabled={true} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <SitesIssuesTable 
            sites={sites}
            issues={{ complaints: [], discharges: [ ...discharges ], green: [] }}
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

export default memo(DischargesContainer)