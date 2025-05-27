import React, { useContext } from "react"
import EnforcementCtx from "../../context"
import { Link } from "react-router"
import { useReturnUserRoles } from "@/helpers/hooks"
import { useHandleNavBtns, useHandleTableRowClick } from './hooks'

// Types
import { ConstructionViolationInterface } from "@/context/App/types"

// Components
import FormContainer from "../../../form-elements/FormContainer"
import CreateLink from "../../../layout/nav/buttons/CreateLink"
import PrevPageBtn from "@/components/layout/nav/buttons/PrevPageBtn/PrevPageBtn"
import NextPageBtn from "@/components/layout/nav/buttons/NextPageBtn/NextPageBtn"

type FormProps = { formRef: React.RefObject<HTMLDivElement>, children: React.ReactElement }

export const UpdateForm = (props: FormProps) => { // Update form
  const { formUUID } = useContext(EnforcementCtx)
  
  if(!formUUID) return null

  return (
    <div ref={props.formRef}>
      <FormContainer>
        {props.children}
      </FormContainer>
    </div>
  )
}

type CreateBtnProps = { href: string, children: React.ReactNode }

export const CreateBtn = (props: CreateBtnProps) => {
  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) return null // Viewers

  return (
    <div className="absolute top-5 right-6">
      <CreateLink href={props.href}>{props.children}</CreateLink>
    </div>
  )
}

export type ViolationTableDataType = ConstructionViolationInterface & { siteUUID: string | undefined, siteName: string | undefined , primaryPermittee: string | undefined | null }

export const ViolationsTable = ({ tableData }: { tableData: ViolationTableDataType[] }) => {

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

export const ShowClosedCheckbox = () => { // Show closed site issues checkbox
  const { showClosedSiteIssues, dispatch } = useContext(EnforcementCtx)

  return (
    <div className="flex gap-2 text-neutral-content w-fit">
      <label>Show Closed:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={showClosedSiteIssues}
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES' })} />
    </div>
  )
}

export const PageNavBtns = () => { // Page nav buttons
  const { currentPage, totalPages } = useContext(EnforcementCtx)
  
  const { handlePrevBtn, handleNextBtn } = useHandleNavBtns()

  return (
    <div className="flex gap-4 ml-auto">
      <PrevPageBtn 
        onClick={handlePrevBtn}
        disabled={currentPage === 1} />
      <NextPageBtn 
        onClick={handleNextBtn}
        disabled={!totalPages || currentPage === totalPages} />
    </div>
  )
}

export const CivilPenalty = ({ civilPenalty }: { civilPenalty: { date: string | null, paymentReceived: string | null } }) => {
  if(!civilPenalty.date) return null // No penalty

  if(civilPenalty.paymentReceived) { // Paid
    return <td className="text-neutral-content font-bold uppercase text-center">Paid</td>
  }

  return ( // Issued
    <td className="text-error font-bold uppercase text-center">Issued</td>
  )
}

export const SWO = ({ swo }: { swo: { date: string | null, lifted: string | null } }) => {
  if(!swo.date) return null // No SWO date

  if(swo.lifted) { // Lifted
    return <td className="text-neutral-content font-bold uppercase text-center">Lifted</td>
  }

  return ( // Issued
    <td className="text-error font-bold uppercase text-center">Issued</td>
  )
}

export const Status = ({ closed }: { closed: boolean | null }) => { // Site issue status
  if(closed) { // Closed issue
    return <td className="text-success font-bold uppercase text-center">Closed</td>
  }

  return <td className="text-errorD font-bold uppercase text-center">Open</td>
}

const TableBody = ({ tableData }: { tableData: ViolationTableDataType[] }) => { // Sites issues table body
  
  return (
    <>
      {tableData.map(violation => {
        if(violation) return (
          <TableRow violation={violation} />
        )
      })}
    </>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning font-[play]">
        <th>Date</th>
        <th>Site</th>
        <th>Responsible Party</th>
        <th className="text-center">Civil Penalty</th>
        <th className="text-center">SWO</th>
        <th className="text-center">Status</th>
      </tr>
    </thead>
  )
}

const TableRow = ({ violation }: { violation: ViolationTableDataType }) => {
  const handleTableRowClick = useHandleTableRowClick(violation.uuid)
  
  return (
    <tr title={violation.details} onClick={handleTableRowClick}>
      <td>{violation.date}</td>
      <td className={"whitespace-nowrap hover:text-warning"}>
        <Link to={`/site/${ violation.siteUUID }`}>{violation.siteName}</Link>
      </td>
      <td>{violation.primaryPermittee}</td>
      <CivilPenalty 
        civilPenalty={{ date: violation.penaltyDate, paymentReceived: violation.paymentReceived }} />
      <SWO 
        swo={{ date: violation.swoDate, lifted: violation.swoLiftedDate }} />
      <Status closed={violation.closed} />
    </tr>
  )
}