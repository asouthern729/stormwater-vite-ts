import { useLocation } from 'react-router-dom'

// Types
import { SiteDetailsProps } from './types'

// Components
import PermitNumber from '../PermitNumber/PermitNumber'
import ProjectNumber from '../ProjectNumber/ProjectNumber'
import LastInspected from '../LastInspected/LastInspected'
import GreenInfrastructure from '../GreenInfrastructure/GreenInfrastructure'

function SiteDetails({ site }: SiteDetailsProps) {
  const location = useLocation()

  return (
    <div className={`flex gap-8 justify-around m-auto w-fit ${ location.pathname !== '/' ? 'text-neutral-content' : null }`}>
    
      <PermitNumber site={site} />
      <ProjectNumber site={site} />
      <LastInspected site={site} />
      {site.greenInfrastructure && (
        <GreenInfrastructure />
      )}

    </div>
  )
}

export default SiteDetails