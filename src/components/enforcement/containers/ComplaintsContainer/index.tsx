import { useRef, memo } from 'react'
import { useScrollToFormRef } from '@/helpers/hooks'
import { useHandleComplaintsTableData } from './hooks'
import styles from './ComplaintsContainer.module.css'

// Types
import { ComplaintInterface } from '@/context/App/types'

// Components
import ComplaintsIndicator from '../../indicators/Complaints/ComplaintsIndicator'
import DateRangeFilter from '../../filters/DateRangeFilter'
import { CreateBtn, UpdateForm } from '../ViolationsContainer/components'
import GetComplaint from '@/components/enforcement/forms/get/GetComplaint'
import * as Components from './components'

function ComplaintsContainer({ complaints }: { complaints: ComplaintInterface[] }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)

  const tableData = useHandleComplaintsTableData(complaints)

  return (
    <div className="flex flex-col gap-10">
      <div className={styles.container}>

        <CreateBtn href={'/create?formType=createComplaint'}>
          Create New Complaint
        </CreateBtn>
        <h2 className={styles.header}>Complaints</h2>

        <div className="m-auto">
          <ComplaintsIndicator complaints={complaints} />
        </div>

        <div className="m-auto">
          <ComplaintsContainer complaints={complaints} />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangeFilter />
          <Components.ComplaintsTable tableData={tableData} />
        </div>
      </div>

      <UpdateForm formRef={formRef}>
        <GetComplaint />
      </UpdateForm>

    </div>
  )
}

export default memo(ComplaintsContainer)