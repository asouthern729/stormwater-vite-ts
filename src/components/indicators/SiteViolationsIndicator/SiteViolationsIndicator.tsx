import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import { setViolationsObj } from './utils'
import icon from '../../../assets/icons/violation/violation.svg'

// Types
import { SiteViolationsIndicatorProps } from "./types"

function SiteViolationsIndicator({ violations, disabled }: SiteViolationsIndicatorProps) {
  const { showSiteViolations, dispatch } = useContext(AppContext)

  const violationsObj = setViolationsObj(violations)

  return (
    <button
      data-testid="site-violations-indicator"
      type="button"
      disabled={disabled}
      className={`indicator bg-neutral text-neutral-content p-4 w-fit h-fit disabled:cursor-normal ${ !showSiteViolations ? 'opacity-50' : undefined }`}
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_SITE_VIOLATIONS', payload: undefined })}>
        <div className="indicator-item flex flex-col gap-2 w-full translate-x-36">
          <span className="badge badge-error text-error-content w-1/2">{violationsObj.total} Total</span>
          <span className="badge badge-warning badge-outline w-1/2">{violationsObj.open} Open</span>
          <span className="badge badge-success badge-outline w-1/2">{violationsObj.closed} Closed</span>
        </div>
        <div className="flex flex-col items-center text-center h-fit w-32">
          <img src={icon} alt="violation icon" className="w-16" />
          Violations
        </div>
    </button>
  )
}

export default SiteViolationsIndicator