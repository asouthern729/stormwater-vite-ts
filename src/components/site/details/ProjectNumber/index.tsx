import icon from '@/assets/icons/project/project.svg'

// Types
import * as AppTypes from '@/context/App/types'

function ProjectNumber({ site }: { site: AppTypes.SiteInterface }) {
  const hastProjectNumber = !!site.cof
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`COF #${ site.cof || '' }`}>
      <img src={icon} alt="cof number icon" className={`w-10 ${ !hastProjectNumber ? 'opacity-40' : null }`} />
      <span className={!site.cof ? 'hidden' : 'font-[play] whitespace-nowrap'}>COF #{site.cof}</span>
    </div>
  )
}

export default ProjectNumber