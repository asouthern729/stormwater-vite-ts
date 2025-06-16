import { memo } from 'react'
import { useResetCtx } from '../ViolationsContainer/hooks'
import { useHandleTableData, useHandleDeleteBtn } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import IllicitDischargesIndicator from "../../indicators/llicitDischargesIndicator"
import DateRangeFilter from "../../filters/DateRangeFilter"
import { CreateBtn, UpdateForm } from '../ViolationsContainer/components'
import GetIllicitDischarge from '@/components/enforcement/forms/get/GetIllicitDischarge'
import * as Components from './components'

function DischargesContainer({ discharges }: { discharges: AppTypes.IllicitDischargeInterface[] }) {
  const tableData = useHandleTableData(discharges)

  const handleDeleteBtn = useHandleDeleteBtn()

  useResetCtx()

  return (
    <div className="flex flex-col my-10 gap-10 m-auto w-fit">
      <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
        <CreateBtn href={'/create/enforcement/discharge'}>
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

      <UpdateForm>
        <GetIllicitDischarge handleDeleteBtn={handleDeleteBtn} />
      </UpdateForm>

    </div>
  )
}

export default memo(DischargesContainer)