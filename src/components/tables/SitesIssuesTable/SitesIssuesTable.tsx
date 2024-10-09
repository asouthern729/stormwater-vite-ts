import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AppContext from '../../../context/App/AppContext'
import { useHandlePageData, setSitesIssuesTableData, handleNextPageBtnClick, handlePrevPageBtnClick, setTableHeaders, setTableBody } from '.'
import styles from './SitesIssuesTable.module.css'

// Types
import { SitesIssuesTableProps, SitesIssuesTableState } from "./types"

// Components
import PrevPageBtn from '../../buttons/nav/PrevPageBtn/PrevPageBtn'
import NextPageBtn from '../../buttons/nav/NextPageBtn/NextPageBtn'

function SitesIssuesTable({ sites, issues, handleRowClick }: SitesIssuesTableProps) {
  const { showClosedSiteIssues, dispatch } = useContext(AppContext)

  const [state, setState] = useState<SitesIssuesTableState>({ currentPage: 1 })

  const location = useLocation()

  const tableData = setSitesIssuesTableData(sites, issues)

  const totalPages = Math.ceil(tableData.length / 20) // 20 results per page

  const pageData = useHandlePageData(tableData, state.currentPage)

  return (
    <div className={styles.container}>

      <div className="flex justify-between items-end w-full">
        <div className="flex gap-2 text-neutral-content w-fit">
          <label>Show Closed:</label>
          <input 
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={showClosedSiteIssues}
            onChange={() => dispatch({ type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES', payload: undefined })} />
        </div>

        <div className="flex gap-4 ml-auto">
          <PrevPageBtn 
            handleClick={() => handlePrevPageBtnClick(setState)}
            disabled={state.currentPage === 1} />
          <NextPageBtn 
            handleClick={() => handleNextPageBtnClick(setState)}
            disabled={state.currentPage === totalPages} />
        </div>
      </div>    

      <table className="table table-sm text-neutral-content">
        <thead>
          {setTableHeaders(location)}
        </thead>
        <tbody>

          {pageData.map(issue => {
            return (
              <>
                {setTableBody(location, issue, { handleRowClick })}
              </>
            )
          })}

        </tbody>
      </table>
      
    </div>
  )
}

export default SitesIssuesTable