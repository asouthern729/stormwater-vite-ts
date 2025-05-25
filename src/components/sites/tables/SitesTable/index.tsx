import { memo } from 'react'
import styles from './SitesTable.module.css'

// Types
import { SiteInterface } from '@/context/App/types'

// Components
import { TableBody } from './components'

function SitesTable({ sites }: { sites: SiteInterface[] }) {

  return (
    <div data-testid="sites-table" className={styles.container}>
      <table className="bg-neutral-content">
        <TableBody sites={sites} />
      </table>
    </div>
  )
}

export default memo(SitesTable)