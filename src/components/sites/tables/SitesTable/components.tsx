import { useContext } from "react"
import SitesCtx from "@/components/sites/context"
import { setTableDataStyle } from "./utils"
import { useOnTableRowClick } from './hooks'
import styles from './SitesTable.module.css'

// Types
import { SiteInterface } from "@/context/App/types"

// Components
import SiteDetails from "../../../site/SiteDetails/SiteDetails"

export const TableBody = ({ sites }: { sites: SiteInterface[] }) => { // Sites table body

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

const TableRow = ({ site, index }: { site: SiteInterface, index: number }) => {
  const onTableRowClick = useOnTableRowClick(site.uuid)

  return (
    <tr key={`table-row-${ site.uuid }`} className={setTableDataStyle(index, site)} onClick={onTableRowClick}>
      <TableData site={site} />
    </tr>
  )
}

const TableData = ({ site }: { site: SiteInterface }) => {
  const { dispatch } = useContext(SitesCtx)

  return (
    <td className="p-2">
      <div className="flex flex-col gap-6 p-4 w-full">
        <div 
          className={styles.name}
          onMouseEnter={() => dispatch({ type: 'SET_HOVERED_SITE', payload: site.uuid })}
          onMouseLeave={() => dispatch({ type: 'SET_HOVERED_SITE', payload: '' })}>{site.name}</div>
        <SiteDetails site={site} />
      </div>
    </td>
  )
}