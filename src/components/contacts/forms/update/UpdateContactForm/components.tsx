import { useUpdateContactFormContext } from './hooks'
import styles from '../../Forms.module.css'

export const InactiveCheckbox = () => { // Inactive site checkbox
  const methods = useUpdateContactFormContext()

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <label htmlFor="inactiveSite" className={styles.checkboxLabel}>Inactive Contact</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        { ...methods.register('inactive') } />
    </div>
  )
}