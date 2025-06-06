import { useRef, memo } from 'react'
import { useHandleTableData, useResetCtx, useScrollToFormRef } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import SiteViolationsIndicator from '../../indicators/ViolationsIndicator'
import DateRangeFilter from '../../filters/DateRangeFilter'
import GetViolation from '@/components/enforcement/forms/get/GetViolation'
import * as Components from './components'

function ViolationsContainer({ violations }: { violations: AppTypes.ConstructionViolationInterface[] }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)
  
  const tableData = useHandleTableData(violations)

  useResetCtx()

  return (
    <div className="flex flex-col my-10 gap-10 m-auto w-fit">
      <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
        <Components.CreateBtn href={'/create/enforcement/violation'}>
          Create New Violation
        </Components.CreateBtn>

        <div className="m-auto">
          <SiteViolationsIndicator violations={violations} />
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