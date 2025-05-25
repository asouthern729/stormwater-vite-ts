import { useContext } from "react"
import SitesCtx from '../../context'
import warningPinIcon from '@/assets/icons/pin/warning-pin.png'
import errorPinIcon from '@/assets/icons/pin/error-pin.png'

export const ActiveSitesBtn = () => {
  const { showActiveSitesOnly, dispatch } = useContext(SitesCtx)

  const label = showActiveSitesOnly ? 'Show Inactive Sites' : 'Hide Inactive Sites'

  return (
    <button 
      type="button"
      className="text-neutral-content font-[play] font-bold uppercase p-3 py-2 w-fit border border-neutral-content rounded hover:bg-neutral hover:border-neutral"
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' })}>
        {label}
    </button>
  )
}

export const OpenIssuesBtn = () => {
  const { dispatch } = useContext(SitesCtx)

  return (
    <button 
      type="button"
      className="text-neutral-content font-[play] font-bold uppercase p-3 py-2 w-fit border border-neutral-content rounded hover:bg-neutral hover:border-neutral"
      onClick={() => dispatch({ type: 'TOGGLE_OPEN_ISSUES_ONLY' })}>
        <OpenIssuesBtnLabel />
    </button>
  )
}

const OpenIssuesBtnLabel = () => {
  const { showOpenIssuesOnly } = useContext(SitesCtx)

  if(showOpenIssuesOnly) {
    <div className="flex gap-4 items-center">
      All Sites
      <div className="flex">
        <img src={warningPinIcon} alt="warning pin icon" className="w-5" />
        <img src={errorPinIcon} alt="error pin icon" className="w-5" />
      </div>
    </div>
  }

  return (
    <div className="flex gap-1 items-center">
      Open Issues
      <img src={errorPinIcon} alt="error pin icon" className="w-5" />
    </div>
  )
}