// Types
import { MbscCalendarEvent } from "@mobiscroll/react"
import { FormType } from "@/components/site/context"

export interface CalendarDatesInterface {
  logsArray: CalendarDataInterface[]
  violationsArray: CalendarDataInterface[]
  complaintsArray: CalendarDataInterface[]
  followUpsArray: CalendarDataInterface[]
  penaltyArray: CalendarDataInterface[]
  illicitArray: CalendarDataInterface[]
  swoArray: CalendarDataInterface[]
}

export type CalendarColors =
  | "#157EE8" // logs
  | "#F55D34" // violations
  | "#ED5197" // complaints
  | "#FFFF00" // followUp
  | "#DB4EFC" // penalty
  | "#FFFFFF" // swo
  | "#C4EB3B" // illicit discharge

export interface CalendarDataInterface extends MbscCalendarEvent {
  allDay: true
  color: CalendarColors
  uuid: string
  formUUID: string
  form?: FormType
}