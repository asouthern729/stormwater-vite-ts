import icon from '../../../assets/icons/project/project.svg'

// Types
import { ProjectNumberProps } from './types'

function ProjectNumber({ site }: ProjectNumberProps) {
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`COF #${ site.cof || '' }`}>
      <img src={icon} alt="cof number icon" className={site.cof ? "w-8" : "w-8 opacity-40"} />
      <small className={!site.cof ? 'hidden' : 'block'}>COF #{site.cof}</small>
    </div>
  )
}

export default ProjectNumber