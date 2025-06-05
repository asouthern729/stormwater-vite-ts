import icon from '@/assets/icons/discharge/discharge.svg'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { Stats } from '../ViolationsIndicator/components'

function IllicitDischargesIndicator({ discharges }: { discharges: AppTypes.IllicitDischargeInterface[] }) {

  return (
    <div className="indicator bg-neutral text-neutral-content p-6 shadow-xl">
      <Stats issues={discharges} />
      <div className="flex flex-col items-center text-center h-fit w-40">
        <img src={icon} alt="illicit discharges icon" className="w-20" />
        Illicit Discharges
      </div>
    </div>
  )
}

export default IllicitDischargesIndicator