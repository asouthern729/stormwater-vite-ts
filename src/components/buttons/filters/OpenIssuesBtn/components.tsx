import { useContext } from 'react'
import AppContext from '../../../../context/App/AppContext'
import warningPinIcon from '../../../../assets/icons/pin/warning-pin.png'
import errorPinIcon from '../../../../assets/icons/pin/error-pin.png'

export const Label = () => { // Open issues button label
  const { showOpenIssuesOnly } = useContext(AppContext)

  if(!showOpenIssuesOnly) { // Show all
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