// Types
import * as AppTypes from '@/context/App/types'

export const setLastInspectionDate = (site: AppTypes.SiteInterface) => {
  const logs = site.Logs

  if(!logs?.length) return ''

  return logs[0].inspectionDate
}