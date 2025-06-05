type CalendarTypeBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

export const CalendarTypeBtn = (props: CalendarTypeBtnProps) => {

  return (
    <button 
      type="button"
      onClick={props.onClick}
      className="text-neutral-content font-[play] uppercase p-2 py-1 bg-transparent hover:bg-neutral hover:cursor-pointer">
        {props.children}
    </button>
  )
}

export const ActivityCalendarLegend = () => {

  return (
    <div className="flex gap-6 font-[play] text-sm font-bold uppercase p-6 bg-neutral flex-wrap justify-center m-auto w-fit">
      <ActivityCalendarLegendItem className="text-neutral-content bg-[#157EE8]">Inspection</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem className="bg-[#F55D34]">Violation</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem className="bg-[#ED5197]">Complaint</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem className="bg-[#C4EB3B]">Illicit Discharge</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem className="bg-[#FFFF00]">Follow Up</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem className="bg-[#DB4EFC]">Penalty</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem className="bg-[#FFFFFF]">SWO</ActivityCalendarLegendItem>
    </div>
  )
}

type ActivityCalendarLegendItemProps = { className: string, children: React.ReactNode }

const ActivityCalendarLegendItem = (props: ActivityCalendarLegendItemProps) => {

  return (
    <div className={`${ props.className } p-2 py-[2px] text-center w-[120px] rounded whitespace-nowrap min-w-fit`}>{props.children}</div>
  )
}