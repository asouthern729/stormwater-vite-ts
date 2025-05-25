import { Link } from "react-router" 
import { useHandleTableRowClick } from "../ViolationsContainer/hooks"

// Types
import { IllicitDischargeInterface } from "@/context/App/types"

// Components
import { ShowClosedCheckbox, PageNavBtns, CivilPenalty, Status } from "../ViolationsContainer/components"

export type IllicitDischargesTableDataType = IllicitDischargeInterface & { siteUUID?: string, siteName?: string, primaryPermitee?: string }

export const IllicitDischargesTable = ({ tableData }: { tableData: IllicitDischargesTableDataType[] }) => {

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
        <th className="text-center">Civil Penalty</th>
        <th className="text-center">SWO</th>
        <th className="text-center">Status</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: IllicitDischargesTableDataType[] }) => { // Sites issues table body
  
  return (
    <>
      {tableData.map(illicit => {
        if(illicit) return (
          <TableRow
            key={`illcit-discharges-table-row-${ illicit.uuid }`}
            illicit={illicit} />
        )
      })}
    </>
  )
}

const TableRow = ({ illicit }: { illicit: IllicitDischargesTableDataType }) => {
  const handleTableRowClick = useHandleTableRowClick(illicit.uuid)
  
  return (
    <tr title={illicit.details} onClick={handleTableRowClick}>
      <td>{illicit.date}</td>
      <td className={"whitespace-nowrap hover:text-warning"}>
        <LocationTableData illicit={illicit} />
      </td>
      <td>{illicit?.primaryPermitee}</td>
      <CivilPenalty 
        civilPenalty={{ date: illicit.penaltyDate, paymentReceived: illicit.paymentReceived }} />
      <Status closed={illicit.closed} />
    </tr>
  )
}

const LocationTableData = ({ illicit }: { illicit: IllicitDischargesTableDataType }) => {
  if(illicit.siteId) {
    return <Link to={`/site/${ illicit?.siteUUID }`}>{illicit?.siteName}</Link>
  }

  return (
    <span>{illicit.locationDescription}</span>
  )
}