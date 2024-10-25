import { useLocation } from 'react-router-dom'
import styles from './Layout.module.css'

// Components
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

// Types
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  const pathname = useLocation().pathname

  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <div className={pathname !== '/login' ? styles.container : 'mt-20'}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
