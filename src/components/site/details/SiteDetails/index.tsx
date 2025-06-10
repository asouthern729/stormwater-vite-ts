import { useLocation } from 'react-router'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import PermitNumber from '../PermitNumber'
import ProjectNumber from '../ProjectNumber'
import LastInspected from '../LastInspected'
import { GreenInfrastructureIcon } from './components'

function SiteDetails({ site, hovered }: { site: AppTypes.SiteInterface, hovered?: boolean }) {
  const pathname = useLocation().pathname

  const textColor = pathname === '/sites' ? 'text-neutral' : 'text-neutral-content'

  return (
    <div className={`flex gap-8 justify-around m-auto w-fit ${ hovered ? 'text-neutral-content' : textColor }`}>
      <PermitNumber site={site} />
      <ProjectNumber site={site} />
      <LastInspected site={site} />
      <GreenInfrastructureIcon visible={!!site.greenInfrastructure} />
    </div>
  )
}

export default SiteDetails