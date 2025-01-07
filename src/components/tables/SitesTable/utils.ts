import styles from './SitesTable.module.css'

// Types
import { SetTableDataStyleProps } from "./types"

export const setTableDataStyle = (index: SetTableDataStyleProps['index'], site: SetTableDataStyleProps['site']): string | undefined => { // Set row style by index and whether the site has any open violations
  const hasOpenIssue = site.hasOpenViolation || site.hasOpenComplaint || site.hasOpenIllicitDischarge

  if(hasOpenIssue) {
    return styles.openViolationRow
  }

  return index % 2 === 0 ? styles.evenRow : undefined
}