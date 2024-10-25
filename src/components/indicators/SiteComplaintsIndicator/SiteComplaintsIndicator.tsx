import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import { setComplaintsObj } from '.'
import icon from '../../../assets/icons/complaint/complaint.svg'

// Types
import { SiteComplaintsIndicatorProps } from './types'

function SiteComplaintsIndicator({ complaints, disabled }: SiteComplaintsIndicatorProps) {
  const { showSiteComplaints, dispatch } = useContext(AppContext)

  const complaintsObj = setComplaintsObj(complaints)

  return (
    <button
      data-testid="site-complaints-indicator"
      type="button"
      disabled={disabled}
      className={`indicator bg-neutral text-neutral-content p-4 w-fit h-fit ${ !showSiteComplaints ? 'opacity-50' : undefined }`}
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_SITE_COMPLAINTS', payload: undefined })}>
        <div className="indicator-item flex flex-col gap-2 w-full translate-x-36">
          <span className="badge badge-error text-error-content w-1/2">{complaintsObj.total} Total</span>
          <span className="badge badge-warning badge-outline w-1/2">{complaintsObj.open} Open</span>
          <span className="badge badge-success badge-outline w-1/2">{complaintsObj.closed} Closed</span>
        </div>
        <div className="flex flex-col items-center text-center h-fit w-32">
          <img src={icon} alt="complaint icon" className="w-16" />
          Complaints
        </div>
    </button>
  )
}

export default SiteComplaintsIndicator