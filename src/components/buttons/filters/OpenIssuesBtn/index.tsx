import warningPinIcon from '../../../../assets/icons/pin/warning-pin.png'
import errorPinIcon from '../../../../assets/icons/pin/error-pin.png'

// Types
import { SetLabelProps } from './types'

export const setLabel = (showOpenIssuesOnly: SetLabelProps['showOpenIssuesOnly']) => {
  if(!showOpenIssuesOnly) {
    return (
      <div className="flex gap-1 items-center">
        Open Issues
        <img src={errorPinIcon} alt="error pin icon" className="w-5" />
      </div>
    )
  }

  return (
    <div className="flex gap-4 items-center">
      All Sites
      <div className="flex">
        <img src={warningPinIcon} alt="warning pin icon" className="w-5" />
        <img src={errorPinIcon} alt="error pin icon" className="w-5" />
      </div>
    </div>
  )
}