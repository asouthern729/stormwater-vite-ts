// Types
import { SiteForm } from "@/components/site/containers/SiteContainer/types"

export interface CalendarDatesInterface {
  logsArray: CalendarDataInterface[]
  violationsArray: CalendarDataInterface[]
  complaintsArray: CalendarDataInterface[]
  followUpsArray: CalendarDataInterface[]
  penaltyArray: CalendarDataInterface[]
  illicitArray: CalendarDataInterface[]
}

export type CalendarColors =
  | "#157EE8" // logs
  | "#F55D34" // violations
  | "#ED5197" // complaints
  | "#FFFF00" // followUp
  | "#DB4EFC" // penalty
  | "#FFFFFF" // swo
  | "#C4EB3B" // illicit discharge

export interface CalendarDataInterface {
  start: Date
  end: Date
  allDay: true
  title: string
  color: CalendarColors
  uuid: string
  formUUID?: string
  form?: SiteForm
}

export type ActivityFilter =
  | "Inspection"
  | "Violation"
  | "Illicit Discharge"
  | "Complaint"
  | "Follow Up"
  | "Penalty"
  | "SWO"