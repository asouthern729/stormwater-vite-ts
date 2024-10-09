import styles from './SitesTable.module.css'

// Types
import { SetTableDataProps, SetTableDataStyleProps } from "./types"

// Components
import { ReactElement } from 'react'
import SiteDetails from '../../site/SiteDetails/SiteDetails'

export const setTableData = (site: SetTableDataProps['site'], options: SetTableDataProps['options']): ReactElement => { // Set table data
  const { dispatch } = options

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <div 
        className={styles.name}
        onMouseEnter={() => dispatch({ type: 'SET_HOVERED_SITE', payload: site.uuid })}
        onMouseLeave={() => dispatch({ type: 'SET_HOVERED_SITE', payload: undefined })}>{site.name}</div>
      <SiteDetails site={site} />
    </div>
  )
}

export const setTableDataStyle = (index: SetTableDataStyleProps['index'], hasOpenViolation: SetTableDataStyleProps['hasOpenViolation']): string | undefined => { // Set row style by index and whether the site has any open violations
  if(hasOpenViolation) {
    return styles.openViolationRow
  }

  return index % 2 === 0 ? styles.evenRow : undefined
}