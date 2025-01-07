import { memo } from 'react'
import styles from './SitesTable.module.css'

// Types
import { SitesTableProps } from "./types"

// Components
import { TableBody } from './components'

function SitesTable({ sites }: SitesTableProps) {

  return (
    <div data-testid="sites-table" className={styles.container}>
      <table className="bg-neutral-content">
        <TableBody sites={sites} />
      </table>
    </div>
  )
}

export default memo(SitesTable)