import { useSetStyle } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import PermitNumber from '../PermitNumber'
import ProjectNumber from '../ProjectNumber'
import LastInspected from '../LastInspected'
import { GreenInfrastructureIcon } from './components'

function SiteDetails({ site, hovered }: { site: AppTypes.SiteInterface, hovered?: boolean }) {
  const style = useSetStyle(hovered)

  return (
    <div className={`flex gap-4 justify-around font-[play] uppercase m-auto w-fit ${ style }`}>
      <PermitNumber site={site} />
      <ProjectNumber site={site} />
      <LastInspected site={site} />
      <GreenInfrastructureIcon visible={!!site.greenInfrastructure} />
    </div>
  )
}

export default SiteDetails