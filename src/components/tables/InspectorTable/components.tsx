import { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../../context/User/UserContext"

// Types
import { Dispatch, RefObject, SetStateAction } from "react"
import { InspectorTableState } from "./types"
import { InspectorTableData } from "./types"

// Components
import CreateSiteLogBtn from "../../buttons/forms/CreateSiteLogBtn/CreateSiteLogBtn"
import FormContainer from "../../forms/FormContainer/FormContainer"
import CreateMultipleSiteLogsForm from "../../forms/create/CreateMultipleSiteLogsForm/CreateMultipleSiteLogsForm"

export const TableHeaders = () => {
  const { user } = useContext(UserContext)

  return (
    <thead>
      <tr>
        <th className={`${ user?.role === 'Viewer' ? 'hidden' : undefined }`}>Create Site Log</th>
        <th>Site</th>
        <th>Jan</th>
        <th>Feb</th>
        <th>Mar</th>
        <th>Apr</th>
        <th>May</th>
        <th>Jun</th>
        <th>Jul</th>
        <th>Aug</th>
        <th>Sep</th>
        <th>Oct</th>
        <th>Nov</th>
        <th>Dec</th>
      </tr>
    </thead>
  )
}

export const CreateLogBtn = ({ selected, handleClick }: { selected: number, handleClick: () => void }) => { // Create site log button
  if(selected === 0) return null

  return (
    <div className="mx-auto mt-2">
      <CreateSiteLogBtn 
        selected={selected}
        handleClick={handleClick} />
    </div>
  )
}

export const TableBody = ({ tableData, selection, setState }: { tableData: InspectorTableData[], selection: string[], setState: Dispatch<SetStateAction<InspectorTableState>> }) => { // Inspector table body

  return (
    <>
      {tableData.map(row => {
        return (
          <TableRow
            key={`inspector-table-row-${ row.siteId }`}
            row={row}
            selected={selection.includes(row.siteId)}
            selection={selection}
            setState={setState} />
        )
      })}
    </>
  )
}

export const Form = ({ visible, formRef, selection, handleCloseForm }: { visible: boolean, formRef: RefObject<HTMLDivElement>, selection: string[], handleCloseForm: () => void }) => { // Site log form
  if(!visible) return null

  return (
    <div ref={formRef} className="w-full">
      <FormContainer>
        <CreateMultipleSiteLogsForm 
          siteIds={selection}
          handleCloseForm={handleCloseForm} />
      </FormContainer>
    </div>
  )
}

const TableRow = ({ row, selected, selection, setState }: { row: InspectorTableData, selected: boolean, selection: string[], setState: Dispatch<SetStateAction<InspectorTableState>> }) => {

  return (
    <tr>

      <CreateSiteLogColumn
        selected={selected}
        onChange={() => setState(prevState => selected ? { ...prevState, selection: selection.filter(siteId => siteId !== row.siteId) } : { ...prevState, selection: [ ...prevState.selection, row.siteId] })} />

      <td className="w-fit hover:text-warning"><Link to={`/site/${ row.uuid }`}>{row.site}</Link></td>
      {Array.from({ length: 12 }).map((_, index) => {
        return (
          <td>
            <div className="flex flex-col">
              {row.dates.filter(date => new Date(date).getMonth() === index).sort((a, b) => {
                const dateA = new Date(a).getTime()
                const dateB = new Date(b).getTime()

                if(dateA > dateB) {
                  return -1
                }

                if(dateB < dateA) {
                  return 1
                }

                return 0
              }).map(x => {
                return (
                  <small>{x}</small>
                )
              })}
            </div>
          </td>
        )
      })}
    </tr>
  )
}

const CreateSiteLogColumn = ({ selected, onChange }: { selected: boolean, onChange: () => void }) => {
  const { user } = useContext(UserContext)

  if(user?.role === 'Viewer') return null

  return (
    <td className="flex flex-col items-center">
      <input 
        type="checkbox" 
        className="checkbox checkbox-secondary"
        checked={selected}
        onChange={onChange} />
    </td>
  )
}