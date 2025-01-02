import { useState, useRef, memo } from 'react'
import { useScrollToFormRef, useSetDataForViolationsIndicators, handleIssuesTableRowClick } from '../../../helpers'
import styles from './DischargesContainer.module.css'

// Types
import { IllicitDischarge } from '../../../context/App/types'
import { DischargesContainerProps, DischargesContainerState } from "./types"

// Components
import CreateLink from '../../buttons/nav/CreateLink/CreateLink'
import SiteIllicitDischargeBtn from "../../indicators/SiteIllicitDischargeIndicator/SiteIllicitDischargeIndicator"
import SitesIssuesTable from "../../tables/SitesIssuesTable/SitesIssuesTable"
import DateRangeFilter from "../../filters/DateRangeFilter/DateRangeFilter"
import FormContainer from '../../forms/FormContainer/FormContainer'
import GetIllicitDischarge from '../../forms/get/GetIllicitDischarge/GetIllicitDischarge'

function DischargesContainer({ sites, discharges }: DischargesContainerProps) {
  const [state, setState] = useState<DischargesContainerState>({ formUUID: undefined })

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(state, formRef)

  return (
    <div data-testid="discharges-container" className="flex flex-col gap-10">
      <div className={styles.container}>

        <div className="absolute top-5 right-6">
          <CreateLink
            label={'Create New Illicit Discharge'}
            location={'/create?formType=createDischarge'} />
        </div>

        <div className={styles.header}>Illicit Discharges</div>

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

      {state.formUUID && (
        <div data-testid="form-container" ref={formRef}>
          <FormContainer key={`discharge-${ state.formUUID }`}>
            <GetIllicitDischarge
              uuid={state.formUUID}
              handleCloseForm={() => setState(prevState => ({ ...prevState, formUUID: undefined }))} />
          </FormContainer>
        </div>
      )}

    </div>
  )
}

export default memo(DischargesContainer)