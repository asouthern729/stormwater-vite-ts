import { useState } from "react"
import { setTableDataStyle } from "./utils"
import { useOnTableRowClick } from './hooks'
import styles from './SitesTable.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import SiteDetails from "@/components/site/details/SiteDetails"

export const TableBody = ({ sites }: { sites: AppTypes.SiteInterface[] }) => { // Sites table body

  return (
    <tbody>
      {sites.map((site, index) => {
        return (
          <TableRow
            key={`sites-table-row-${ site.uuid }`}
            site={site}
            index={index} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ site, index }: { site: AppTypes.SiteInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick(site.uuid)

  return (
    <tr className={setTableDataStyle(index, site)} onClick={onTableRowClick}>
      <TableData site={site} />
    </tr>
  )
}

const TableData = ({ site }: { site: AppTypes.SiteInterface }) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  return (
    <td 
      onMouseEnter={() => setState({ hovered: true })}
      onMouseLeave={() => setState({ hovered: false })}>
      <div className="flex flex-col gap-3 p-4 w-full">
        <span className={styles.name}>{site.name}</span>
        <SiteDetails 
          site={site}
          hovered={state.hovered} />
      </div>
    </td>
  )
}