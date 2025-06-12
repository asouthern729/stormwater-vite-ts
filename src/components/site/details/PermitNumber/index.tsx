import icon from '@/assets/icons/permit/permit.svg'

// Types
import * as AppTypes from '@/context/App/types'

function PermitNumber({ site }: { site: AppTypes.SiteInterface }) {
  const hasPermit = !!site.permit
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`Permit: ${ site.permit }`}>
      <img src={icon} alt="permit icon" className={`w-10 ${ !hasPermit ? 'opacity-40' : null }`} />
      <span className="whitespace-nowrap">{site.permit}</span>
    </div>
  )
}

export default PermitNumber