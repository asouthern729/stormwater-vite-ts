// Types
import { Dispatch } from "react"
import { StreamWatershed } from "../../components/forms/create/CreateSiteIllicitDischargeForm/types"
import { Concern } from "../../components/forms/create/CreateSiteComplaintForm/types"

export interface AppContextObj { // App ctx
  dispatch: Dispatch<AppAction>
  activePage: Page
  contactOptions: { text: string, value: string }[]
  dateRangeFilter: {
    start: string | undefined
    end: string | undefined
  }
  hoveredSite: string | undefined
  inspectorOptions: { text: string, value: string }[]
  searchValue: string
  showActiveSitesOnly: boolean
  showClosedSiteIssues: boolean
  showMenu: boolean
  showOpenIssuesOnly: boolean
  showSiteComplaints: boolean
  showSiteIllicitDischarges: boolean
  showSiteViolations: boolean
}

export interface AppState {
  activePage: Page
  contactOptions: { text: string, value: string }[]
  dateRangeFilter: {
    start: string | undefined
    end: string | undefined
  }
  hoveredSite: string | undefined
  inspectorOptions: { text: string, value: string }[]
  searchValue: string
  showActiveSitesOnly: boolean
  showClosedSiteIssues: boolean
  showMenu: boolean
  showOpenIssuesOnly: boolean
  showSiteComplaints: boolean
  showSiteIllicitDischarges: boolean
  showSiteViolations: boolean
}

export interface AppReducerProps { // AppReducer props
  state: AppState
  action: AppAction
}

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

export interface GetSitesResponse extends ServerResponse {
  data: Site[]
}

export interface GetSiteResponse extends ServerResponse {
  data: Site
}

export interface GetActiveSiteNamesResponse extends ServerResponse {
  data: { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string }[]
}

export interface CreateSiteResponse extends ServerResponse {
  data: Site
}

export interface UpdateSiteResponse extends ServerResponse {
  data: Site
}

export interface GetContactsResponse extends ServerResponse {
  data: Contact[]
}

export interface GetContactResponse extends ServerResponse {
  data: Contact
}

export interface CreateContactResponse extends ServerResponse {
  data: Contact
}

export interface UpdateContactResponse extends ServerResponse {
  data: Contact
}

export interface CreateSiteContactsResponse extends ServerResponse {
  data: SiteContact
}

export interface CreateFollowUpResponse extends ServerResponse {
  data: FollowUp
}

export interface GetInspectorsResponse extends ServerResponse {
  data: Inspector[]
}

export interface CreateViolationResponse extends ServerResponse {
  data: ConstructionViolation
}

export interface CreateComplaintResponse extends ServerResponse {
  data: Complaint
}

export interface CreateIllicitDischargeResponse extends ServerResponse {
  data: IllicitDischarge
}

export interface GetSiteLogResponse extends ServerResponse {
  data: SiteLog
}

export interface GetViolationResponse extends ServerResponse {
  data: ConstructionViolation
}

export interface GetViolationsResponse extends ServerResponse {
  data: ConstructionViolation[]
}

export interface GetComplaintResponse extends ServerResponse {
  data: Complaint
}

export interface GetComplaintsResponse extends ServerResponse {
  data: Complaint[]
}

export interface GetFollowUpResponse extends ServerResponse {
  data: FollowUp
}

export interface GetIllicitDischargeResponse extends ServerResponse {
  data: IllicitDischarge
}

export interface GetIllicitDischargesResponse extends ServerResponse {
  data: IllicitDischarge[]
}

export interface GetInspectorResponse extends ServerResponse {
  data: { sites: Site[], inspector: Inspector }
}

export interface CreateInspectorResponse extends ServerResponse {
  data: Inspector
}

export interface CreateGreenViolationResponse extends ServerResponse {
  data: GreenInfrastructure
}

export interface GetGreenViolationsResponse extends ServerResponse {
  data: GreenInfrastructure[]
}

export interface GetGreenViolationResponse extends ServerResponse {
  data: GreenInfrastructure
}

export interface Site extends BaseObj {
  preconDate: string
  siteId: string
  inspectorId: string
  name: string
  location: string
  xCoordinate: number
  yCoordinate: number
  permit: string
  cof: string
  tnq: string
  greenInfrastructure: boolean | null
  inactive: boolean | null
  hasOpenViolation: boolean
  hasOpenComplaint: boolean
  hasOpenIllicitDischarge: boolean
  Inspector: Inspector | null
  SiteContacts: SiteContact[]
  Logs: SiteLog[]
  ConstructionViolations: ConstructionViolation[]
  Complaints: Complaint[]
  IllicitDischarges: IllicitDischarge[]
  Attachments: Attachment[]
  [key: string]: string | number | boolean | null | Inspector | SiteContact[] | SiteLog[] | ConstructionViolation[] | Complaint[] | IllicitDischarge[] | Attachment[]
}

export interface Inspector extends BaseObj {
  inspectorId: string
  name: string
  email: string
  slug: string
  inactive: boolean
}

export interface SiteContact extends BaseObj {
  siteId: string
  contactId: string
  isPrimary: boolean
  isContractor: boolean
  isInspector: boolean
  Site: Site
  Contact: Contact
}

export interface Contact extends BaseObj {
  contactId: string
  name: string
  phone: string | null
  company: string | null
  email: string | null
  inactive: boolean
  SiteContacts: SiteContact[]
  [key: string]: string | boolean | SiteContact[] | undefined | null
}

export interface SiteLog extends BaseObj {
  inspectionDate: string
  logId: string
  siteId: string
}

export interface SiteContact extends BaseObj {
  siteId: string
  contactId: string
  isPrimary: boolean
  isContractor: boolean
  isInspector: boolean
}

export interface FollowUp extends BaseObj {
  followUpId: string
  violationId: string | null
  illicitId: string | null
  greenId: string | null
  followUpDate: string
  [key: string]: string | null
}

export interface ConstructionViolation extends BaseObj {
  violationId: string
  date: string
  siteId: string
  details: string
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  swoDate: string | undefined
  swoLiftedDate: string | undefined
  complaintId: string | null
  compliance: boolean
  closed: boolean
  FollowUpDates: FollowUp[]
}

export interface Complaint extends BaseObj {
  date: string
  complaintId: string
  siteId: string | null
  inspectorId: string | null
  name: string | null
  address: string | null
  phone: string | null
  email: string | null
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  concern: Concern
  otherConcern: string | null
  details: string
  responsibleParty: string | null
  comments: string | null
  compliance: boolean
  closed: boolean
  Inspector: Inspector
  FollowUpDates: FollowUp[]
}

export interface IllicitDischarge extends BaseObj {
  illicitId: string
  siteId: string | null
  date: string
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  details: string
  responsibleParty: string | null
  volumeLost: string | null
  streamWatershed: StreamWatershed | null
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  compliance: boolean
  closed: boolean
  FollowUpDates: FollowUp[]
}

export interface GreenInfrastructure extends BaseObj {
  greenId: string
  date: string
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  details: string
  responsibleParty: string | null
  comments: string | null
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  bondReleased: boolean
  compliance: boolean
  closed: boolean
  FollowUpDates: FollowUp[]
}

export interface Attachment {
  uuid: string
}

export interface SiteObj { // SiteObj for forms
  preconDate: string
  inspectorId: string | null
  name: string
  location: string
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  permit: string | null
  cof: string | null
  tnq: string | null
  greenInfrastructure: boolean | string | null
  inactive?: boolean | string | null
  uuid?: string
}

export interface ContactObj { // ContactObj for forms
  name: string
  phone: string | null
  company: string | null
  email: string | null
  inactive: boolean | string | null
  uuid?: string
}

export interface SiteContactObj { // SiteContact obj for forms
  siteId: string
  contactId: string
  isPrimary: boolean | null
  isContractor: boolean | null
  isInspector: boolean | null
}

export interface SiteLogObj { // SiteLog obj for forms
  siteId: string
  inspectionDate: string
  uuid?: string
}

export interface ViolationObj { // Violation obj for forms
  violationId?: string
  siteId: string
  date: string
  details: string
  enforcementAction: string | null
  penaltyDate: string | null
  penaltyAmount: number | null
  penaltyDueDate: string | null
  paymentReceived: string | null
  swoDate: string | null
  swoLiftedDate: string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  uuid?: string
}

export interface ComplaintObj { // SiteComplaint obj for forms
  complaintId?: string
  date: string | undefined
  siteId?: string
  name: string | null
  address: string | null
  phone: string | null
  email: string | null
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  concern: Concern
  otherConcern: string | null
  details: string
  responsibleParty: string | null 
  comments: string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  uuid?: string
}

export interface IllicitObj { // IllicitDischarge obj for forms
  illicitId?: string
  siteId?: string
  date: string | undefined
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  details: string
  responsibleParty: string | null
  volumeLost: string | null
  streamWatershed: StreamWatershed | string | null
  enforcementAction: string | null
  penaltyDate: string | null
  penaltyAmount: number | null
  penaltyDueDate: string | null
  paymentReceived: string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  uuid?: string
}

export interface FollowUpObj { // FollowUp obj for forms
  followUpDate: string
  parentId: string
}

export interface InspectorObj { // Inspector obj for forms
  name: string
  email: string
  uuid?: string
}

export interface GreenObj { // Green infrastructure violation obj for forms
  date: string | undefined
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  details: string
  responsibleParty: string | null
  comments: string | null
  enforcementAction: string | null
  penaltyDate: string | null
  penaltyAmount: number | null
  penaltyDueDate: string | null
  paymentReceived: string | null
  bondReleased: boolean | string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  uuid?: string
}

export interface BaseObj { 
  uuid: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export type AppAction =
  | { type: 'SET_ACTIVE_PAGE', payload: Page }
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'TOGGLE_SHOW_OPEN_ISSUES_ONLY', payload: undefined }
  | { type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY', payload: undefined }
  | { type: 'SET_HOVERED_SITE', payload: string | undefined }
  | { type: 'TOGGLE_SHOW_SITE_COMPLAINTS', payload: undefined }
  | { type: 'TOGGLE_SHOW_SITE_VIOLATIONS', payload: undefined }
  | { type: 'TOGGLE_SHOW_SITE_ILLICIT_DISCHARGES', payload: undefined }
  | { type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES', payload: undefined }
  | { type: 'TOGGLE_SHOW_MENU', payload: undefined }
  | { type: 'SET_INSPECTOR_OPTIONS', payload: { text: string, value: string }[] }
  | { type: 'SET_CONTACT_OPTIONS', payload: { text: string, value: string }[] }
  | { type: 'SET_DATE_RANGE_FILTER', payload: { start: string | undefined, end: string | undefined } }
  | { type: 'RESET_CTX', payload: undefined }

export type Page =
  | "Sites"
  | "Inspectors"
  | "Contacts"
  | "Enforcement"
  | "Create"
  | "Login"
  | "Site"