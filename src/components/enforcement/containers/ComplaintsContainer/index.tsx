import { useRef, memo } from 'react'
import { useResetCtx, useScrollToFormRef } from '../ViolationsContainer/hooks'
import { useHandleTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import ComplaintsIndicator from '../../indicators/ComplaintsIndicator'
import DateRangeFilter from '../../filters/DateRangeFilter'
import { CreateBtn, UpdateForm } from '../ViolationsContainer/components'
import GetComplaint from '@/components/enforcement/forms/get/GetComplaint'
import * as Components from './components'

function ComplaintsContainer({ complaints }: { complaints: AppTypes.ComplaintInterface[] }) {
  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef(formRef)
  
  const tableData = useHandleTableData(complaints)

  useResetCtx()

  return (
    <div className="flex flex-col my-10 gap-10 m-auto w-4/5 xl:w-3/4 2xl:w-2/3">
      <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
        <CreateBtn href={'/create?formType=createComplaint'}>
          Create New Complaint
        </CreateBtn>

        <div className="m-auto">
          <ComplaintsIndicator complaints={complaints} />
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