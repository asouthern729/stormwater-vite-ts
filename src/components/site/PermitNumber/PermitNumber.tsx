import icon from '../../../assets/icons/permit/permit.svg'

// Types
import { PermitNumberProps } from './types'

function PermitNumber({ site }: PermitNumberProps) {
  return (
    <div className="flex flex-col gap-1 items-center" title={`Permit: ${ site.permit || '' }`}>
      <img src={icon} alt="permit icon" className={site.permit ? "w-8" : "w-8 opacity-40"} />
      <small>{site.permit}</small>
    </div>
  )
}

export default PermitNumber