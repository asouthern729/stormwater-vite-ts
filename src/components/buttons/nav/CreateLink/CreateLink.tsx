import { Link } from 'react-router-dom'
import styles from './CreateLink.module.css'

// Types
import { CreateLinkProps } from './types'

function CreateLink({ label, location }: CreateLinkProps) {
  return (
    <Link className={styles.createLink} to={location}>{label}</Link>
  )
}

export default CreateLink