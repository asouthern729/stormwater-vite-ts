import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'

// Types
import { SiteDetailsProps } from './types'

// Components
import PermitNumber from '../PermitNumber/PermitNumber'
import ProjectNumber from '../ProjectNumber/ProjectNumber'
import LastInspected from '../LastInspected/LastInspected'
import { GreenInfrastructureIcon } from './components'

function SiteDetails({ site }: SiteDetailsProps) {
  const { activePage } = useContext(AppContext)

  return (
    <div data-testid="site-details" className={`flex gap-8 justify-around m-auto w-fit ${ !['Sites', 'Inspectors'].includes(activePage) ? 'text-neutral-content' : undefined }`}>
    
      <PermitNumber site={site} />
      <ProjectNumber site={site} />
      <LastInspected site={site} />
      <GreenInfrastructureIcon visible={!!site.greenInfrastructure} />

    </div>
  )
}

export default SiteDetails