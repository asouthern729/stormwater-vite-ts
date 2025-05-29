import { memo } from 'react'
import { Eventcalendar } from '@mobiscroll/react'
import { useFormatCalendarData, useCalendarProps, useHandleCalendarTypeBtnClick } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function SitesActivityCalendar({ sites }: { sites: AppTypes.SiteInterface[] }) {
  const { type, onClick } = useHandleCalendarTypeBtnClick()
  const calendarData = useFormatCalendarData(sites)
  const calendarProps = useCalendarProps(type, calendarData)

  return (
    <div className="flex flex-col gap-3 items-end w-full">
      <Components.CalendarTypeBtn onClick={onClick}>
        Show {type === 'week' ? 'Month' : 'Week'} View
      </Components.CalendarTypeBtn>
      <div className="flex flex-col gap-4 opacity-70 w-full shadow-xl">
        <Eventcalendar { ...calendarProps } />
      </div>

      <div className="m-auto h-fit shadow-xl">
        <Components.ActivityCalendarLegend />
      </div>
    </div>
  )
}

export default memo(SitesActivityCalendar)