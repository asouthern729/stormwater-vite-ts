import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"
import { setTableDataStyle } from "./utils"
import styles from './SitesTable.module.css'

// Types
import { Site } from "../../../context/App/types"

// Components
import SiteDetails from "../../site/SiteDetails/SiteDetails"

export const TableBody = ({ sites }: { sites: Site[] }) => { // Sites table body

  return (
    <tbody>
      {sites.map((site, index) => {
        return (
          <TableRow
            site={site}
            index={index} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ site, index }: { site: Site, index: number }) => {
  const navigate = useNavigate()

  return (
    <tr key={`table-row-${ site.uuid }`} className={setTableDataStyle(index, site)} onClick={() => navigate(`/site/${ site.uuid }`)}>
      <TableData site={site} />
    </tr>
  )
}

const TableData = ({ site }: { site: Site }) => {
  const { dispatch } = useContext(AppContext)

  return (
    <td className="p-2">
      <div className="flex flex-col gap-6 p-4 w-full">
        <div 
          className={styles.name}
          onMouseEnter={() => dispatch({ type: 'SET_HOVERED_SITE', payload: site.uuid })}
          onMouseLeave={() => dispatch({ type: 'SET_HOVERED_SITE', payload: undefined })}>{site.name}</div>
        <SiteDetails site={site} />
      </div>
    </td>
  )
}