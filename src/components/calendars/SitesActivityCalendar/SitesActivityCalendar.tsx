import { useState, memo, useContext } from 'react'
import { Eventcalendar } from '@mobiscroll/react'
import UserContext from '../../../context/User/UserContext'
import { useFormatCalendarData, useCalendarProps } from '.'
import styles from './SitesActivityCalendar.module.css'

// Types
import { SitesActivityCalendarProps, SitesActivityCalendarState } from './types'

// Components
import CalendarTypeBtn from '../../buttons/calendars/CalendarTypeBtn/CalendarTypeBtn'
import ActivityCalendarLegend from '../ActivityCalendarLegend/ActivityCalendarLegend'

function SitesActivityCalendar({ sites, handleCellClick, handleEventClick }: SitesActivityCalendarProps) {
  const { user } = useContext(UserContext)

  const [state, setState] = useState<SitesActivityCalendarState>({ type: 'week', filter: null })

  const data = useFormatCalendarData(sites)

  const [onCellClick, onEventClick] = user?.role === 'Viewer' ? [() => null, () => null] : [handleCellClick, handleEventClick]

  const calendarProps = useCalendarProps(state.type, data, { onCellClick, onEventClick })

  return (
    <div data-testid="sites-acitivity-calendar" className={styles.container}>
      <CalendarTypeBtn
        handleClick={() => setState(prevState => ({ ...prevState, type: prevState.type === 'week' ? 'month' : 'week' }))}
        label={`Show ${ state.type === 'week' ? 'Month' : 'Week' } View`} />
        
      <div className={styles.calendarDiv}>
        <Eventcalendar
          { ...calendarProps } />
      </div>

      <div className={styles.legendDiv}>
        <ActivityCalendarLegend />
      </div>
    </div>
  )
}

export default memo(SitesActivityCalendar)