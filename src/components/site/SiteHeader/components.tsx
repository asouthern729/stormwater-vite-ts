import icon from '../../../assets/icons/inspector/inspector.svg'
import styles from './SiteHeader.module.css'

export const InspectorName = ({ name }: { name: string | undefined }) => { // Inspector name
  if(!name) return null

  return (
    <div data-testid="inspector" className={styles.inspector}>
      <img src={icon} alt="inspector icon" className="w-12" />
      <div>{name}</div>
    </div>
  )
}