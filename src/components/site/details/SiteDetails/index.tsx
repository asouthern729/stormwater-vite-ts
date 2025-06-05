// Types
import * as AppTypes from '@/context/App/types'

// Components
import PermitNumber from '../PermitNumber'
import ProjectNumber from '../ProjectNumber'
import LastInspected from '../LastInspected'
import { GreenInfrastructureIcon } from './components'

function SiteDetails({ site, hovered }: { site: AppTypes.SiteInterface, hovered: boolean }) {

  return (
    <div className={`flex gap-8 justify-around text-neutral m-auto w-fit ${ hovered ? 'text-neutral-content' : null }`}>
      <PermitNumber site={site} />
      <ProjectNumber site={site} />
      <LastInspected site={site} />
      <GreenInfrastructureIcon visible={!!site.greenInfrastructure} />
    </div>
  )
}

export default SiteDetails