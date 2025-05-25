import { useRef, memo } from 'react'
import { useScrollToFormRef } from '@/helpers/hooks'
import { useHandleViolationsTableData } from './hooks'
import styles from './ViolationsContainer.module.css'

// Types
import { ConstructionViolationInterface } from '@/context/App/types'

// Components
import SiteViolationsIndicator from '../../indicators/SiteViolationsIndicator'
import DateRangeFilter from '../../../filters/DateRangeFilter'
import GetViolation from '@/components/forms/get/GetViolation'
import * as Components from './components'

function ViolationsContainer({ violations }: { violations: ConstructionViolationInterface[] }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)

  const tableData = useHandleViolationsTableData(violations)

  return (
    <div className="flex flex-col gap-10">
      <div className={styles.container}>
        <Components.CreateBtn href={'/create?formType=createViolation'}>
          Create New Violation
        </Components.CreateBtn>
        <h2 className={styles.header}>Construction Violations</h2>

        <div className="m-auto">
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <Components.ViolationsTable tableData={tableData} />
        </div>
      </div>

      <Components.UpdateForm formRef={formRef}>
        <GetViolation />
      </Components.UpdateForm>
      
    </div>
  )
}

export default memo(ViolationsContainer)