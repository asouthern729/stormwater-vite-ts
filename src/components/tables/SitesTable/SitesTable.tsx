import { useContext, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../../context/App/AppContext'
import { setTableData, setTableDataStyle } from '.'
import styles from './SitesTable.module.css'

// Types
import { SitesTableProps } from "./types"

function SitesTable({ sites }: SitesTableProps) {
  const { dispatch } = useContext(AppContext)

  const navigate = useNavigate()

  return (
    <div data-testid="sites-table" className={styles.container}>
      <table className="bg-neutral-content">
        <tbody>
          {sites.map((site, index) => {
            return (
              <tr key={`table-row-${ index }`} className={setTableDataStyle(index, site)} onClick={() => navigate(`/site/${ site.uuid }`)}>
                <td className="p-2">{setTableData(site, { dispatch })}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default memo(SitesTable)