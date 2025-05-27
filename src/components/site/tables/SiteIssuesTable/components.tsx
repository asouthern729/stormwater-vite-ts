import violationIcon from '../../../assets/icons/violation/violation.svg'
import complaintIcon from '../../../assets/icons/complaint/complaint.svg'
import dischargeIcon from '../../../assets/icons/discharge/discharge.svg'

// Types
import { MouseEvent, Dispatch, SetStateAction } from "react"
import { SiteForm } from "../../containers/SiteContainer/types"
import { Issue, SiteIssuesTableState } from "./types"

// Components
import ShowAllBtn from '../../../enforcement/filters/buttons/ShowAllBtn/ShowAllBtn'

export const TableBody = ({ issues, handleRowClick }: { issues: Issue[], handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void }) => { // Site issues table body

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

export const ShowAllIssuesBtn = ({ visible, showAll, setState }: { visible: boolean, showAll: boolean, setState: Dispatch<SetStateAction<SiteIssuesTableState>> }) => { // Show all issues button
  if(!visible) return null

  return (
    <div className="w-full">
      <ShowAllBtn 
        label={!showAll ? 'Show All' : 'Show Less'}
        handleClick={() => setState(prevState => ({ showAll: !prevState.showAll }))} />
    </div>
  )
}

const TableRow = ({ issue, handleRowClick }: { issue: Issue, handleRowClick: (event: MouseEvent<HTMLTableRowElement>) => void }) => {

  return (
    <tr 
      key={`site-issues-table-row-${ issue.uuid }`} 
      data-form={issue.form} 
      data-uuid={issue.uuid} 
      title={issue.details} 
      onClick={(event) => handleRowClick(event)}>
        <td>{issue.date}</td>
        <TypeIcon type={issue.form} />
        <CivilPenalty civilPenalty={issue.civilPenalty} />
        <SWO swo={issue.swo} />
        <Status closed={issue.closed} />
    </tr>
  )
}

const TypeIcon = ({ type }: { type: SiteForm }) => { // Type icon
  let component

  switch(type) {
    case 'updateSiteComplaint':
      component = (
        <td title={'Site Complaint'}><img src={complaintIcon} className="p-1 w-8"></img></td>
      )
      break
    case 'updateIllicitDischarge':
      component = (
        <td title={'Illicit Discharge'}><img src={dischargeIcon} className="p-1 w-8"></img></td>
      )
      break
    default:
      component = (
        <td title={'Construction Violation'}><img src={violationIcon} className="p-1 w-8"></img></td>
      )
  }

  return component
}

const CivilPenalty = ({ civilPenalty }: { civilPenalty: { issued: boolean | null, received: boolean | null } | undefined }) => { // Civil penalty td
  if(!civilPenalty?.issued) return <td></td>

  return (
    <>
      {civilPenalty.received ? (
        <td className="text-neutral-content font-bold uppercase text-center">Paid</td>
      ):  <td className="text-error font-bold uppercase text-center">Issued</td>}
    </>
  )
}

const SWO = ({ swo }: { swo: { issued: boolean | null, lifted: boolean | null } }) => { // SWO 
  if(!swo.issued) return <td></td>

  return (
    <>
      {swo.lifted ? (
        <td className="text-neutral-content font-bold uppercase text-center">Lifted</td>
      ) : <td className="text-error font-bold uppercase text-center">Issued</td>}
    </>
  )
}

const Status = ({ closed }: { closed: boolean | undefined }) => { // Issue status

  return (
    <>
      {closed ? (
        <td className="text-success font-bold uppercase text-center">Closed</td>
      ) : <td className="text-errorD font-bold uppercase text-center">Open</td>}
    </>
  )
}