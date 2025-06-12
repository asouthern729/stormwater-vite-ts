import React, { useContext, useMemo } from 'react'
import SiteCtx from '../../context'
import EnforcementCtx from '@/components/enforcement/context'
import { setFormType } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { FormType } from '../../context'
import { IssueTableDataType, CombinedType } from './types'

export const useSetTableData = (site: AppTypes.SiteInterface) => {
  const { showClosedSiteIssues, dateRangeFilter } = useContext(SiteCtx)

  return useMemo(() => {
    if(site.Complaints && site.ConstructionViolations && site.IllicitDischarges) {
      let combined: CombinedType[] = [ ...site.Complaints, ...site.ConstructionViolations, ... site.IllicitDischarges ]

      if(!showClosedSiteIssues) { // Closed issue filter
        combined = combined.filter(issue => !issue.closed)
      }

      if(dateRangeFilter.start && dateRangeFilter.end) { // Date range filter
        combined = combined.filter(issue => {
          const date = new Date(issue.date)
          const startDate = new Date(dateRangeFilter.start)
          const endDate = new Date(dateRangeFilter.end)

          return date >= startDate && date <= endDate
        })
      }

      const combinedArray: IssueTableDataType[] = []

      combined.forEach(item => {
        const issue: IssueTableDataType = {
          date: item.date,
          civilPenalty: {
            issued: !!item?.penaltyDate,
            received: !!item?.paymentReceived
          },
          swo: {
            issued: !!item?.swoDate,
            lifted: !!item?.swoLiftedDate
          },
          closed: item.closed,
          concern: item?.concern,
          otherConcern: item?.otherConcern,
          form: setFormType(item as { complaintId?: string, violationId?: string, illicitId?: string }),
          details: item?.details,
          uuid: item?.uuid
        }

        combinedArray.push(issue)
      })

      const sorted = combinedArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      return sorted
    } else return []
  }, [showClosedSiteIssues, dateRangeFilter])
}

export const useOnRowClick = () => {
  const { dispatch } = useContext(EnforcementCtx)

  return (e: React.MouseEvent<HTMLTableRowElement>) => {
    dispatch({ type: 'SET_FORM_UUID', payload: e.currentTarget.dataset.uuid as string })
    dispatch({ type: 'SET_ACTIVE_FORM', payload: e.currentTarget.dataset.form as FormType })
  }
}