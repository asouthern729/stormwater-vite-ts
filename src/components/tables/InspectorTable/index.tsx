import { useEffect, useMemo } from "react"
import { Link } from "react-router-dom"

// Types
import { ReactElement } from 'react'
import { UseSetInspectorTableDataProps, UseScrollToFormRefProps, InspectorTableData, SetInspectorTableRowProps } from "./types"

export const useSetInspectorTableData = (sites: UseSetInspectorTableDataProps['sites'], year: UseSetInspectorTableDataProps['year']): InspectorTableData[] => {
  const data = useMemo(() => {
    const array: InspectorTableData[] = sites.map(site => {
      const inspections = site.Logs.filter(log => new Date(log.inspectionDate).getFullYear() === year) // Get logs for selected year by site

      return {
        site: site.name,
        dates: inspections.map(inspection => inspection.inspectionDate),
        uuid: site.uuid,
        siteId: site.siteId
      }
    })

    return array
  }, [sites, year])

  return data
}

export const useScrollToFormRef = (showForm: UseScrollToFormRefProps['showForm'], formRef: UseScrollToFormRefProps['formRef'], tableRef: UseScrollToFormRefProps['tableRef']): void => {
  useEffect(() => { // Scroll to form if active
    if(showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if(!showForm && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } 
  }, [showForm, formRef, tableRef])
}

export const setInspectorTableRow = (row: SetInspectorTableRowProps['row'], selection: SetInspectorTableRowProps['selection'], options: SetInspectorTableRowProps['options']): ReactElement => {
  const { setState } = options

  const selected = selection.some(siteId => siteId === row.siteId)

  return (
    <tr key={`inspector-table-row-${ row.siteId }`}>
      <td className="flex flex-col items-center">
        <input 
          type="checkbox" 
          className="checkbox checkbox-secondary"
          checked={selected}
          onChange={() => setState(prevState => selected ? { ...prevState, selection: selection.filter(siteId => siteId !== row.siteId) } : { ...prevState, selection: [...prevState.selection, row.siteId] })} />
      </td>
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