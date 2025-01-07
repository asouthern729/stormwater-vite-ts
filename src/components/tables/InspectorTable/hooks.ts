import { useEffect, useMemo } from "react"

// Types
import { UseSetInspectorTableDataProps, UseScrollToFormRefProps, InspectorTableData } from "./types"

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