import icon from '@/assets/icons/complaint/complaint.svg'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { Stats } from '../ViolationsIndicator/components'

function ComplaintsIndicator({ complaints }: { complaints: AppTypes.ComplaintInterface[] }) {

  return (
    <div className="indicator bg-neutral text-neutral-content p-6 shadow-xl">
      <Stats issues={complaints} />
      <div className="flex flex-col items-center text-center h-fit w-40">
        <img src={icon} alt="complaints icon" className="w-20" />
        Complaints
      </div>
    </div>
  )
}

export default ComplaintsIndicator