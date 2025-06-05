import { useRef, memo } from 'react'
import { useResetCtx, useScrollToFormRef } from '../ViolationsContainer/hooks'
import { useHandleTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import IllicitDischargesIndicator from "../../indicators/llicitDischargesIndicator"
import DateRangeFilter from "../../filters/DateRangeFilter"
import { CreateBtn, UpdateForm } from '../ViolationsContainer/components'
import GetIllicitDischarge from '@/components/enforcement/forms/get/GetIllicitDischarge'
import * as Components from './components'

function DischargesContainer({ discharges }: { discharges: AppTypes.IllicitDischargeInterface[] }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)

  const tableData = useHandleTableData(discharges)

  useResetCtx()

  return (
    <div className="flex flex-col my-10 gap-10 m-auto w-4/5 xl:w-3/4 2xl:w-2/3">
      <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
        <CreateBtn href={'/create?formType=createIllicitDischarge'}>
          Create New Illicit Discharge
        </CreateBtn>

        <div className="m-auto">
          <IllicitDischargesIndicator discharges={discharges} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <Components.IllicitDischargesTable tableData={tableData} />
        </div>
      </div>

      <UpdateForm formRef={formRef}>
        <GetIllicitDischarge />
      </UpdateForm>

    </div>
  )
}

export default memo(DischargesContainer)