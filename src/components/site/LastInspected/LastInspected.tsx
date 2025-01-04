import icon from '../../../assets/icons/inspection/inspection.svg'

// Types
import { LastInspectedProps } from "./types"

function LastInspected({ site }: LastInspectedProps) {
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`Last Inspected: ${ site.Logs[0]?.inspectionDate.toString() || '' }`}>
      <img src={icon} alt="inspection icon" className={site.Logs.length ? "w-8" : "w-8 opacity-40"} />
      <div className="flex flex-col items-center">
        <small>{site.Logs[0]?.inspectionDate.toString()}</small>
      </div>
    </div>
  )
}

export default LastInspected