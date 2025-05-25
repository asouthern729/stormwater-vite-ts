import { Link } from 'react-router'
import styles from './CreateLink.module.css'

function CreateLink({ href, children }: { href: string, children: React.ReactNode }) {
  
  return (
    <Link className={styles.createLink} to={href}>
      {children}
    </Link>
  )
}

export default CreateLink