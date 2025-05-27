import { useRef, memo } from 'react'
import { useScrollToFormRef } from '@/helpers/hooks'
import { useHandleDischargesTableData } from './hooks'
import styles from './DischargesContainer.module.css'

// Types
import { IllicitDischargeInterface } from '@/context/App/types'

// Components
import IllicitDischargesIndicator from "../../indicators/llicitDischargesIndicator"
import DateRangeFilter from "../../filters/DateRangeFilter"
import { CreateBtn, UpdateForm } from '../ViolationsContainer/components'
import GetIllicitDischarge from '@/components/enforcement/forms/get/GetIllicitDischarge'
import * as Components from './components'

function DischargesContainer({ discharges }: { discharges: IllicitDischargeInterface[] }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)

  const tableData = useHandleDischargesTableData(discharges)

  return (
    <div className="flex flex-col gap-10">
      <div className={styles.container}>
        <CreateBtn href={'/create?formType=createIllicitDischarge'}>
          Create New Illicit Discharge
        </CreateBtn>
        <h2 className={styles.header}>Illicit Discharges</h2>

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