import icon from '../../../assets/icons/violation/violation.svg'

// Types
import { ConstructionViolationInterface } from '@/context/App/types'

// Components
import * as Components from './components'

function SiteViolationsIndicator({ violations }: { violations: ConstructionViolationInterface[] }) {

  return (
    <div className="indicator bg-neutral text-neutral-content p-4 w-fit h-fit">
      <Components.Stats issues={violations} />
      <div className="flex flex-col items-center text-center h-fit w-32">
        <img src={icon} alt="violation icon" className="w-16" />
        Violations
      </div>
    </div>
  )
}

export default SiteViolationsIndicator