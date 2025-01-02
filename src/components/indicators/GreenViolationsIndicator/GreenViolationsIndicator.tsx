import { setGreenObj } from './utils'
import icon from '../../../assets/icons/green-violation/green-violation.svg'

// Types
import { GreenViolationsIndicatorProps } from './types'

function GreenViolationsIndicator({ green }: GreenViolationsIndicatorProps) {
  const greenObj = setGreenObj(green)

  return (
    <div data-testid="green-violations-indicator"
      className={'indicator bg-neutral text-neutral-content p-4 w-fit h-fit'}>
        <div className="indicator-item flex flex-col gap-2 w-full translate-x-36">
          <span className="badge badge-error text-error-content w-1/2">{greenObj.total} Total</span>
          <span className="badge badge-warning badge-outline w-1/2">{greenObj.open} Open</span>
          <span className="badge badge-success badge-outline w-1/2">{greenObj.closed} Closed</span>
        </div>
        <div className="flex flex-col items-center text-center h-fit w-32">
          <img src={icon} alt="complaint icon" className="w-16" />
          Green Infrastructure Violations
        </div>
    </div>
  )
}

export default GreenViolationsIndicator