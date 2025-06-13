import { useRef } from 'react'
import { useUpdateSiteFormContext } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'
import { useSetCreateSiteMapView } from './hooks'

export const Map = () => { // Map input
  const mapRef = useRef<HTMLDivElement>(null)
  
  useSetCreateSiteMapView(mapRef)

  return (
    <div className="w-full h-[50vh] overflow-hidden bg-transparent shadow-xl rounded-xl touch-none">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  )
}

export const InactiveCheckbox = () => { // Inactive site checkbox
  const methods = useUpdateSiteFormContext()

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <label htmlFor="inactiveSite" className={styles.checkboxLabel}>Inactive Site</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        { ...methods.register('inactive') } />
    </div>
  )
}