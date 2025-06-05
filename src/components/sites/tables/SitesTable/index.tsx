import { memo } from 'react'
import styles from './SitesTable.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { TableBody } from './components'

function SitesTable({ tableData }: { tableData: AppTypes.SiteInterface[] }) {

  return (
    <div className={styles.container}>
      <table className="bg-neutral-content">
        <TableBody sites={tableData} />
      </table>
    </div>
  )
}

export default memo(SitesTable)