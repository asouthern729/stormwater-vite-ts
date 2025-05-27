import { Link } from "react-router"
import { useHandleTableRowClick } from "../ViolationsContainer/hooks"

// Types
import { ComplaintInterface } from "@/context/App/types"

// Components
import { ShowClosedCheckbox, PageNavBtns, CivilPenalty, Status } from "../ViolationsContainer/components"

export type ComplaintsTableDataType = ComplaintInterface & { siteUUID?: string, siteName?: string, primaryPermitee?: string }

export const ComplaintsTable = ({ tableData }: { tableData: ComplaintsTableDataType[] }) => {

  return (
      <div className="flex flex-col gap-6 items-center w-full">
  
        <div className="flex justify-between items-end w-full">
          <ShowClosedCheckbox />
          <PageNavBtns />
        </div>    
  
        <table className="table table-sm text-neutral-content">
          <TableHeaders />
          <TableBody tableData={tableData} />
        </table>
        
      </div>
    )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning font-[play]">
        <th>Date</th>
        <th>Site / Location</th>
        <th>Primary Permitee / Responsible Party</th>
        <th className="text-center">Concern</th>
        <th className="text-center">Status</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: ComplaintsTableDataType[] }) => { // Complaints table body
  
  return (
    <>
      {tableData.map(complaint => {
        if(complaint) return (
          <TableRow
            key={`complaints-table-row-${ complaint.uuid }`}
            complaint={complaint} />
        )
      })}
    </>
  )
}

const TableRow = ({ complaint }: { complaint: ComplaintsTableDataType }) => {
  const handleTableRowClick = useHandleTableRowClick(complaint.uuid)
  
  return (
    <tr title={complaint.details} onClick={handleTableRowClick}>
      <td>{complaint.date}</td>
      <td className={"whitespace-nowrap hover:text-warning"}>
        <LocationTableData complaint={complaint} />
      </td>
      <td>{complaint?.primaryPermitee || complaint.responsibleParty}</td>
      <Status closed={complaint.closed} />
    </tr>
  )
}

const LocationTableData = ({ complaint }: { complaint: ComplaintsTableDataType }) => {
  if(complaint.siteId) {
    return <Link to={`/site/${ complaint?.siteUUID }`}>{complaint?.siteName}</Link>
  }

  return (
    <span>{complaint.locationDescription}</span>
  )
}