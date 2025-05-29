import icon from '@/assets/icons/complaint/complaint.svg'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { Stats } from '../SiteViolationsIndicator/components'

function ComplaintsIndicator({ complaints }: { complaints: AppTypes.ComplaintInterface[] }) {

  return (
    <div className="indicator bg-neutral text-neutral-content p-4 w-fit h-fit">
      <Stats issues={complaints} />
      <div className="flex flex-col items-center text-center h-fit w-32">
        <img src={icon} alt="complaints icon" className="w-16" />
        Complaints
      </div>
    </div>
  )
}

export default ComplaintsIndicator