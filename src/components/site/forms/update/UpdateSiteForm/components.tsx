import { useUpdateSiteFormContext } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

export const Map = ({ site }: { site: AppTypes.SiteInterface }) => { // Map input

  return (
    <div className={styles.mapDiv}>
      {/* TODO create Site map */}
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