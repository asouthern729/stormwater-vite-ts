import { Link } from 'react-router-dom'
import { APP_TITLE } from '../../../config'
import styles from './Header.module.css'

// Components
import { Buttons } from './components'

function Header() {

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>City of Franklin</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>

      <Buttons />
    </header>
  )
}

export default Header
