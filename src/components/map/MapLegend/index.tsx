// Types
import { SiteInterface } from '@/context/App/types.ts'

// Components
import * as Components from './components'

function MapLegend({ sites }: { sites: SiteInterface[] }) {
  
  return (
    <Components.LegendItems sites={sites} />
  )
}

export default MapLegend