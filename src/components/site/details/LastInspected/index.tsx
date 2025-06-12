import icon from '@/assets/icons/inspection/inspection.svg'
import { setLastInspectionDate } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

function LastInspected({ site }: { site: AppTypes.SiteInterface }) {
  const lastInspectionDate = setLastInspectionDate(site)
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`Last Inspected: ${ lastInspectionDate }`}>
      <img src={icon} alt="inspection icon" className={`w-10 ${ !lastInspectionDate ? 'opacity-40' : null }`} />
      <span className="whitespace-nowrap">{lastInspectionDate}</span>
    </div>
  )
}

export default LastInspected