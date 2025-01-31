// Types
import { Site } from "../../../context/App/types"
import { SiteForm } from "../../containers/SiteContainer/types"
import { MbscCalendarEvent } from "@mobiscroll/react"

export interface SitesActivityCalendarProps {
  sites: Site[]
  handleCellClick?: (event: MbscCalendarEvent) => void
  handleEventClick?: (event: MbscCalendarEvent) => void
}

export interface SitesActivityCalendarState {
  type: CalendarTypes
  filter: ActivityFilter | null
}

export interface UseFormatCalendarDataProps { // useFormatCalendarData props
  sites: Site[]
}

export interface UseCalendarPropsProps { // useCalendarProps hook props
  type: 'week' | 'month'
  data: CalendarObj[]
  options: {
    onCellClick?: (event: MbscCalendarEvent) => void
    onEventClick?: (event: MbscCalendarEvent) => void
  }
}

export interface DatesObj {
  logsArray: CalendarObj[]
  violationsArray: CalendarObj[]
  complaintsArray: CalendarObj[]
  followUpsArray: CalendarObj[]
  penaltyArray: CalendarObj[]
  illicitArray: CalendarObj[]
}

export type CalendarColors =
  | "#157EE8" // logs
  | "#F55D34" // violations
  | "#ED5197" // complaints
  | "#FFFF00" // followUp
  | "#DB4EFC" // penalty
  | "#FFFFFF" // swo
  | "#C4EB3B" // illicit discharge

export interface CalendarObj {
  start: Date
  end: Date
  allDay: true
  title: string
  color: CalendarColors
  uuid: string
  formUUID?: string
  form?: SiteForm
}

type CalendarTypes =
  | "week"
  | "month"

type ActivityFilter =
  | "Inspection"
  | "Violation"
  | "Illicit Discharge"
  | "Complaint"
  | "Follow Up"
  | "Penalty"
  | "SWO"