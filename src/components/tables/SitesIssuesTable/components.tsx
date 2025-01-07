import { useContext } from "react"
import { useLocation, Link } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"
import { handlePrevPageBtnClick, handleNextPageBtnClick } from "./utils"

// Types
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { Issue } from "../SiteIssuesTable/types"
import { SitesIssuesTableState } from "./types"

// Components
import PrevPageBtn from "../../buttons/nav/PrevPageBtn/PrevPageBtn"
import NextPageBtn from "../../buttons/nav/NextPageBtn/NextPageBtn"

export const ShowClosedCheckbox = () => { // Show closed site issues checkbox
  const { showClosedSiteIssues, dispatch } = useContext(AppContext)

  return (
    <div className="flex gap-2 text-neutral-content w-fit">
      <label>Show Closed:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={showClosedSiteIssues}
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES', payload: undefined })} />
    </div>
  )
}

export const PageNavBtns = ({ setState, totalPages, currentPage }: { setState: Dispatch<SetStateAction<SitesIssuesTableState>>, totalPages: number, currentPage: number }) => { // Page nav buttons

  return (
    <div className="flex gap-4 ml-auto">
      <PrevPageBtn 
        handleClick={() => handlePrevPageBtnClick(setState)}
        disabled={currentPage === 1} />
      <NextPageBtn 
        handleClick={() => handleNextPageBtnClick(setState)}
        disabled={!totalPages || currentPage === totalPages} />
    </div>
  )
}

export const TableBody = ({ issues, handleRowClick }: { issues: Issue[], handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void }) => { // Sites issues table body
  
  return (
    <>
      {issues.map(issue => {
        return (
          <TableRow 
            issue={issue}
            handleRowClick={handleRowClick} />
        ) 
      })}
    </>
  )
}

export const TableHeaders = () => { // Site issues table headers
  const pathname = useLocation().pathname

  const page = pathname.split('/')[1]

  let element

  switch(page) {
    case 'complaints':
      element = (
        <tr>
          <th>Date</th>
          <th>Site</th>
          <th>Responsible Party</th>
          <th>Concern</th>
          <th className="text-center">Status</th>
        </tr>
      )
      break
    case 'green':
      element = (
        <tr>
          <th>Date</th>
          <th>Responsible Party</th>
          <th className="text-center">Civil Penalty</th>
          <th className="text-center">Status</th>
        </tr>
      )
      break
    default: // Construction violations and illicit discharges
      element = (
        <tr>
          <th>Date</th>
          <th>Site</th>
          <th>Responsible Party</th>
          <th className="text-center">Civil Penalty</th>
          <th className="text-center">SWO</th>
          <th className="text-center">Status</th>
        </tr>
      )
      break
  }

  return (
    <thead>
      {element}
    </thead>
  )
}

const TableRow = ({ issue, handleRowClick }: { issue: Issue, handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void }) => {
  const pathname = useLocation().pathname

  const page = pathname.split('/')[1]

  let element

  switch(page) {
    case 'complaints':
      element = (
        <tr data-uuid={issue?.uuid} title={issue?.details} onClick={(event) => handleRowClick(event)}>
          <td>{issue?.date}</td>
          <td className={issue?.siteUUID ? "whitespace-nowrap hover:text-warning" : "whitespace-nowrap"}>{issue?.siteUUID ? <Link to={`/site/${ issue.siteUUID }`}>{issue.site}</Link> : null}</td>
          <td>{issue?.responsibleParty}</td>
          <td>{issue?.concern}</td>
          <Status closed={issue.closed} /> 
        </tr>
      )
      break
    case 'green':
      element = (
        <tr data-uuid={issue?.uuid} title={issue?.details} onClick={(event) => handleRowClick(event)}>
          <td>{issue?.date}</td>
          <td>{issue?.responsibleParty}</td>
          <CivilPenalty civilPenalty={issue.civilPenalty} />
          <Status closed={issue.closed} />
        </tr>
      )
      break
    default:
      element = (
        <tr data-uuid={issue?.uuid} title={issue?.details} onClick={(event) => handleRowClick(event)}>
          <td>{issue?.date}</td>
          <td className={issue?.siteUUID ? "whitespace-nowrap hover:text-warning" : "whitespace-nowrap"}>{issue?.siteUUID ? <Link to={`/site/${ issue.siteUUID }`}>{issue.site}</Link> : null}</td>
          <td>{issue?.responsibleParty}</td>
          <CivilPenalty civilPenalty={issue.civilPenalty} />
          <SWO swo={issue.swo} />
          <Status closed={issue.closed} />
        </tr>
      )
  }

  return element
}

const Status = ({ closed }: { closed: boolean | undefined }) => { // Site issue status
  if(closed) { // Closed issue
    return <td className="text-success font-bold uppercase text-center">Closed</td>
  }

  return <td className="text-errorD font-bold uppercase text-center">Open</td>
}

const CivilPenalty = ({ civilPenalty }: { civilPenalty: { issued: boolean | null, received: boolean | null } | undefined }) => { // Civil penalty
  if(!civilPenalty?.issued) return <td></td>

  return (
    <>
      {civilPenalty.received ? (
        <td className="text-neutral-content font-bold uppercase text-center">Paid</td>
      ) : <td className="text-error font-bold uppercase text-center">Issued</td>}
    </>
  )
}

const SWO = ({ swo }: { swo: { issued: boolean | null, lifted: boolean | null } | undefined }) => { // SWO
  if(!swo?.issued) return <td></td>

  return (
    <>
      {swo.lifted ? (
        <td className="text-neutral-content font-bold uppercase text-center">Lifted</td>
      ) : <td className="text-error font-bold uppercase text-center">Issued</td>}
    </>
  )
}