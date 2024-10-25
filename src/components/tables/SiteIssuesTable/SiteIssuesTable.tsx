import { useState, memo } from "react"
import { setCivilPenaltyTableData, setSWOTableData, setStatusTableData } from "../SitesIssuesTable"
import { useSetSiteIssuesTableData, setTypeIcon } from "."
import styles from './SiteIssuesTable.module.css'

// Types
import { SiteIssuesTableProps, SiteIssuesTableState } from "./types"

// Components
import ShowAllBtn from "../../buttons/filters/ShowAllBtn/ShowAllBtn"

function SiteIssuesTable({ site, handleRowClick }: SiteIssuesTableProps) {
  const [state, setState] = useState<SiteIssuesTableState>({ showAll: false })

  const tableData = useSetSiteIssuesTableData(site, state.showAll)

  return (
    <div className={styles.container}>

      <table className="table table-xs text-neutral-content">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th className="text-center">Civil Penalty</th>
            <th className="text-center">SWO</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((obj, index) => {
            return (
              <tr 
                key={`site-issues-table-row-${ index }`} 
                data-form={obj.form} 
                data-uuid={obj.uuid} 
                title={obj.details} 
                onClick={(event) => handleRowClick(event)}>
                  <td>{obj.date}</td>
                  {setTypeIcon(obj.form)}
                  {setCivilPenaltyTableData(obj.civilPenalty)}
                  {setSWOTableData(obj.swo)}
                  {setStatusTableData(obj.closed)}
              </tr>
            )
          })}
        </tbody>
      </table>

      {site.ConstructionViolations.length + site.Complaints.length > 5 && (
        <div className="w-full">
          <ShowAllBtn 
            label={!state.showAll ? 'Show All' : 'Show Less'}
            handleClick={() => setState(prevState => ({ showAll: !prevState.showAll }))} />
        </div>
      )}
      
    </div>
  )
}

export default memo(SiteIssuesTable)