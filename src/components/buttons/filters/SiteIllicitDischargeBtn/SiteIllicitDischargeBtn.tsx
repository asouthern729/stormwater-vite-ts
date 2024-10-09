import { useContext } from 'react'
import AppContext from '../../../../context/App/AppContext'
import { setDischargesObj } from '.'
import icon from '../../../../assets/icons/discharge/discharge.svg'

// Types
import { SiteIllicitDischargeBtnProps } from './types'

function SiteIllicitDischargeBtn({ discharges, disabled }: SiteIllicitDischargeBtnProps) {
  const { showSiteIllicitDischarges, dispatch } = useContext(AppContext)

  const dischargesObj = setDischargesObj(discharges)

  return (
    <button
      type="button"
      disabled={disabled}
      className={`indicator bg-neutral text-neutral-content p-4 w-fit h-fit ${ !showSiteIllicitDischarges ? 'opacity-50' : undefined }`}
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_SITE_ILLICIT_DISCHARGES', payload: undefined })}>
        <div className="indicator-item flex flex-col gap-2 w-full translate-x-36">
          <span className="badge badge-error text-error-content w-1/2">{dischargesObj.total} Total</span>
          <span className="badge badge-warning badge-outline w-1/2">{dischargesObj.open} Open</span>
          <span className="badge badge-success badge-outline w-1/2">{dischargesObj.closed} Closed</span>
        </div>
        <div className="flex flex-col items-center text-center h-fit w-32">
          <img src={icon} alt="complaint icon" className="w-16" />
          Illicit Discharges
        </div>
    </button>
  )
}

export default SiteIllicitDischargeBtn