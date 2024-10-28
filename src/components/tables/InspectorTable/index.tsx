import { useMemo } from "react"

// Types
import { ReactElement } from 'react'
import { UseSetInspectorTableDataProps, InspectorTableData } from "./types"

export const useSetInspectorTableData = (sites: UseSetInspectorTableDataProps['sites'], year: UseSetInspectorTableDataProps['year']): InspectorTableData[] => {
  const data = useMemo(() => {
    const array: InspectorTableData[] = sites.map(site => {
      const inspections = site.Logs.filter(log => new Date(log.inspectionDate).getFullYear() === year) // Get logs for selected year by site

      return {
        site: site.name,
        dates: inspections.map(inspection => inspection.inspectionDate)
      }
    })

    return array
  }, [sites, year])

  return data
}

export const setInspectorTableRow = (row: InspectorTableData): ReactElement => {

  return (
    <tr>
      <td>{row.site}</td>
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