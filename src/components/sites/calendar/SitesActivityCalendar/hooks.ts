import { useState, useCallback } from 'react'
import { useMsal } from "@azure/msal-react"
import { useNavigate } from "react-router"

// Types
import { useMemo } from "react"
import { MbscEventcalendarOptions, MbscCalendarEvent } from "@mobiscroll/react"
import { SiteInterface } from "@/context/App/types"
import { CalendarDatesInterface, CalendarDataInterface } from "./types"

export const useFormatCalendarData = (sites: SiteInterface[]) => {
  const calendarData = useMemo(() => {
    const dates: CalendarDatesInterface = {
      logsArray: [],
      violationsArray: [],
      complaintsArray: [],
      followUpsArray: [],
      penaltyArray: [],
      illicitArray: []
    }

    const addCalendarObj = (calendarEvent: CalendarDataInterface, typeArray: CalendarDataInterface[]) => { // Add calendar event to dates obj
      typeArray.push(calendarEvent)
    }

    sites.map(site => {
      site.Logs?.forEach(log => { // Site logs
        addCalendarObj({ start: new Date(log.inspectionDate), end: new Date(log.inspectionDate), allDay: true, title: `Inspection - ${ site.name }`, color: '#157EE8', uuid: site.uuid, formUUID: log.uuid, form: "updateSiteLog" }, dates.logsArray)
      })
  
      site.ConstructionViolations?.forEach(violation => { // Construction violations
        addCalendarObj({ start: new Date(violation.date), end: new Date(violation.date), allDay: true, title: `Construction Violation - ${ site.name }`, color: '#F55D34', uuid: site.uuid, formUUID: violation.uuid, form: "updateSiteConstructionViolation" }, dates.violationsArray)
  
        violation.FollowUpDates?.forEach(followUp => { // Construction violation follow ups
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

      site.Complaints?.forEach(complaint => { // Complaints
        addCalendarObj({ start: new Date(complaint.date), end: new Date(complaint.date), allDay: true, title: `Complaint - ${ site.name }`, color: '#ED5197', uuid: site.uuid, formUUID: complaint.uuid, form: "updateSiteComplaint" }, dates.complaintsArray)
  
        complaint.FollowUpDates?.forEach(followUp => { // Complaint follow ups
          addCalendarObj({ start: new Date(followUp.followUpDate), end: new Date(followUp.followUpDate), allDay: true, title: `Follow Up - ${ site.name }`, color: '#FFFF00', uuid: site.uuid, formUUID: complaint.uuid, form: "updateSiteComplaint" }, dates.followUpsArray)
        })
      })

      site.IllicitDischarges?.forEach(illicit => { // Illicit discharges
        addCalendarObj({ start: new Date(illicit.date), end: new Date(illicit.date), allDay: true, title: `Illicit Discharge - ${ site.name }`, color: '#C4EB3B', uuid: site.uuid, formUUID: illicit.uuid, form: 'updateIllicitDischarge'}, dates.illicitArray)

        illicit.FollowUpDates?.forEach(followUp => { // Complaint follow ups
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

export const useCalendarProps = (type: 'week' | 'month', calendarData: CalendarDataInterface[]) => { // Set calendar props
  const onEventClick = useHandleEventClick()

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
      data: calendarData
    }

    props.onEventClick = (event) => onEventClick(event)

    return props
  }, [calendarData, type])

  return calendarProps
}

export const useHandleCalendarTypeBtnClick = (): { type: 'week' | 'month', onClick: React.MouseEventHandler<HTMLButtonElement> } => {
  const [state, setState] = useState<{ type: 'week' | 'month' }>({ type: 'week' })

  const cb = useCallback(() => {
    const newType = state.type === 'week' ? 'month' : 'week'
    
    setState({ type: newType })
  }, [state.type])

  return { type: state.type, onClick: cb }
}

const useHandleEventClick = () => {
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  const roles = activeAccount?.idTokenClaims?.roles

  const navigate = useNavigate()

  if(roles?.includes('[task.write]')) { // Users with write permissions
    return (e: MbscCalendarEvent) => navigate(`/site/${ e.event.uuid }`)
  }

  return () => null // Viewers
}