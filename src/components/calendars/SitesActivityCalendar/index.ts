// Types
import { useMemo } from "react"
import { MbscEventcalendarOptions } from "@mobiscroll/react"
import { UseFormatCalendarDataProps, UseCalendarPropsProps, DatesObj, CalendarObj } from "./types"

export const useFormatCalendarData = (sites: UseFormatCalendarDataProps['sites']): CalendarObj[] => {
  const calendarData = useMemo(() => {
    const dates: DatesObj = {
      logsArray: [],
      violationsArray: [],
      complaintsArray: [],
      followUpsArray: [],
      penaltyArray: [],
      illicitArray: []
    }

    const addCalendarObj = (calendarEvent: CalendarObj, typeArray: CalendarObj[]) => { // Add calendar event to dates obj
      typeArray.push(calendarEvent)
    }

    sites.map(site => {
      site.Logs.forEach(log => { // Site logs
        addCalendarObj({ start: new Date(log.inspectionDate), end: new Date(log.inspectionDate), allDay: true, title: `Inspection - ${ site.name }`, color: '#157EE8', uuid: site.uuid, formUUID: log.uuid, form: "updateSiteLog" }, dates.logsArray)
      })
  
      site.ConstructionViolations.forEach(violation => { // Construction violations
        addCalendarObj({ start: new Date(violation.date), end: new Date(violation.date), allDay: true, title: `Construction Violation - ${ site.name }`, color: '#F55D34', uuid: site.uuid, formUUID: violation.uuid, form: "updateSiteConstructionViolation" }, dates.violationsArray)
  
        violation.FollowUpDates.forEach(followUp => { // Construction violation follow ups
          addCalendarObj({ start: new Date(followUp.followUpDate), end: new Date(followUp.followUpDate), allDay: true, title: `Follow Up - ${ site.name }`, color: '#FFFF00', uuid: site.uuid, formUUID: violation.uuid, form: "updateSiteConstructionViolation" }, dates.followUpsArray)
        })
  
        if(violation.penaltyDate) { // Construction violation penalties
          const penaltyDueDate = violation.penaltyDueDate
          const penaltyReceivedDate = violation.paymentReceived
  
          addCalendarObj({ start: new Date(violation.penaltyDate), end: new Date(violation.penaltyDate), allDay: true, title: `Penalty - ${ site.name }`, color: '#DB4EFC', uuid: site.uuid, formUUID: violation.uuid, form: "updateSiteConstructionViolation" }, dates.penaltyArray)
  
          if(penaltyDueDate) { // Construction violation penalty due dates
            addCalendarObj({ start: new Date(penaltyDueDate), end: new Date(penaltyDueDate), allDay: true, title: `Penalty Due - ${ site.name }`, color: '#DB4EFC', uuid: site.uuid, formUUID: violation.uuid, form: "updateSiteConstructionViolation" }, dates.penaltyArray)
          }
  
          if(penaltyReceivedDate) { // Construction violation penalty received dates
            addCalendarObj({ start: new Date(penaltyReceivedDate), end: new Date(penaltyReceivedDate),allDay: true, title: `Penalty Received - ${ site.name }`, color: '#DB4EFC', uuid: site.uuid, formUUID: violation.uuid, form: "updateSiteConstructionViolation" }, dates.penaltyArray)
          }
        }
      })

      site.Complaints.forEach(complaint => { // Complaints
        addCalendarObj({ start: new Date(complaint.date), end: new Date(complaint.date), allDay: true, title: `Complaint - ${ site.name }`, color: '#ED5197', uuid: site.uuid, formUUID: complaint.uuid, form: "updateSiteComplaint" }, dates.complaintsArray)
  
        complaint.FollowUpDates.forEach(followUp => { // Complaint follow ups
          addCalendarObj({ start: new Date(followUp.followUpDate), end: new Date(followUp.followUpDate), allDay: true, title: `Follow Up - ${ site.name }`, color: '#FFFF00', uuid: site.uuid, formUUID: complaint.uuid, form: "updateSiteComplaint" }, dates.followUpsArray)
        })
      })

      site.IllicitDischarges.forEach(illicit => { // Illicit discharges
        addCalendarObj({ start: new Date(illicit.date), end: new Date(illicit.date), allDay: true, title: `Illicit Discharge - ${ site.name }`, color: '#C4EB3B', uuid: site.uuid, formUUID: illicit.uuid, form: 'updateIllicitDischarge'}, dates.illicitArray)

        illicit.FollowUpDates.forEach(followUp => { // Complaint follow ups
          addCalendarObj({ start: new Date(followUp.followUpDate), end: new Date(followUp.followUpDate), allDay: true, title: `Follow Up - ${ site.name }`, color: '#FFFF00', uuid: site.uuid, formUUID: illicit.uuid, form: "updateIllicitDischarge" }, dates.followUpsArray)
        })
      })
    })

    return dates
  }, [sites])

  return [ 
    ...calendarData.logsArray, 
    ...calendarData.violationsArray, 
    ...calendarData.followUpsArray, 
    ...calendarData.penaltyArray, 
    ...calendarData.complaintsArray, 
    ...calendarData.illicitArray
  ]
}

export const useCalendarProps = (type: UseCalendarPropsProps['type'], data: UseCalendarPropsProps['data'], options: UseCalendarPropsProps['options']): MbscEventcalendarOptions => { // Set calendar props
  const { onCellClick, onEventClick } = options

  const calendarProps = useMemo(() => {
    const props: MbscEventcalendarOptions = {
      theme: 'material',
      themeVariant: "dark",
      clickToCreate: false,
      dragToCreate: false,
      dragToMove: false,
      dragToResize: false,
      eventDelete: false,
      view: {
        calendar: { type }
      },
      data
    }

    if(onCellClick) { // Handle cell double click on site page
      props.onCellDoubleClick = (event) => onCellClick(event)
    }

    if(onEventClick) { // Handle event click on site page
      props.onEventClick = (event) => onEventClick(event)
    }

    return props
  }, [data, onCellClick, onEventClick, type])

  return calendarProps
}